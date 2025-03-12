"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

import {
  Bold,
  Italic,
  UnderlineIcon,
  LinkIcon,
  ImageIcon,
  Code,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function Editor() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectionCoords, setSelectionCoords] = useState({ top: 0, left: 0 });
  const [isTyping, setIsTyping] = useState(false);
  const [showPlusButton, setShowPlusButton] = useState(false);
  const [plusButtonPosition, setPlusButtonPosition] = useState({
    top: 0,
    left: 0,
  });
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        validate: (href) => /^https?:\/\//.test(href),
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Placeholder.configure({ placeholder: "Tell your story..." }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[200px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      // Hide selection tooltip when typing
      setShowTooltip(false);

      // Set typing state and reset timeout
      setIsTyping(true);
      setShowPlusButton(false);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Show plus button after typing stops (500ms delay)
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        updatePlusButtonPosition();
        setShowPlusButton(true);
      }, 500);
    },
    onSelectionUpdate: ({ editor }) => {
      // Only show tooltip if there's a text selection
      if (editor.view.state.selection.empty) {
        setShowTooltip(false);
        return;
      }

      handleSelection();
    },
  });

  // Update plus button position when typing stops
  const updatePlusButtonPosition = useCallback(() => {
    if (!editor) return;

    const editorElement = document.querySelector(".ProseMirror");
    if (!editorElement) return;

    // Get the last paragraph or block element
    const blocks = editorElement.querySelectorAll("p, h1, h2, h3, pre, hr");
    if (blocks.length === 0) return;

    const lastBlock = blocks[blocks.length - 1];
    const rect = lastBlock.getBoundingClientRect();

    setPlusButtonPosition({
      top: rect.top + window.scrollY + rect.height / 2,
      left: rect.left + window.scrollX - 30, // Position to the left of the block
    });
  }, [editor]);

  // Handle text selection
  const handleSelection = () => {
    if (!editor) return;

    const selection = window.getSelection();
    if (
      selection &&
      !selection.isCollapsed &&
      selection.toString().length > 0
    ) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setSelectionCoords({
        top: rect.top - 40 + window.scrollY,
        left: rect.left + rect.width / 2 - 50 + window.scrollX, // Center the tooltip
      });

      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  };

  // Apply formatting only to selected text
  const applyFormatting = useCallback(
    (formatFn: () => void) => {
      if (!editor) return;

      // Store the current selection
      const { from, to } = editor.state.selection;

      // Apply the formatting
      formatFn();

      // Ensure cursor is placed at the end of the formatted text
      editor.chain().focus().setTextSelection(to).run();
    },
    [editor]
  );

  const addImage = useCallback(() => {
    if (!editor) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        editor
          .chain()
          .focus()
          .setImage({ src: reader.result as string })
          .run();
        setShowPlusButton(false);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }, [editor]);

  const addCodeBlock = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().toggleCodeBlock().run();
    setShowPlusButton(false);
  }, [editor]);

  const addSectionBreak = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().setHorizontalRule().run();
    editor.chain().focus().createParagraphNear().run();
    setShowPlusButton(false);
  }, [editor]);

  // Initialize plus button position
  useEffect(() => {
    if (editor) {
      updatePlusButtonPosition();

      // Show plus button initially after a delay
      setTimeout(() => {
        setShowPlusButton(true);
      }, 1000);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [editor, updatePlusButtonPosition]);

  if (!editor) return null;

  return (
    <TooltipProvider delayDuration={300}>
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 min-h-screen relative">
        <div className="relative">
          <EditorContent editor={editor} className="relative" />

          {/* Selection tooltip */}
          {showTooltip && (
            <div
              className="fixed z-50 bg-black text-white p-2 rounded flex space-x-2 shadow-lg"
              style={{
                top: `${selectionCoords.top}px`,
                left: `${selectionCoords.left}px`,
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  applyFormatting(() =>
                    editor.chain().focus().toggleBold().run()
                  )
                }
                className={cn(
                  "text-white hover:bg-gray-700",
                  editor.isActive("bold") && "bg-gray-700"
                )}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  applyFormatting(() =>
                    editor.chain().focus().toggleItalic().run()
                  )
                }
                className={cn(
                  "text-white hover:bg-gray-700",
                  editor.isActive("italic") && "bg-gray-700"
                )}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  applyFormatting(() =>
                    editor.chain().focus().toggleUnderline().run()
                  )
                }
                className={cn(
                  "text-white hover:bg-gray-700",
                  editor.isActive("underline") && "bg-gray-700"
                )}
              >
                <UnderlineIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const url = window.prompt("URL");
                  if (url)
                    applyFormatting(() =>
                      editor.chain().focus().setLink({ href: url }).run()
                    );
                }}
                className={cn(
                  "text-white hover:bg-gray-700",
                  editor.isActive("link") && "bg-gray-700"
                )}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Plus button with tooltip */}
          {showPlusButton && !isTyping && (
            <div
              className="absolute z-40"
              style={{
                top: `${plusButtonPosition.top}px`,
                left: `${plusButtonPosition.left}px`,
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-dashed opacity-70 hover:opacity-100 transition-opacity"
                    onClick={() => {
                      // Position cursor at the end before adding content
                      editor.commands.focus("end");
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex flex-col gap-2 p-2 bg-black text-white"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-gray-700 justify-start text-xs h-8"
                    onClick={addImage}
                  >
                    <ImageIcon className="h-3 w-3 mr-2" /> Add Image
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-gray-700 justify-start text-xs h-8"
                    onClick={addCodeBlock}
                  >
                    <Code className="h-3 w-3 mr-2" /> Add Code Block
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-gray-700 justify-start text-xs h-8"
                    onClick={addSectionBreak}
                  >
                    <Minus className="h-3 w-3 mr-2" /> Add Section Break
                  </Button>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
