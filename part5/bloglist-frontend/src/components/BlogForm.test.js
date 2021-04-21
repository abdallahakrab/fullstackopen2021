import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("<Blog Form>", () => {
  const newBlog = {
    title: "Random Title",
    author: "Random Author",
    url: "www.example.com",
  };
  const submitFormHandler = jest.fn();
  test("submit form passes right params to event handler", () => {
    const component = render(<BlogForm createBlog={submitFormHandler} />);

    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");
    const submitButton = component.container.querySelector("#add-button");
    fireEvent.change(title, { target: { value: newBlog.title } });
    fireEvent.change(author, { target: { value: newBlog.author } });
    fireEvent.change(url, { target: { value: newBlog.url } });
    fireEvent.click(submitButton);
    expect(submitFormHandler.mock.calls[0][0]).toEqual(newBlog);
    // expect(submitFormHandler.call)
  });
});
