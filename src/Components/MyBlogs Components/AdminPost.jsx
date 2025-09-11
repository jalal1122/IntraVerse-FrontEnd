const adminPost = ({ post, primaryColor }) => {
  return (
    <div className="w-80 border rounded-lg border-gray-300 p-2" key={post._id}>
      <img
        src={post.image}
        alt={post.title}
        className="h-40 w-full object-cover rounded-lg"
      />

      <div className="p-2">
        <h1 className="text-xl font-bold">{post.title}</h1>
        <div className="flex justify-between">
          <p className="text-sm">{post.category}</p>
          <p className="text-sm">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <button
            className="px-7 py-1 rounded hover:cursor-pointer hover:scale-95 transition-all duration-3 active:scale-105"
            style={{ backgroundColor: primaryColor }}
          >
            Edit
          </button>
          <button
            className="px-7 py-1 rounded hover:cursor-pointer hover:scale-95 transition-all duration-300 active:scale-105"
            style={{ backgroundColor: primaryColor }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default adminPost;
