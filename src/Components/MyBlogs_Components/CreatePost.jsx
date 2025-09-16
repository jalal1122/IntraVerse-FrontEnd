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
      <div
        className="flex flex-col gap-5 p-3 mt-4"
        style={{
          color: textColor,
        }}
      >
        <h1 className="font-bold text-3xl text-center">Create Post</h1>

        {/* Create Post Content */}

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-3 w-[600px] mx-auto">
            {errorMessage && (
              <h1 className="text-red-500 text-center">{errorMessage}</h1>
            )}

            <div>
              <img
                src={imagePreview}
                alt=""
                className="w-[55%] h-auto rounded object-cover object-center mx-auto"
              />
            </div>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={postData.title}
              onChange={(e) => handleOnChange(e)}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <BlogEditor onSave={handleSave} />

            <BlogViewer content={postData.content} />

            {/* <textarea
              name="content"
              placeholder="Content"
              value={postData.content}
              onChange={(e) => handleOnChange(e)}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
            ></textarea> */}

            {/* Categories Select */}
            <select
              name="category"
              value={postData.category}
              onChange={(e) => handleOnChange(e)}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleOnChange(e)}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="submit"
              disabled={createPostLoading}
              style={{ backgroundColor: primaryColor, color: textColor }}
              value="Create Post"
              className="px-8 py-2 rounded w-fit mx-auto"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
