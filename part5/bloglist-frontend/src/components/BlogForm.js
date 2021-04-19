import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBlog = (e) => {
    e.preventDefault();
    createBlog({ title, author, url });
  };

  return (
    <div>
      <h1>create new</h1>
      <form method="POST">
        <label htmlFor="title">title</label>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          name="title"
          id="title"
        />
        <label htmlFor="author">author</label>
        <input
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          type="text"
          name="author"
          id="author"
        />
        <label htmlFor="url">url</label>
        <input
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          type="text"
          name="url"
          id="url"
        />
        <button onClick={handleAddBlog} type="submit">
          add
        </button>
      </form>
    </div>
  );
};
export default BlogForm;
