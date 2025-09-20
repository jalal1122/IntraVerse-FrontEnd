import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./content.css";

// BlogEditor wraps CKEditor 5 and exposes a simple API. You can theme it
// by passing theme={{ primaryColor, textColor }} and customize the placeholder.
const BlogEditor = ({
  onSave,
  initialData,
  placeholder = "Write your post...",
  theme,
}) => {
  const handleSave = (data) => {
    if (onSave) onSave(data);
  };

  return (
    <div
      className="ckEditor"
      style={{
        "--primary-color": theme?.primaryColor || "#3b82f6",
        "--text-color": theme?.textColor || "#111827",
      }}
    >
      <CKEditor
        editor={ClassicEditor}
        data={initialData || ""}
        config={{
          placeholder,
        }}
        onReady={(editor) => {
          try {
            const el = editor.ui.view.editable.element;
            if (el) {
              el.style.minHeight = "240px";
              el.style.maxHeight = "60vh";
              el.style.overflowY = "auto";
            }
          } catch {
            // no-op: ensure no runtime impact
          }
        }}
        onChange={(_, editor) => {
          handleSave(editor.getData());
        }}
      />
    </div>
  );
};

export default BlogEditor;
