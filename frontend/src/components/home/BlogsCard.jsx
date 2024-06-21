/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import BlogSingleCard from "./BlogSingleCard";

const BlogsCard = ({ blogs }) => {
  return (
    <div className="w-full">
      {blogs.map((blog, index) => (
        //Refactored Card creation to BlogSingleCard file
        //in map we need to have a unique key for each book, so that't why we are sending a unique key
        <BlogSingleCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsCard;
