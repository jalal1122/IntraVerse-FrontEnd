import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, resetCreatePost } from "../../features/admin/adminSlice";
import Loader from "../Loader";
import { useNavigate } from "react-router";
import Header from "../Header/Header";
import selectCategories from "../../utils/blogCategories.js";
import BlogEditor from "./BlogEditor";
import BlogViewer from "./BlogViewer.jsx";

const CreatePost = () => {
  const { textColor, primaryColor } = useSelector(
    (state) => state.color.colors
  );

  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const { createPostLoading, createPostError, createPostSuccess } = useSelector(
    (state) => state.admin
  );

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setPostData((prevState) => ({
        ...prevState,
        image: files[0],
      }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else
      setPostData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!postData.title.trim() || !postData.content.trim()) {
      setErrorMessage("Title and Content are required");
      return;
    }

    if (postData.title.length < 5) {
      setErrorMessage("Title should be at least 5 characters long");
      return;
    }

    if (postData.category.trim() === "") {
      setErrorMessage("Category is required");
      return;
    }

    if (postData.image && postData.image.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size should be less than 5MB");
      return;
    }

    setErrorMessage("");

    dispatch(createPost(postData));
  };

  const handleSave = async (data) => {
    setPostData((prevState) => ({
      ...prevState,
      content: data,
    }));
  };

  useEffect(() => {
    if (createPostSuccess) {
      dispatch(resetCreatePost());
      navigate("/my-blogs");
    }
  }, [createPostSuccess]);

  if (createPostError) {
    return (
      <h1 className="text-3xl font-bold text-center my-10">
        {errorMessage || createPostError}
      </h1>
    );
  }

  if (createPostLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <div className="px-4 sm:px-6 lg:px-8 mt-6">
        <div className="max-w-6xl mx-auto" style={{ color: textColor }}>
          <h1 className="font-extrabold text-2xl sm:text-3xl text-center tracking-tight">
            Create Post
          </h1>

          <form onSubmit={(e) => handleSubmit(e)} className="mt-6">
            {errorMessage && (
              <p className="text-sm text-red-500 text-center mb-4">
                {errorMessage}
              </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Preview card */}
              <div className="lg:col-span-1">
                <div className="rounded-xl border border-gray-200/40 shadow-sm overflow-hidden bg-white/5 backdrop-blur-sm">
                  <div className="p-4 border-b border-gray-200/30">
                    <p className="text-sm opacity-80">Cover image preview</p>
                  </div>
                  <div className="p-4 flex items-center justify-center min-h-[180px]">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Selected preview"
                        className="w-full h-48 object-cover rounded-md shadow-sm"
                      />
                    ) : (
                      <div className="w-full h-48 rounded-md border border-dashed border-gray-300 flex items-center justify-center text-sm opacity-70">
                        No image selected
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Form fields */}
              <div className="lg:col-span-2">
                <div className="rounded-xl border border-gray-200/40 shadow-sm p-4 sm:p-6 space-y-4 bg-white/5 backdrop-blur-sm">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium mb-1 opacity-80"
                    >
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      placeholder="A captivating headline..."
                      value={postData.title}
                      onChange={(e) => handleOnChange(e)}
                      className="w-full p-2.5 rounded-lg border border-gray-300/60 bg-transparent focus:outline-none focus:ring-2"
                      style={{
                        boxShadow: `0 0 0 0 rgba(0,0,0,0)`,
                        outlineColor: primaryColor,
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 opacity-80">
                      Content
                    </label>
                    <BlogEditor onSave={handleSave} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium mb-1 opacity-80"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={postData.category}
                        onChange={(e) => handleOnChange(e)}
                        className="w-full p-2.5 rounded-lg border border-gray-300/60 bg-transparent focus:outline-none focus:ring-2"
                      >
                        <option value="">Select Category</option>
                        {selectCategories.map((category) => (
                          <option
                            value={category}
                            key={category}
                            style={{ color: "white", backgroundColor: "black" }}
                          >
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium mb-1 opacity-80"
                      >
                        Cover image
                      </label>
                      <input
                        id="image"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) => handleOnChange(e)}
                        className="w-full p-2.5 rounded-lg border border-gray-300/60 bg-transparent focus:outline-none focus:ring-2"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <input
                      type="submit"
                      disabled={createPostLoading}
                      style={{
                        backgroundColor: primaryColor,
                        color: textColor,
                      }}
                      value={createPostLoading ? "Creating..." : "Create Post"}
                      className="px-8 py-2.5 rounded-lg shadow-sm hover:opacity-90 active:scale-[0.99] transition disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
