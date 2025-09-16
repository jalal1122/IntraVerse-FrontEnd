const BlogViewer = ({ content }) => {
  return (
    <div
      className=" max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default BlogViewer;
