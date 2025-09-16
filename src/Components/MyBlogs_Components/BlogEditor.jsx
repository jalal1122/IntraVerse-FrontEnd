import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const BlogEditor = ({ onSave }) => {

  const handleSave = (data) => {
    onSave(data);
  };

  return (
    <div className="text-black">
      <CKEditor
        editor={ClassicEditor}
        data="<p>Start writing your blog...</p>"
        onChange={(_, editor) => {
          handleSave(editor.getData());
        }}
      />
    </div>
  );
};

export default BlogEditor;
