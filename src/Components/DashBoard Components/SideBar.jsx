import { useSelector } from "react-redux";

const SideBar = () => {
  const { trendingPosts } = useSelector((state) => state.posts);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center hover:underline underline-offset-7 ">Trending Posts</h2>
      {trendingPosts.map((post) => (
        <div key={post._id} className="flex p-2 border-b border-gray-200">
          <img
            src={post.image}
            alt={post.title}
            className="w-30 h-18 object-cover mr-2"
          />
          <div>
            <h4 className="font-semibold">{post.title}</h4>
            <p className="text-sm text-gray-600">
              {post.createdAt.split("T")[0]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
