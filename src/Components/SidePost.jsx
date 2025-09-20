import { Link } from "react-router";

const SidePost = ({ post }) => {
  return (
    <div
      key={post._id}
      className="w-full flex gap-3 p-2 hover:cursor-pointer rounded-lg hover:bg-white/5 transition-colors"
    >
      <Link to={`/post/${post._id}`}>
        <div className="w-28 h-20 sm:w-32 sm:h-24 rounded overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
          />
        </div>
      </Link>
      <div className="w-full">
        <Link to={`/post/${post._id}`}>
          <h4
            title={post.title}
            className="font-semibold hover:underline underline-offset-4 md:line-clamp-2 "
          >
            {post.title}
          </h4>
        </Link>
        <p className="text-sm opacity-80">{post.createdAt.split("T")[0]}</p>
      </div>
    </div>
  );
};

export default SidePost;
