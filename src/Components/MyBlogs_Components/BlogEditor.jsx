import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./content.css";
import CloudinaryUploadAdapterPlugin from "../../utils/cloudinaryUploadAdapter";
import { useState } from "react";

// BlogEditor wraps CKEditor 5 and exposes a simple API. You can theme it
// by passing theme={{ primaryColor, textColor }} and customize the placeholder.
const BlogEditor = ({
  onSave,
  initialData,
  placeholder = "Write your post...",
  theme,
}) => {
  const [uploadError, setUploadError] = useState("");

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
          extraPlugins: [CloudinaryUploadAdapterPlugin],
          toolbar: {
            items: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "blockQuote",
              "|",
              "imageUpload",
              "undo",
              "redo",
            ],
          },
          image: {
            toolbar: [
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
              "|",
              "toggleImageCaption",
              "linkImage",
            ],
          },
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
            // no-op
          }
        }}
        onChange={(_, editor) => {
          handleSave(editor.getData());
        }}
        onError={(evt, { willEditorRestart }) => {
          if (willEditorRestart) return;
          setUploadError("Editor error – check console.");
        }}
      />
      {uploadError && (
        <p className="mt-2 text-xs text-red-500">{uploadError}</p>
      )}
    </div>
  );
};

export default BlogEditor;
