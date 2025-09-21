import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../features/Posts/postsSlice.js";
import Loader from "../Loader";
import { useEffect } from "react";
import SEO from "../SEO";
import "./content.css";

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
    <>
      <SEO
        title={post?.title + " - IntraVerse"}
        description={post?.content
          .replace(/<[^>]+>/g, "")
          .substring(0, 150)
          .concat("...")}
        keywords={post?.tags ? post.tags.join(", ") : "IntraVerse, Blog"}
        url={window.location.href}
        image={post?.image}
        type="article"
        author={post?.author?.name || "IntraVerse"}
        datePublished={post?.createdAt}
        dateModified={post?.updatedAt}
      />

      <div className="flex flex-col gap-3 p-3">
        {/* Category */}
        <h2
          className="font-bold uppercase tracking-wide text-sm w-fit px-2 py-1 rounded"
          style={{ backgroundColor: primaryColor }}
        >
          {post?.category}
        </h2>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
          {post?.title}
        </h1>

        {/* Date */}
        <p className="text-sm opacity-80">
          Published on: {new Date(post?.createdAt).toLocaleDateString()}
        </p>

        {/* Image */}
        <div className="w-full overflow-hidden rounded-xl shadow-lg">
          <img
            src={post?.image}
            alt={post?.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none text-[1.05rem] leading-relaxed">
          <div
            className="ck-render"
            dangerouslySetInnerHTML={{ __html: post?.content }}
            style={{
              "--border-color": `${
                localStorage.getItem("mode") === "dark"
                  ? "rgba(0, 0, 0, 0.12)"
                  : "rgba(255, 255, 255, 0.12)"
              }`,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Post;
