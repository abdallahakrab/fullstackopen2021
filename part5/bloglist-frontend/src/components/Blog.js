import React, { useState } from "react";
import PropTypes from "prop-types";
const Blog = ({ blog, username, likeBlog, removeBlog }) => {
  const [toggleDetails, setToggleDetails] = useState(false);

  const handleLike = () => {
    // e.preventDefault();
    console.log(blog);
    likeBlog({ id: blog.id, likes: blog.likes + 1 });
  };
  const handleRemove = () => {
    const confirmDelete = window.confirm(
      ` do you really want to remove ${blog.title}`
    );
    if (confirmDelete) {
      removeBlog(blog.id);
    }
  };
  return (
    <ul className="blog" style={blogStyle}>
      <li>
        {blog.title} {blog.author}
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
          <li>{blog.url}</li>
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
          {blog.user.username === username ? (
            <button onClick={handleRemove}>delete</button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </ul>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};
export default Blog;

const blogStyle = {
  border: "solid",
  borderWitdh: 1,
  borderColor: "black",
  listStyle: "none",
};
