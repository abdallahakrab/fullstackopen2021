import axios from "axios";

const BASEURL = "/api/persons/";
const addPerson = (person) => {
  const request = axios.post(BASEURL, person);
  return request.then((res) => res.data);
};

const removePerson = (contactId) => {
  return axios.delete(`${BASEURL}${contactId}`);
};

const updateNumber = (person) => {
  const request = axios.put(`${BASEURL}${person.id}`, person);
  return request.then((res) => res.data);
};

const apiFunctions = { addPerson, removePerson, updateNumber };

export default apiFunctions;
