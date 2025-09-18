import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./content.css";

const BlogEditor = ({ onSave, initialData }) => {
  const handleSave = (data) => {
    onSave(data);
  };

  return (
    <div className="ckEditor text-black">
      <CKEditor
        editor={ClassicEditor}
        data={initialData || ""}
        onChange={(_, editor) => {
          handleSave(editor.getData());
        }}
      />
    </div>
  );
};

export default BlogEditor;
