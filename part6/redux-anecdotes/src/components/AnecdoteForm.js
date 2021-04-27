import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { postAnecdote } from "../services/anecdotes";

function AnecdoteForm() {
  const dispatch = useDispatch();
  const add = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    const responseContent = await postAnecdote(content);
    dispatch(addAnecdote(responseContent));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
