import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setMessage, removeMessage } from "../reducers/messageReducer";
function AnecdoteList() {
  const anecdotes = useSelector(({ anecdote }) => anecdote);
  const dispatch = useDispatch();
  const vote = (id) => {
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
    console.log(anecdote);
    dispatch(voteAnecdote(id));
    dispatch(setMessage(`you voted ${anecdote.content}`));
    setTimeout(() => {
      dispatch(setMessage(""));
    }, 5000);
  };
  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AnecdoteList;
