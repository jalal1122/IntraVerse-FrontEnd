// White flashing placeholder for side post thumbnail
const SideThumbFlash = () => {
  return (
    <div
      className="w-28 h-20 sm:w-32 sm:h-24 rounded overflow-hidden relative animate-flash"
      style={{
        background: "linear-gradient(135deg, #fff 65%, #e5e7eb 100%)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-white/80 blur-md animate-pulse" />
      </div>
    </div>
  );
};

export default SideThumbFlash;
