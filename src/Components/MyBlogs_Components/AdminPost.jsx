import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  deletePost,
  resetDeletePost,
} from "../../features/admin/adminSlice.js";

const AdminPost = ({ post, primaryColor }) => {
  const navigate = useNavigate();

  // Admin delete state will be accessed inside the modal to avoid stale closures

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const [postToDelete, setPostToDelete] = useState(null);

  const handlePostDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  const RenderModal = () => {
    const { textColor, bgColor } = useSelector((state) => state.color.colors);
    const { deletePostLoading, deletePostError, deletePostSuccess } =
      useSelector((state) => state.admin);

    useEffect(() => {
      if (deletePostSuccess) {
        setShowModal(false);
        setPostToDelete(null);
        dispatch(resetDeletePost());
      }
    }, [deletePostSuccess]);

    return (
      <div className="fixed inset-0 z-50">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        />
        <div className="relative h-full w-full flex items-center justify-center p-4">
          {deletePostLoading ? (
            <div
              className="w-[320px] px-6 py-6 rounded-xl shadow-xl border border-white/10"
              style={{ backgroundColor: textColor }}
            >
              <div className="text-center" style={{ color: bgColor }}>
                <div
                  className="animate-spin rounded-full h-10 w-10 border-2 border-t-transparent mx-auto mb-4"
                  style={{ borderColor: primaryColor }}
                ></div>
                <p>Deleting post...</p>
              </div>
            </div>
          ) : (
            <div
              className="w-full max-w-md p-6 rounded-2xl shadow-xl border border-white/10"
              style={{ backgroundColor: textColor, color: bgColor }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold">Delete post?</h2>
                  <p className="text-sm mt-1 opacity-80">
                    This action cannot be undone.
                  </p>
                </div>
                <button
                  aria-label="Close"
                  className="ml-3 rounded-full p-1 hover:opacity-80"
                  style={{ color: bgColor }}
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
              </div>
              {deletePostError && (
                <p className="text-sm text-red-500 mt-3">{deletePostError}</p>
              )}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-lg border border-gray-300/50 hover:opacity-90 transition"
                  onClick={() => setShowModal(false)}
                  style={{ color: bgColor }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg shadow-sm hover:opacity-90 active:scale-[0.99] transition"
                  style={{ backgroundColor: primaryColor, color: "white" }}
                  onClick={() => handlePostDelete(postToDelete)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="w-full max-w-sm border rounded-xl border-gray-200/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white/5 backdrop-blur-sm"
      key={post._id}
    >
      <div className="relative">
        <img
          src={post?.image}
          alt={post.title}
          className="h-44 w-full object-cover"
        />
        <span
          className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full backdrop-blur-sm"
          style={{ backgroundColor: `${primaryColor}E6`, color: "white" }}
        >
          {post.category}
        </span>
      </div>

      <div className="p-3">
        <h1 className="text-base font-semibold line-clamp-2 min-h-[2.5rem]">
          {post.title}
        </h1>
        <div className="mt-1 flex items-center justify-between text-xs opacity-80">
          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
          {/* placeholder for views/comments in future */}
        </div>

        <div className="flex justify-center gap-3 mt-3">
          <button
            className="px-4 py-1.5 rounded-lg shadow-sm hover:opacity-90 active:scale-[0.99] transition"
            style={{ backgroundColor: primaryColor, color: "white" }}
            onClick={() => navigate(`/edit-blog/${post._id}`)}
          >
            Edit
          </button>
          <button
            className="px-4 py-1.5 rounded-lg border border-gray-300/60 hover:opacity-90 active:scale-[0.99] transition"
            style={{ color: "white", backgroundColor: primaryColor }}
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
