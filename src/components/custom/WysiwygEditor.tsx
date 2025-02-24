import { useState, useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "../../components/ui/button";
import { Bold, Italic, Heading2, List, ListOrdered, Quote } from "lucide-react";
import React from "react";

interface WysiwygEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function WysiwygEditor({
  content,
  onChange,
}: WysiwygEditorProps) {
  const [wordCount, setWordCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      setWordCount(editor.storage.characterCount.words());
    },
  });

  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

  const updateToolbarPosition = useCallback(() => {
    if (editor && editor.view.dom) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setToolbarPosition({
          top: rect.top - 50,
          left: rect.left,
        });
      }
    }
  }, [editor]);

  useEffect(() => {
    const handleSelectionChange = () => {
      if (editor && !editor.isDestroyed) {
        setShowToolbar(!editor.view.state.selection.empty);
        updateToolbarPosition();
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [editor, updateToolbarPosition]);

  if (!editor) {
    return null;
  }

  return (
    <div className="relative">
      {showToolbar && (
        <div
          className="absolute bg-white shadow-lg rounded-md p-2 flex space-x-2 z-10 transition-opacity duration-200"
          style={{
            top: `${toolbarPosition.top}px`,
            left: `${toolbarPosition.left}px`,
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-gray-200" : ""}
          >
            <Bold size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-gray-200" : ""}
          >
            <Italic size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
            }
          >
            <Heading2 size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
          >
            <List size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
          >
            <ListOrdered size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "bg-gray-200" : ""}
          >
            <Quote size={18} />
          </Button>
        </div>
      )}
      <EditorContent
        editor={editor}
        className="prose prose-lg max-w-none focus:outline-none min-h-[200px] py-4 px-2" // Adjusted styling for multiple lines
      />
      <div className="fixed bottom-4 right-4 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-500">
        {wordCount} words
      </div>
    </div>
  );
}
