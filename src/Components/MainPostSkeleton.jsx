// White flashing skeleton for the large MainPost card
const MainPostSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 mb-6 w-full md:w-[48%] animate-flash">
      <div className="w-full overflow-hidden rounded-lg">
        <div
          className="w-full h-60"
          style={{ background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)" }}
        />
      </div>
      <div
        className="h-5 rounded"
        style={{ width: "80%", background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)" }}
      />
      <div
        className="h-4 rounded opacity-80"
        style={{ width: "40%", background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)" }}
      />
    </div>
  );
};

export default MainPostSkeleton;
