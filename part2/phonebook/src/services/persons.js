import axios from "axios";

const BASEURL = "http://localhost:3001/persons/";
const addPerson = (person) => {
  const request = axios.post(BASEURL, person);
  return request.then((res) => res.data);
};

const removePerson = (contactId) => {
  const request = axios.delete(`${BASEURL}${contactId}`);
  return request.then((res) => res.data);
};

const updateNumber = (person) => {
  const request = axios.put(`${BASEURL}${person.id}`, person);
  return request.then((res) => res.data);
};

const apiFunctions = { addPerson, removePerson, updateNumber };

export default apiFunctions;
