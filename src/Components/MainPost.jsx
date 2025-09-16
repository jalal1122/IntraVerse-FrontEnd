import { Link } from "react-router";

const MainPost = ({ post }) => {
  return (
    <div className="flex flex-col gap-1 mb-6 w-[48%]">
      <Link to={`/post/${post._id}`}>
        <img
          src={post.image}
          alt={post.title}
          className="max-h-50 w-full hover:scale-105 transition-transform duration-200 hover:cursor-pointer"
        />
      </Link>
      <Link to={`/post/${post._id}`}>
        <h3
          title={post.title}
          className="text-lg font-semibold mb-1 hover:underline underline-offset-4"
        >
          {post.title.slice(0, 40)}...
        </h3>
      </Link>
      <h4>{post.createdAt.split("T")[0]}</h4>
      <p
        className="text-lg text-gray-600"
        dangerouslySetInnerHTML={{ __html: post.content.slice(0, 90) }}
      ></p>
    </div>
  );
};

export default MainPost;
