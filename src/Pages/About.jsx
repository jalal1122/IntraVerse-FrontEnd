import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import SEO from "../Components/SEO";

const Pill = ({ children, primaryColor }) => (
  <span
    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
    style={{
      color: primaryColor,
      backgroundColor: `${primaryColor}1A`,
      border: `1px solid ${primaryColor}66`,
    }}
  >
    {children}
  </span>
);

const Card = ({ children, borderColor, bgCard }) => (
  <div
    className="rounded-xl p-5 md:p-6 shadow-sm"
    style={{ border: `1px solid ${borderColor}`, backgroundColor: bgCard }}
  >
    {children}
  </div>
);

const About = () => {
  const { primaryColor, textColor } = useSelector((s) => s.color.colors);

  const mode = localStorage.getItem("mode") || "dark";
  // Keep consistent with PrivacyPolicy/Terms styling approach
  const isLight = mode === "dark";
  const borderColor = isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)";
  const bgSoft = isLight ? "#F8FAFC" : "rgba(255,255,255,0.03)";
  const bgCard = isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)";
  const muted = isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)";

  return (
    <>
      <SEO
        title="About • Muhammad Uzair - IntraVerse"
        description="Meet Muhammad Uzair — crafting modern, human-centered web experiences with a love for performance, clarity, and creativity."
        keywords="About Muhammad Uzair, Frontend Engineer, MERN Developer, UI Designer, Web Developer, IntraVerse"
        url={window.location.href}
        // image="https://intraverse.app/logo192.png"
        type="website"
        author="Muhammad Uzair"
      />
      <Header />

      <div
        className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 my-6 md:my-10"
        style={{ color: textColor }}
      >
        {/* Hero */}
        <div
          className="relative overflow-hidden rounded-2xl p-6 md:p-10 mb-6 md:mb-10"
          style={{
            border: `1px solid ${borderColor}`,
            background: isLight
              ? `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`
              : `linear-gradient(135deg, ${primaryColor}22, ${primaryColor}0F)`,
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Pill primaryColor={primaryColor}>Hello, I’m</Pill>
              <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                Muhammad Uzair
              </h1>
              <p
                className="mt-3 md:mt-4 text-sm md:text-base max-w-2xl"
                style={{ color: muted }}
              >
                Frontend Engineer • MERN Explorer • UI Craftsperson. I blend
                performance, accessibility, and tasteful design to build
                experiences that feel fast, clear, and simply enjoyable.
              </p>
            </div>

            {/* Avatar badge */}
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full grid place-items-center text-2xl font-extrabold shadow-inner"
                style={{
                  background: `radial-gradient(120% 120% at 10% 10%, ${primaryColor} 0%, transparent 60%)`,
                  border: `2px solid ${primaryColor}77`,
                }}
              >
                MU
              </div>
            </div>
          </div>

          {/* Decorative glows */}
          <div
            className="absolute -top-20 -right-10 w-72 h-72 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: primaryColor }}
          />
          <div
            className="absolute -bottom-16 -left-10 w-60 h-60 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: primaryColor }}
          />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">A bit about me</h2>
              <p className="mt-3 text-sm md:text-base" style={{ color: muted }}>
                I’m a product‑minded developer who believes great interfaces are
                equal parts empathy and engineering. My work is guided by a few
                principles: keep it fast, make it obvious, and add a little
                magic.
              </p>
              <p className="mt-3 text-sm md:text-base" style={{ color: muted }}>
                From micro‑interactions to information architecture, I love
                shaping the details that make products feel effortless.
                Recently, I’ve been exploring rich content editors, delightful
                search experiences, and resilient design systems.
              </p>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">
                What I work with
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "React",
                  "Redux",
                  "Vite",
                  "Tailwind",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "Editor.js / CKEditor",
                  "UX Writing",
                  "Accessibility",
                ].map((s) => (
                  <Pill key={s} primaryColor={primaryColor}>
                    {s}
                  </Pill>
                ))}
              </div>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">Philosophy</h2>
              <ul
                className="mt-3 space-y-2 text-sm md:text-base"
                style={{ color: muted }}
              >
                <li>• Design for clarity first—beauty follows.</li>
                <li>• Ship in small slices and refine with real feedback.</li>
                <li>
                  • Align brand, content, and interaction so the product feels
                  coherent.
                </li>
                <li>
                  • Performance is a feature. Accessibility is non‑negotiable.
                </li>
              </ul>
            </Card>
          </div>

          {/* Side column */}
          <div className="space-y-6">
            <div
              className="rounded-2xl p-5"
              style={{
                border: `1px solid ${borderColor}`,
                backgroundColor: bgSoft,
              }}
            >
              <h3 className="text-lg md:text-xl font-semibold">Highlights</h3>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { k: "Years", v: "3+" },
                  { k: "Projects", v: "20+" },
                  { k: "Cups ☕", v: "∞" },
                ].map((it) => (
                  <div
                    key={it.k}
                    className="rounded-lg py-3"
                    style={{
                      border: `1px dashed ${borderColor}`,
                      backgroundColor: bgCard,
                    }}
                  >
                    <div
                      className="text-xl font-extrabold"
                      style={{ color: primaryColor }}
                    >
                      {it.v}
                    </div>
                    <div className="text-xs mt-1" style={{ color: muted }}>
                      {it.k}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-5 p-4 rounded-xl"
                style={{
                  backgroundColor: isLight
                    ? `${primaryColor}0F`
                    : `${primaryColor}22`,
                  border: `1px solid ${primaryColor}55`,
                }}
              >
                <p className="text-sm">
                  Always learning, always building—one clean commit at a time.
                </p>
              </div>
            </div>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h3 className="text-lg md:text-xl font-semibold">Get in touch</h3>
              <p className="mt-3 text-sm md:text-base" style={{ color: muted }}>
                Have an idea or feedback? I’d love to hear it.
              </p>
              <a
                href="mailto:jk4350649@gmail.com?subject=Hello%20Muhammad%20Uzair"
                rel="nofollow"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg font-semibold"
                style={{ backgroundColor: primaryColor, color: "white" }}
              >
                Say Hello
              </a>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
