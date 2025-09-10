import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../features/Posts/postsSlice";
import Loader from "../Loader";
import { useEffect } from "react";

const Post = ({ id }) => {
  const { primaryColor } = useSelector((state) => state.color.colors);

  const dispatch = useDispatch();
  const { post, postIsLoading, postIsError } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);

  if (postIsLoading) {
    return <Loader />;
  }

  if (postIsError) {
    return <div>Error loading post.</div>;
  }
  return (
    <div className="flex flex-col gap-2 p-3">
        {/* Category */}
      <h2 className="font-bold uppercase" style={{ color: primaryColor }}>{post?.category}</h2>

        {/* Title */}
        <h1 className="text-3xl font-extrabold">{post?.title}</h1>

        {/* Date */}
        <p className="text-sm text-gray-500">Published on: {new Date(post?.createdAt).toLocaleDateString()}</p>

        {/* Image */}
        <img src={post?.image} alt={post?.title} className="w-full h-auto rounded-lg" />

        {/* Content */}
        <p className="text-lg leading-relaxed">{post?.content}</p>
    </div>
  );
};

export default Post;
