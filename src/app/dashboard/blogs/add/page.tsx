"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import Heading from "@tiptap/extension-heading";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../../components/ui/dialog";

import {
  Bold,
  Italic,
  Code,
  Heading as Headers,
  Link as LinkIcon,
  Image as ImageIcon,
  MinusSquare,
  ChevronDown,
  Save,
} from "lucide-react";
import { FileUpload } from "../../../../components/ui/file-upload";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

const LOCAL_STORAGE_KEYS = {
  TITLE: "medium-editor-title",
  CONTENT: "medium-editor-content",
  LAST_SAVED: "medium-editor-last-saved",
};

const MediumEditor = () => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  // Initialize editor with possibly restored content
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
      }),
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
    ],
    content: "",
    autofocus: false,
    onUpdate: ({ editor }) => {
      // Save content to localStorage whenever it changes
      const content = editor.getHTML();
      localStorage.setItem(LOCAL_STORAGE_KEYS.CONTENT, content);
      const now = new Date().toLocaleString();
      localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_SAVED, now);
      setLastSaved(now);
    },
  });

  // Load saved content from localStorage on component mount
  useEffect(() => {
    const savedTitle = localStorage.getItem(LOCAL_STORAGE_KEYS.TITLE);
    const savedContent = localStorage.getItem(LOCAL_STORAGE_KEYS.CONTENT);
    const savedTimestamp = localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_SAVED);

    if (savedTitle && titleRef.current) {
      titleRef.current.textContent = savedTitle;
      setTitle(savedTitle);
    }

    if (savedContent && editor) {
      editor.commands.setContent(savedContent);
    }

    if (savedTimestamp) {
      setLastSaved(savedTimestamp);
    }
  }, [editor]);

  // Auto-save function
  const saveToLocalStorage = useCallback(() => {
    // Save title
    localStorage.setItem(LOCAL_STORAGE_KEYS.TITLE, title);

    // Save content
    if (editor) {
      const content = editor.getHTML();
      localStorage.setItem(LOCAL_STORAGE_KEYS.CONTENT, content);
    }

    // Update timestamp
    const now = new Date().toLocaleString();
    localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_SAVED, now);
    setLastSaved(now);
  }, [editor, title]);

  // Auto-save on interval (every 30 seconds)
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      saveToLocalStorage();
    }, 30000); // 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [saveToLocalStorage]);

  // Handle manual save
  const handleManualSave = () => {
    saveToLocalStorage();
  };

  const handleManualSubmit = async () => {
    if (!editor) {
      console.error("Editor not initialized");
      return;
    }

    try {
      // Set loading state
      setIsLoading(true);

      // Get content from editor
      const content = editor.getJSON();

      // Validate title (if required)
      if (!title.trim()) {
        toast.error("Please enter a title");
        titleRef.current?.focus();
        return;
      }

      console.log("Submitting content:", {
        title,
        content,
      });
      // API call to save data
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          title,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save: ${response.status}`);
      }

      const data = await response.json();

      // Update last saved timestamp
      setLastSaved(new Date().toLocaleTimeString());

      // Show success message
      toast.success("Content saved successfully");

      editor.commands.clearContent();
      setTitle("");
      setLastSaved(null);

      localStorage.removeItem(LOCAL_STORAGE_KEYS.TITLE);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CONTENT);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.LAST_SAVED);

      router.push(`/dashboard`);

      // Optional: Return the saved data or redirect
      return data;
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save content");
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  // Clear saved content
  const clearSavedContent = () => {
    if (
      confirm(
        "Are you sure you want to clear all saved content? This cannot be undone."
      )
    ) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TITLE);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CONTENT);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.LAST_SAVED);

      // Reset editor content
      if (editor) {
        editor.commands.clearContent();
      }

      // Reset title
      if (titleRef.current) {
        titleRef.current.textContent = "";
      }
      setTitle("");
      setLastSaved(null);
    }
  };

  const setLink = useCallback(() => {
    if (!linkUrl) return;

    // Process the URL to ensure it has a protocol
    let processedUrl = linkUrl;

    // If the URL doesn't start with http:// or https://, add https://
    if (!/^https?:\/\//i.test(processedUrl)) {
      processedUrl = `https://${processedUrl}`;
    }

    // Update or add link with the processed URL
    if (editor) {
      editor.chain().focus().setLink({ href: processedUrl }).run();
    }

    // Reset and close
    setLinkUrl("");
    setLinkDialogOpen(false);
  }, [editor, linkUrl]);

  interface UploadResponse {
    imageUrl: string;
  }

  const uploadAndAddImage = useCallback(
    async (file: File | null) => {
      if (!file) return;

      try {
        console.log("Uploading file:", file.name, file.type, file.size);

        const formData = new FormData();
        formData.append("image", file);

        setIsLoading(true);
        const response = await fetch("/api/upload-s3", {
          method: "POST",
          body: formData,
        });
        setIsLoading(false);
        console.log("API response status:", response.status);

        if (response.ok) {
          const data: UploadResponse = await response.json();
          console.log("API success:", data);

          if (editor && data?.imageUrl) {
            editor.chain().focus().setImage({ src: data.imageUrl }).run();
            setImageDialogOpen(false);
            setSelectedFile(null); // Reset the selected file
          } else {
            console.error("Invalid API response: Missing imageUrl");
          }
        } else {
          throw new Error(`Failed to upload image. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error uploading image:", error);

        // Fallback: Use local object URL for preview
        if (editor && file) {
          const localUrl = URL.createObjectURL(file);
          editor.chain().focus().setImage({ src: localUrl }).run();
          setImageDialogOpen(false);
          setSelectedFile(null); // Reset the selected file
        }
      } finally {
        // Always reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [editor]
  );

  interface TitleChangeEvent extends React.FormEvent<HTMLDivElement> {
    target: HTMLDivElement;
  }

  const handleTitleChange = (e: TitleChangeEvent) => {
    const newTitle = e.target.textContent || "";
    setTitle(newTitle);
    // Save title to localStorage immediately on change
    localStorage.setItem(LOCAL_STORAGE_KEYS.TITLE, newTitle);
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <Toaster />
      <div className="max-w-3xl mx-auto p-4 font-serif">
        <div className="prose prose-lg max-w-none">
          {/* Title */}
          <div
            ref={titleRef}
            className="border-none outline-none text-4xl font-bold mb-6 pb-2 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none"
            contentEditable
            onInput={handleTitleChange}
            data-placeholder="Title"
            suppressContentEditableWarning={true}
          />

          {/* Auto-save indicator */}
          {lastSaved && (
            <div className="text-sm text-gray-500 mb-4 flex items-center">
              <span>Last saved: {lastSaved}</span>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2"
                onClick={handleManualSave}
                title="Save now"
              >
                <Save size={14} />
              </Button>
            </div>
          )}

          {/* Toolbar */}
          <div className="sticky top-0 z-10 bg-white py-2 mb-4 flex items-center gap-3 border-b rounded-md border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`rounded-full p-2 h-8 w-8 ${
                editor.isActive("bold") ? "bg-gray-100" : ""
              }`}
            >
              <Bold size={16} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`rounded-full p-2 h-8 w-8 ${
                editor.isActive("italic") ? "bg-gray-100" : ""
              }`}
            >
              <Italic size={16} />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full px-2 h-8 flex items-center gap-1"
                >
                  <Headers size={16} />
                  <ChevronDown size={12} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-32 p-0">
                <div className="flex flex-col">
                  {[1, 2, 3].map((level) => (
                    <Button
                      key={level}
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        console.log(
                          "Before toggle - isActive:",
                          editor.isActive("heading", { level })
                        );
                        editor
                          .chain()
                          .focus()
                          .toggleHeading({ level: level as 1 | 2 | 3 })
                          .run();
                        // Force a re-render or check the editor state after toggling
                        console.log(
                          "After toggle - isActive:",
                          editor.isActive("heading", { level })
                        );
                      }}
                      className={`justify-start rounded-none ${
                        editor.isActive("heading", { level })
                          ? "bg-gray-100"
                          : ""
                      }`}
                    >
                      H{level}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`rounded-full p-2 h-8 w-8 ${
                editor.isActive("code") ? "bg-gray-100" : ""
              }`}
            >
              <Code size={16} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLinkDialogOpen(true)}
              className={`rounded-full p-2 h-8 w-8 ${
                editor.isActive("link") ? "bg-gray-100" : ""
              }`}
            >
              <LinkIcon size={16} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="rounded-full p-2 h-8 w-8"
            >
              <MinusSquare size={16} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setImageDialogOpen(true)}
              className="rounded-full p-2 h-8 w-8 ml-auto"
            >
              <ImageIcon size={16} />
            </Button>
          </div>

          {/* Editor Content */}
          <div className="min-h-[300px] font-serif text-lg">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Link Dialog */}
        <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Link</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                type="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setLinkDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={setLink}>Add Link</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Image Dialog */}
        <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
          <DialogContent className="sm:max-w-md">
            {isLoading ? (
              <div>Loading.......</div>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Add Image</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center justify-between">
                    <FileUpload
                      onChange={(event) => {
                        setSelectedFile(event.target.files?.[0] || null);
                        console.log(
                          "File selected:",
                          event.target.files?.[0]?.name
                        );
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setImageDialogOpen(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={() => {
                      uploadAndAddImage(selectedFile);
                    }}
                  >
                    Add Image
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Publish Controls */}
        <div className="flex justify-between gap-2 mt-8">
          <Button
            variant="outline"
            className="rounded-full px-6 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={clearSavedContent}
          >
            Clear Draft
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="rounded-full px-6"
              onClick={handleManualSave}
            >
              Save Draft
            </Button>

            <Button
              className="rounded-full px-6 bg-green-600 hover:bg-green-700"
              onClick={handleManualSubmit}
            >
              Submit
            </Button>
          </div>
        </div>

        <style jsx global>{`
          .ProseMirror h1 {
            font-size: 2em;
            font-weight: bold;
            margin-top: 0.67em;
            margin-bottom: 0.67em;
          }

          .ProseMirror h2 {
            font-size: 1.5em;
            font-weight: bold;
            margin-top: 0.83em;
            margin-bottom: 0.83em;
          }

          .ProseMirror h3 {
            font-size: 1.17em;
            font-weight: bold;
            margin-top: 1em;
            margin-bottom: 1em;
          }
          .ProseMirror {
            min-height: 300px;
            outline: none;
          }
          .ProseMirror a {
            color: blue;
            text-decoration: underline;
            cursor: pointer;
          }
          .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #adb5bd;
            pointer-events: none;
            height: 0;
          }
          .ProseMirror img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 1.5em 0;
          }
        `}</style>
      </div>
    </>
  );
};

export default MediumEditor;
