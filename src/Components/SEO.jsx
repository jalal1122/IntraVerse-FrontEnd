import { Title, Meta } from "react-head";

export default function SEO({
  title,
  description,
  keywords,
  url,
  image,
  type = url.includes("post/") ? "article" : "website", // "website" for pages, "article" for blog posts
  author = "IntraVerse", // default author
  datePublished,
  dateModified,
}) {
  const siteName = "IntraVerse";

  // JSON-LD structured data for articles
  const jsonLd =
    type === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          image: image ? [image] : undefined,
          author: {
            "@type": "Person",
            name: author,
          },
          publisher: {
            "@type": "Organization",
            name: siteName,
            logo: {
              "@type": "ImageObject",
              url: "https://intraverse.me/favicon.ico",
            },
          },
          datePublished: datePublished,
          dateModified: dateModified || datePublished,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
        }
      : null;

  const postUrl = "https://intraverse.me/post/" + title.slice(0, 20);

  return (
    <>
      <link
        rel="alternate"
        type="application/rss+xml"
        title="IntraVerse Blog RSS Feed"
        href="https://intraverse.me/rss.xml"
      />

      {/* Basic */}
      {title && <Title>{title}</Title>}
      {description && <Meta name="description" content={description} />}
      {keywords && <Meta name="keywords" content={keywords} />}
      {url && (
        <link rel="canonical" href={url.includes("post/") ? postUrl : url} />
      )}
      {/* Open Graph */}
      {title && <Meta property="og:title" content={title} />}
      {description && <Meta property="og:description" content={description} />}
      {image && <Meta property="og:image" content={image} />}
      {url && <Meta property="og:url" content={url} />}
      {type && <Meta property="og:type" content={type} />}
      <Meta property="og:site_name" content={siteName} />
      {/* Twitter */}
      {title && <Meta name="twitter:title" content={title} />}
      {description && <Meta name="twitter:description" content={description} />}
      {image && <Meta name="twitter:image" content={image} />}
      <Meta name="twitter:card" content="summary_large_image" />
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </>
  );
}
