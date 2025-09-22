// White flashing skeleton for Post Details view
const PostDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 p-3 animate-flash">
      {/* Category chip */}
      <div
        className="h-6 w-28 rounded"
        style={{
          background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)",
        }}
      />
      {/* Title lines */}
      <div
        className="h-7 w-[85%] rounded"
        style={{
          background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)",
        }}
      />
      <div
        className="h-6 w-[65%] rounded hidden sm:block"
        style={{
          background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)",
        }}
      />
      {/* Date */}
      <div
        className="h-4 w-40 rounded opacity-80"
        style={{
          background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)",
        }}
      />
      {/* Image placeholder */}
      <div className="w-full overflow-hidden rounded-xl shadow-lg">
        <div
          className="w-full h-64 md:h-80"
          style={{
            background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)",
          }}
        />
      </div>
      {/* Content blocks */}
      <div className="space-y-3">
        <div
          className="h-4 w-full rounded"
          style={{
            background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)",
          }}
        />
        <div
          className="h-4 w-[92%] rounded"
          style={{
            background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)",
          }}
        />
        <div
          className="h-4 w-[88%] rounded"
          style={{
            background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)",
          }}
        />
        <div
          className="h-4 w-[75%] rounded"
          style={{
            background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)",
          }}
        />
      </div>
    </div>
  );
};

export default PostDetailSkeleton;
