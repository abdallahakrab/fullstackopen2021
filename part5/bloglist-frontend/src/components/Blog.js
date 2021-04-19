import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [toggleDetails, setToggleDetails] = useState(false);
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
            <button>like</button>
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
