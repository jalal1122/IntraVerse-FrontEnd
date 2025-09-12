import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { getEditPost, updatePost } from "../../features/admin/adminSlice.js";
import selectCategories from "../../utils/blogCategories.js";
import Loader from "../Loader";

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
      <div
        style={{ color: textColor }}
        className="w-[1200px] mx-auto my-10 flex flex-col gap-5"
      >
        <h1 className="font-bold text-center text-3xl">Edit Post</h1>

        {/* Edit Post Content */}
        {!editPostLoading && editPostSuccess && (
          <form onSubmit={formSubmitHandler}>
            <div className="flex flex-col gap-3 w-[600px] mx-auto">
              {/* Post Image Preview */}
              {postData.image && (
                <img
                  src={
                    postData?.image === editPost?.image
                      ? postData.image
                      : imagePreview
                  }
                  alt="Post"
                  className="h-auto w-[55%] mx-auto object-cover rounded object-center"
                />
              )}

              {/* Title */}
              <input
                type="text"
                name="title"
                value={postData.title}
                onChange={handleOnChange}
                placeholder="Title"
                className="border border-gray-300 p-2 rounded"
              />

              {/* Content */}
              <textarea
                name="content"
                value={postData.content}
                onChange={handleOnChange}
                placeholder="Content"
                className="border border-gray-300 p-2 rounded"
              ></textarea>

              {/* Categories Select */}
              <select
                name="category"
                value={postData.category}
                onChange={handleOnChange}
                className="border border-gray-300 p-2 rounded"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {selectCategories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    style={{ color: "white", backgroundColor: "black" }}
                  >
                    {category}
                  </option>
                ))}
              </select>

              {/* Image Upload */}
              <input
                type="file"
                name="image"
                onChange={handleOnChange}
                className="border border-gray-300 p-2 rounded"
              />

              {/* Submit Button */}
              <button
                type="submit"
                style={{ backgroundColor: primaryColor, color: textColor }}
                className="rounded w-fit px-8 py-2 mx-auto"
              >
                Update Post
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default EditPost;
