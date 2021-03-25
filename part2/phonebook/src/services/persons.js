import axios from "axios";

const BASEURL = "http://localhost:3001/persons/";
const addPerson = (person) => {
  const request = axios.post(BASEURL, person);
  return request.then((res) => res.data);
};

export default {
  addPerson,
};
