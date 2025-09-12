import { Link } from "react-router";

const SidePost = ({ post }) => {
  return (
    <div key={post._id} className="flex gap-2 p-2 hover:cursor-pointer">
      <Link to={`/post/${post._id}`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-30 h-auto object-cover object-center mr-2 hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
        />
      </Link>
      <div>
        <Link to={`/post/${post._id}`}>
          <h4 className="font-semibold hover:underline underline-offset-4">{post.title}</h4>
        </Link>
        <p className="text-sm text-gray-600">{post.createdAt.split("T")[0]}</p>
      </div>
    </div>
  );
};

export default SidePost;
