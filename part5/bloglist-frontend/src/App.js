import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Toggable from "./components/Toggable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      const currentUser = localStorage.getItem("user");
      setUser(JSON.parse(currentUser));
      blogService.setToken(JSON.parse(currentUser).token);
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
      setNotification("Invalid username or password");
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  };

  const createBlog = async ({ title, author, url }) => {
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      const blogR = await blogService.add(newBlog);
      setBlogs(blogs.concat(blogR));
      setNotification(`new blog ${blogR.title} by ${blogR.author} added`);
      setTimeout(() => {
        setNotification("");
      }, 5000);
      // TODO: close newblog form
      blogFormRef.current.setVisibility();
    } catch (error) {
      console.log(error);
    }
  };

  const likeBlog = async ({ id, likes }) => {
    try {
      const response = await blogService.like({ likes, id });
      const blog = blogs.find((blog) => blog.id === id);
      const updatedBlog = { ...blog, likes };
      const newBlogs = blogs.map((blog) => {
        if (blog.id === id) {
          return updatedBlog;
        }
        return blog;
      });
      setBlogs(newBlogs);
      console.log(response);
    } catch (e) {
      console.error(e);
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

  //blog form def
  if (user === null) {
    return (
      <div>
        <h2>Blogs</h2>
        {notification}
        {LoginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification}
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
      <Toggable buttonText="add new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggable>

      {user &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog likeBlog={likeBlog} key={blog.id} blog={blog} />
          ))}
    </div>
  );
};

export default App;
