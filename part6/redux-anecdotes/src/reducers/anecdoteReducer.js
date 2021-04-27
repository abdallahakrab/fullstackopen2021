// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

export const initAnecdotes = (anecdotes) => ({ type: "INIT", data: anecdotes });

export const voteAnecdote = (id) => ({
  type: "VOTE",
  data: id,
});

export const addAnecdote = (content) => ({
  type: "ADD",
  data: content,
});

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "VOTE": {
      // find anecdote by id, update in new object and use map to return new state
      const anecdote = state.find((anecdote) => anecdote.id === action.data);
      const updatedAnecodote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((anecdote) =>
        anecdote.id === action.data ? updatedAnecodote : anecdote
      );
    }

    case "ADD": {
      const newAnecdote = { content: action.data, id: getId(), votes: 0 };
      return [...state, newAnecdote];
    }
    default:
      return state;
  }

  return state;
};

export default reducer;
