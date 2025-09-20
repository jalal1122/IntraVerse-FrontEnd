const BlogViewer = ({ content }) => {
  return (
    <div
      className="max-w-none text-[15px] sm:text-[16px] leading-7 sm:leading-8 space-y-4 sm:space-y-6"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default BlogViewer;
