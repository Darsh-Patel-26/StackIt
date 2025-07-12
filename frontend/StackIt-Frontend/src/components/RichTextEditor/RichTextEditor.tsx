import React, { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Smile, Image, Link } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your content here...',
  height = '200px'
}) => {
  const quillRef = useRef<ReactQuill>(null);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['emoji'],
        ['clean']
      ],
      handlers: {
        emoji: () => {
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            if (range) {
              // Simple emoji picker - in production, you'd use a proper emoji picker library
              const emoji = prompt('Enter emoji (e.g., 😀, 👍, ❤️):');
              if (emoji) {
                quill.insertText(range.index, emoji);
              }
            }
          }
        }
      }
    },
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link', 'image'
  ];

  return (
    <div className="rich-text-editor">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height }}
      />
      <style>{`
        .rich-text-editor .ql-editor {
          min-height: ${height};
          font-family: inherit;
          font-size: 14px;
          line-height: 1.6;
        }
        .rich-text-editor .ql-toolbar {
          border-top: 1px solid #d1d5db;
          border-left: 1px solid #d1d5db;
          border-right: 1px solid #d1d5db;
          border-radius: 8px 8px 0 0;
          background: #f9fafb;
        }
        .rich-text-editor .ql-container {
          border-bottom: 1px solid #d1d5db;
          border-left: 1px solid #d1d5db;
          border-right: 1px solid #d1d5db;
          border-radius: 0 0 8px 8px;
          font-family: inherit;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }
        .rich-text-editor .ql-toolbar .ql-picker-label {
          border: 1px solid transparent;
          border-radius: 4px;
        }
        .rich-text-editor .ql-toolbar .ql-picker-label:hover {
          border-color: #d1d5db;
          background: #ffffff;
        }
        .rich-text-editor .ql-toolbar button {
          border-radius: 4px;
          margin: 1px;
        }
        .rich-text-editor .ql-toolbar button:hover {
          background: #e5e7eb;
        }
        .rich-text-editor .ql-toolbar button.ql-active {
          background: #dbeafe;
          color: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;