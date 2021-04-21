import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("blog extra info not rendered by default", () => {
  const blog = {
    title: "blog title",
    author: "blog author",
    url: "www.random.com",
    likes: 12,
  };
  const mk = jest.fn();

  const component = render(
    <Blog username="randomusername" blog={blog} removeBlog={mk} likeBlog={mk} />
  );

  component.debug();

  expect(component.container).toHaveTextContent("blog title");
  expect(component.container).toHaveTextContent("blog author");
  expect(component.container).not.toHaveTextContent("www.random.com");
  expect(component.container).not.toHaveTextContent("12");
});
