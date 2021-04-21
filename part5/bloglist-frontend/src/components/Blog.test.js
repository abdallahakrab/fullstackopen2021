import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
const blog = {
  title: "blog title",
  author: "blog author",
  url: "www.random.com",
  likes: 12,
  user: { username: "randomusername" },
};
const likeMockHandler = jest.fn();
const removeMockHandler = jest.fn();
beforeEach(() => {});

describe("blog unexpanded", () => {
  test("blog extra info not rendered by default", () => {
    const component = render(
      <Blog
        username="randomusername"
        blog={blog}
        removeBlog={removeMockHandler}
        likeBlog={likeMockHandler}
      />
    );

    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(blog.likes);
  });
});

describe("blog expanded", () => {
  let component;
  beforeEach(() => {
    component = render(
      <Blog
        username="randomusername"
        blog={blog}
        removeBlog={removeMockHandler}
        likeBlog={likeMockHandler}
      />
    );
    const button = component.getByText("view");
    fireEvent.click(button);
  });

  test("blog url & likes are shown when see 'more button' is clicked ", () => {
    expect(component.container).toHaveTextContent("www.random.com");
    expect(component.container).toHaveTextContent("12");
  });

  test("like button clicked twice", () => {
    const button = component.container.querySelector("#like-button");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(likeMockHandler).toHaveBeenCalledTimes(2);
  });
});
