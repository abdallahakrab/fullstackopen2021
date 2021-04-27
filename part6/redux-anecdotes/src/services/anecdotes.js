import axios from "axios";

const BASEURL = "http://localhost:3001/anecdotes";
export const initializeAnecdotes = async () => {
  const response = await axios.get(BASEURL);
  return response.data;
};

export const postAnecdote = async (content) => {
  const data = {
    content,
    votes: 0,
  };
  const response = await axios.post(BASEURL, data);
  return response.data;
};
