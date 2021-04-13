import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      const currentUser = localStorage.getItem("user");
      setUser(JSON.parse(currentUser));
    }
    fetchData();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
    };
    try {
      const userR = await loginService.login(credentials);
      setUser(userR);
      localStorage.setItem("user", JSON.stringify(userR));
      blogService.setToken(userR.token);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      const blogR = await blogService.add(newBlog);
      setBlogs(blogs.concat(blogR));
    } catch (error) {
      console.log(error);
    }
  };

  const LoginForm = () => (
    <div>
      <form method="POST">
        <label htmlFor="password">Username</label>
        <input
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
          id="username"
          type="text"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
          type="password"
          name="password"
          id="password"
        />
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );

  const BlogForm = () => (
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
  if (user === null) {
    return (
      <div>
        <h2>Blogs</h2>
        {LoginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in </p>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          setUser(null);
          blogService.setToken(null);
        }}
      >
        logout
      </button>
      {BlogForm()}

      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
