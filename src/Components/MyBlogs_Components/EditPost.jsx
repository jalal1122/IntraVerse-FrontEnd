import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import {
  getEditPost,
  updatePost,
  resetEditPost,
  resetUpdatePost,
} from "../../features/admin/adminSlice.js";
import selectCategories from "../../utils/blogCategories.js";
import Loader from "../Loader";
import BlogEditor from "./BlogEditor";

const EditPost = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { textColor, primaryColor } = useSelector(
    (state) => state.color.colors
  );

  const {
    editPost,
    editPostLoading,
    editPostError,
    editPostSuccess,
    updatePostLoading,
    updatePostError,
    updatePostSuccess,
  } = useSelector((state) => state.admin);

  const [imagePreview, setImagePreview] = useState(null);

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setPostData((prevData) => ({
        ...prevData,
        image: files[0],
      }));

      // For image preview
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setPostData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const updatedPostData = {
      id,
      title: postData.title,
      content: postData.content,
      category: postData.category,
      image: postData.image,
    };

    dispatch(updatePost(updatedPostData));
  };

  const handleSave = async (data) => {
    setPostData((prevState) => ({
      ...prevState,
      content: data,
    }));
  };

  // Call for edit post data
  useEffect(() => {
    dispatch(getEditPost(id));
  }, [dispatch, id]);

  // Set post data when editPost changes
  useEffect(() => {
    if (editPost) {
      setPostData((prev) => ({
        ...prev,
        title: editPost?.title,
        content: editPost?.content,
        category: editPost?.category,
        image: editPost?.image,
      }));

      console.log(editPost);
    }
  }, [editPost, setPostData]);

  //   when update post is successful
  useEffect(() => {
    if (updatePostSuccess) {
      dispatch(resetEditPost());
      dispatch(resetUpdatePost());
      navigate("/my-blogs");
    }
  }, [updatePostSuccess]);

  return (
    <>
      {updatePostLoading && <Loader />}

      {updatePostError && (
        <h1 className="text-3xl font-bold text-center my-10">
          {updatePostError}
        </h1>
      )}

      {/* Rendering Header Component */}
      <Header />

      {editPostLoading && <Loader />}

      {editPostError && (
        <h1 className="text-3xl font-bold text-center my-10">
          {editPostError}
        </h1>
      )}

      {/* Edit Post */}
      <div className="px-4 sm:px-6 lg:px-8 mt-6">
        <div className="max-w-6xl mx-auto" style={{ color: textColor }}>
          <h1 className="font-extrabold text-2xl sm:text-3xl text-center tracking-tight">
            Edit Post
          </h1>

          {!editPostLoading && editPostSuccess && (
            <form onSubmit={formSubmitHandler} className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Preview card */}
                <div className="lg:col-span-1">
                  <div className="rounded-xl border border-gray-200/40 shadow-sm overflow-hidden bg-white/5 backdrop-blur-sm">
                    <div className="p-4 border-b border-gray-200/30">
                      <p className="text-sm opacity-80">Current cover image</p>
                    </div>
                    <div className="p-4 flex items-center justify-center min-h-[180px]">
                      {postData.image ? (
                        <img
                          src={
                            postData?.image === editPost?.image
                              ? postData.image
                              : imagePreview
                          }
                          alt="Post"
                          className="w-full h-48 object-cover rounded-md shadow-sm"
                        />
                      ) : (
                        <div className="w-full h-48 rounded-md border border-dashed border-gray-300 flex items-center justify-center text-sm opacity-70">
                          No image
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
                        value={postData.title}
                        onChange={handleOnChange}
                        placeholder="Title"
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
                      <BlogEditor
                        onSave={handleSave}
                        initialData={postData.content}
                      />
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
                          onChange={handleOnChange}
                          className="w-full p-2.5 rounded-lg border border-gray-300/60 bg-transparent focus:outline-none focus:ring-2"
                        >
                          <option value="" disabled>
                            Select Category
                          </option>
                          {selectCategories.map((category) => (
                            <option
                              key={category}
                              value={category}
                              style={{
                                color: "white",
                                backgroundColor: "black",
                              }}
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
                          Replace image
                        </label>
                        <input
                          id="image"
                          type="file"
                          name="image"
                          onChange={handleOnChange}
                          className="w-full p-2.5 rounded-lg border border-gray-300/60 bg-transparent focus:outline-none focus:ring-2"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-center">
                      <button
                        type="submit"
                        style={{
                          backgroundColor: primaryColor,
                          color: textColor,
                        }}
                        className="rounded-lg w-fit px-8 py-2.5 shadow-sm hover:opacity-90 active:scale-[0.99] transition"
                      >
                        Update Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default EditPost;
