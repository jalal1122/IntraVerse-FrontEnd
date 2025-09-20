import { useEffect } from "react";
import Header from "../Components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdminPosts,
  refreshTrendingPosts,
  resetRefreshTrendingPosts,
} from "../features/admin/adminSlice.js";
import Loader from "../Components/Loader";
import AdminPost from "../Components/MyBlogs_Components/AdminPost";
import { useNavigate } from "react-router";
import { getTrendingPosts } from "../features/Posts/postsSlice.js";

const MyBlogs = () => {
  const { textColor, primaryColor } = useSelector(
    (state) => state.color.colors
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    adminPosts,
    adminIsLoading,
    adminIsSuccess,
    adminIsError,
    refreshTrendingPostsLoading,
    refreshTrendingPostsSuccess,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdminPosts());
  }, [dispatch]);

  useEffect(() => {
    if (refreshTrendingPostsSuccess) {
      dispatch(getTrendingPosts());
      dispatch(resetRefreshTrendingPosts());
      navigate("/");
    }
  }, [refreshTrendingPostsSuccess]);

  if (adminIsLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header />

      {adminIsError && (
        <h1 className="text-3xl font-bold text-center my-10">{adminIsError}</h1>
      )}

      <div
        style={{ color: textColor }}
        className="w-full lg:p-0 xl:w-[1200px] flex flex-col gap-5 mx-auto my-10"
      >
        <div className="flex justify-between mx-5 items-center">
          <h1 className="text-3xl font-bold">My Blogs</h1>

          <div className="flex gap-3">
            {/* Refresh Trending List */}
            <button
              className="px-4 py-2 rounded hover:scale-95 transition-all duration-300 active:scale-105 hover:cursor-pointer"
              style={{
                backgroundColor: primaryColor,
              }}
              disabled={refreshTrendingPostsLoading}
              onClick={() => dispatch(refreshTrendingPosts())}
            >
              Refresh Trending List
            </button>

            {/* Create Post */}
            <button
              className="px-4 py-2 rounded hover:scale-95 transition-all duration-300 active:scale-105 hover:cursor-pointer"
              style={{
                backgroundColor: primaryColor,
              }}
              onClick={() => navigate("/create-blog")}
            >
              Create Blog
            </button>
          </div>
        </div>
        {adminIsSuccess && adminPosts.length === 0 ? (
          <h1 className="text-3xl font-bold text-center">No Blogs Found</h1>
        ) : (
          <div className="flex flex-wrap justify-center-safe items-center gap-3 p-2">
            {adminPosts.map((post) => (
              <AdminPost
                post={post}
                key={post._id}
                primaryColor={primaryColor}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
