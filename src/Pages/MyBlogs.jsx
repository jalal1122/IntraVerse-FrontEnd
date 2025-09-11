import { useEffect } from "react";
import Header from "../Components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { getAdminPosts } from "../features/admin/adminSlice.js";
import Loader from "../Components/Loader";
import AdminPost from "../Components/MyBlogs Components/adminPost";

const MyBlogs = () => {
  const { textColor, primaryColor } = useSelector(
    (state) => state.color.colors
  );
  const dispatch = useDispatch();

  const { adminPosts, adminIsLoading, adminIsSuccess, adminIsError } =
    useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdminPosts());
  }, [dispatch]);

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
        className="w-[1200px] flex flex-col gap-5 mx-auto my-10"
      >
        <div className="flex justify-between mx-5 items-center">
          <h1 className="text-3xl font-bold">My Blogs</h1>

          <button
            className="px-4 py-2 rounded hover:scale-95 transition-all duration-300 active:scale-105 hover:cursor-pointer"
            style={{
              backgroundColor: primaryColor,
            }}
          >
            Create Blog
          </button>
        </div>
        {adminIsSuccess && adminPosts.length === 0 ? (
          <h1 className="text-3xl font-bold text-center">No Blogs Found</h1>
        ) : (
          <div className="flex flex-wrap gap-3 p-2">
            {adminPosts.map((post) => (
              <AdminPost post={post} key={post._id} primaryColor={primaryColor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
