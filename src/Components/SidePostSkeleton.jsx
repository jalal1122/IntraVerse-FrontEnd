// Full-row white flashing skeleton for SidePost
const SidePostSkeleton = () => {
  return (
    <div className="w-full flex gap-3 p-2 rounded-lg animate-flash">
      {/* Thumbnail placeholder */}
      <div
        className="w-28 h-20 sm:w-32 sm:h-24 rounded overflow-hidden flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)" }}
      />

      {/* Text placeholders */}
      <div className="flex-1 py-1">
        <div
          className="h-4 rounded"
          style={{ width: "85%", background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)" }}
        />
        <div
          className="h-4 rounded mt-2 hidden md:block"
          style={{ width: "70%", background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)" }}
        />
        <div
          className="h-3 rounded mt-3 opacity-80"
          style={{ width: "40%", background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)" }}
        />
      </div>
    </div>
  );
};

export default SidePostSkeleton;
