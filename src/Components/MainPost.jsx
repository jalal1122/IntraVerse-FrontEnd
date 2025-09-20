import { Link } from "react-router";

const MainPost = ({ post }) => {
  return (
    <div className="flex flex-col gap-2 mb-6 w-full md:w-[48%]">
      <Link to={`/post/${post._id}`}>
        <div className="w-full overflow-hidden rounded-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto max-h-60 object-cover hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
          />
        </div>
      </Link>
      <Link to={`/post/${post._id}`}>
        <h3
          title={post.title}
          className="text-base sm:text-lg font-semibold mb-1 hover:underline underline-offset-4"
        >
          {post.title}
        </h3>
      </Link>
      <h4 className="text-sm opacity-80">{post.createdAt.split("T")[0]}</h4>
    </div>
  );
};

export default MainPost;
