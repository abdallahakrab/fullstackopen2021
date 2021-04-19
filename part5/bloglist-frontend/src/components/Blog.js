import React, { useState } from "react";
const Blog = ({ blog, likeBlog }) => {
  const [toggleDetails, setToggleDetails] = useState(false);

  const handleLike = () => {
    // e.preventDefault();
    console.log(blog);
    likeBlog({ id: blog.id, likes: blog.likes + 1 });
  };
  return (
    <ul style={blogStyle}>
      <li>
        {blog.title}
        <button
          onClick={() => {
            setToggleDetails(!toggleDetails);
          }}
        >
          {toggleDetails ? "hide" : "view"}
        </button>
      </li>
      {toggleDetails ? (
        <div>
          <li>{blog.url}</li>{" "}
          <li>
            {`likes ${blog.likes}`}
            <button
              onClick={() => {
                handleLike();
              }}
            >
              like
            </button>
          </li>
          <li>{blog.author}</li>
        </div>
      ) : (
        ""
      )}
    </ul>
  );
};
export default Blog;

const blogStyle = {
  border: "solid",
  borderWitdh: 1,
  borderColor: "black",
  listStyle: "none",
};
