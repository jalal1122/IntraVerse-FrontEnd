import React from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import SEO from "../Components/SEO";

const Card = ({ children, borderColor, bgCard }) => (
  <div
    className="rounded-xl p-5 md:p-6 shadow-sm"
    style={{
      border: `1px solid ${borderColor}`,
      backgroundColor: bgCard,
    }}
  >
    {children}
  </div>
);

const PrivacyPolicy = () => {
  const { primaryColor, textColor } = useSelector((s) => s.color.colors);

  const mode = localStorage.getItem("mode") || "dark";
  const isLight = mode === "dark";
  const borderColor = isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)";
  const bgSoft = isLight ? "#F8FAFC" : "rgba(255,255,255,0.03)";
  const bgCard = isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)";
  const muted = isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)";

  const lastUpdated = new Date().toLocaleDateString();

  return (
    <>
      <SEO
        title="Privacy Policy - IntraVerse"
        description="Our commitment to your privacy and how we handle your data."
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
          <div className="relative z-10">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
              style={{
                color: primaryColor,
                backgroundColor: isLight
                  ? `${primaryColor}14`
                  : `${primaryColor}22`,
                border: `1px solid ${primaryColor}55`,
              }}
            >
              IntraVerse
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              Privacy Policy
            </h1>
            <p
              className="mt-3 md:mt-4 text-sm md:text-base"
              style={{ color: muted }}
            >
              Your privacy matters. This page explains what we collect while you
              browse posts and leave anonymous comments, how we use that data,
              and your choices.
            </p>
            <p className="mt-1 text-xs md:text-sm" style={{ color: muted }}>
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Decorative glow */}
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: primaryColor }}
          />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">
                Information We Collect
              </h2>
              <ul
                className="mt-3 space-y-2 text-sm md:text-base"
                style={{ color: muted }}
              >
                <li>
                  • Anonymous comments you submit: a display name you type and
                  the message content.
                </li>
                <li>
                  • Usage data: pages visited, interactions, approximate region
                  (via IP), and basic device information.
                </li>
                <li>
                  • Cookies: essential cookies for site operation and anti‑spam,
                  plus optional analytics cookies to improve performance.
                </li>
              </ul>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">
                How We Use Your Information
              </h2>
              <ul
                className="mt-3 space-y-2 text-sm md:text-base"
                style={{ color: muted }}
              >
                <li>
                  • Operate the site so you can read posts and submit anonymous
                  comments.
                </li>
                <li>
                  • Moderate comments and protect against spam, abuse, and
                  security threats.
                </li>
                <li>
                  • Improve the product using aggregate analytics and
                  performance metrics.
                </li>
                <li>
                  • We do not send promotional emails or require user accounts.
                </li>
              </ul>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">
                Sharing & Third Parties
              </h2>
              <ul
                className="mt-3 space-y-2 text-sm md:text-base"
                style={{ color: muted }}
              >
                <li>
                  • Service providers (e.g., hosting, analytics, anti‑spam)
                  under contractual safeguards.
                </li>
                <li>
                  • Legal compliance: when required by law or to protect users
                  and our platform.
                </li>
                <li>
                  • Aggregate or de‑identified insights that cannot identify
                  you.
                </li>
                <li>• We do not sell personal data.</li>
              </ul>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">
                Cookies & Preferences
              </h2>
              <p className="mt-3 text-sm md:text-base" style={{ color: muted }}>
                We use essential cookies (including anti‑spam) to make the site
                work and analytics cookies to improve performance. You can
                manage cookies in your browser settings. Disabling some cookies
                may affect features like posting a comment.
              </p>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">Data Retention</h2>
              <p className="mt-3 text-sm md:text-base" style={{ color: muted }}>
                We retain anonymous comments and related moderation logs as long
                as necessary to operate the site and protect the community. You
                can request removal of a specific comment by sharing its URL,
                your display name, and the approximate time it was posted.
              </p>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">Your Rights</h2>
              <ul
                className="mt-3 space-y-2 text-sm md:text-base"
                style={{ color: muted }}
              >
                <li>
                  • Request removal of your anonymous comment(s) by providing
                  the comment URL and details.
                </li>
                <li>
                  • Where required by law, you may have rights to access or
                  delete information associated with your activity.
                </li>
                <li>
                  • Since accounts are not required, we do not maintain profiles
                  or contact lists.
                </li>
              </ul>
            </Card>

            <Card borderColor={borderColor} bgCard={bgCard}>
              <h2 className="text-xl md:text-2xl font-bold">Contact Us</h2>
              <p className="mt-3 text-sm md:text-base" style={{ color: muted }}>
                Questions about privacy? Reach us at
                <span className="font-semibold" style={{ color: primaryColor }}>
                  {" "}
                  jk4350649@gmail.com
                </span>
                .
              </p>
            </Card>
          </div>

          {/* Right column: Quick summary */}
          <div className="space-y-6">
            <div
              className="rounded-2xl p-5 sticky top-6"
              style={{
                border: `1px solid ${borderColor}`,
                backgroundColor: bgSoft,
              }}
            >
              <h3 className="text-lg md:text-xl font-semibold">At a Glance</h3>
              <ul className="mt-3 space-y-3 text-sm" style={{ color: muted }}>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-0.5 inline-block w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  No account required. Read posts freely and comment
                  anonymously.
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-0.5 inline-block w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  Minimal data collected (comment name + message, usage
                  analytics). No data sales.
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-0.5 inline-block w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  You can request removal of your comment at any time.
                </li>
              </ul>

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
                  Tip: Keep your account secure with a strong password and never
                  share your credentials.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div
          className="mt-8 md:mt-12 text-xs md:text-sm text-center"
          style={{ color: muted }}
        >
          This Privacy Policy may update occasionally. We’ll notify you about
          significant changes.
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
