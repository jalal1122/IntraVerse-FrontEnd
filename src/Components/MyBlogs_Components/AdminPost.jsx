import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  deletePost,
  resetDeletePost,
} from "../../features/admin/adminSlice.js";

const AdminPost = ({ post, primaryColor }) => {
  const navigate = useNavigate();

  const { deletePostLoading, deletePostError, deletePostSuccess } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const [postToDelete, setPostToDelete] = useState(null);

  const handlePostDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  const RenderModal = () => {
    const { textColor, bgColor } = useSelector((state) => state.color.colors);

    useEffect(() => {
      if (deletePostSuccess) {
        setShowModal(false);
        setPostToDelete(null);
        dispatch(resetDeletePost());
      }
    }, [deletePostSuccess, dispatch]);

    return (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.9)] flex items-center justify-center z-50">
        {deletePostError && (
          <p className="text-red-500 text-center mb-4">{deletePostError}</p>
        )}
        {deletePostLoading ? (
          <div
            className="w-[300px] h-fit px-5 py-3 flex items-center justify-center"
            style={{ backgroundColor: textColor }}
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p style={{ color: bgColor }}>Deleting Post...</p>
            </div>
          </div>
        ) : (
          <div
            className="p-6 rounded-xl shadow-lg"
            style={{ backgroundColor: textColor, color: bgColor }}
          >
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 font-semibold rounded hover:cursor-pointer hover:scale-95 transition-all duration-300 active:scale-105"
                style={{ backgroundColor: primaryColor, color: "white" }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded hover:cursor-pointer hover:scale-95 transition-all duration-300 active:scale-105"
                style={{ backgroundColor: primaryColor, color: "white" }}
                onClick={() => handlePostDelete(postToDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-80 border rounded-lg border-gray-300 p-2" key={post._id}>
      <img
        src={post.image}
        alt={post.title}
        className="h-40 w-full object-cover rounded-lg"
      />

      <div className="p-2">
        <h1 className="text-xl font-bold">{post.title}</h1>
        <div className="flex justify-between">
          <p className="text-sm">{post.category}</p>
          <p className="text-sm">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <button
            className="px-7 py-1 rounded hover:cursor-pointer hover:scale-95 transition-all duration-3 active:scale-105"
            style={{ backgroundColor: primaryColor, color: "white" }}
            onClick={() => navigate(`/edit-blog/${post._id}`)}
          >
            Edit
          </button>
          <button
            className="px-7 py-1 rounded hover:cursor-pointer hover:scale-95 transition-all duration-300 active:scale-105"
            style={{ backgroundColor: primaryColor, color: "white" }}
            onClick={() => {
              setPostToDelete(post._id);
              setShowModal(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {showModal && <RenderModal />}
    </div>
  );
};

export default AdminPost;
