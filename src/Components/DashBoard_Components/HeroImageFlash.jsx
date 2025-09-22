// White flashing alt image (YouTube style)
const HeroImageFlash = () => {
  return (
    <div
      className="w-full h-[240px] sm:h-[320px] md:h-[420px] rounded-xl bg-neutral-200 relative overflow-hidden animate-flash"
      style={{
        background: "linear-gradient(135deg, #fff 60%, #e5e7eb 100%)",
        minHeight: 0,
      }}
    >
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/80 blur-2xl animate-pulse" />
      </div>
      {/* Flashing effect overlay */}
      <div className="absolute inset-0 pointer-events-none animate-flash" />
    </div>
  );
};

export default HeroImageFlash;
