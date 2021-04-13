import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const add = async (data) => {
  const config = {
    headers: { authorization: token },
  };
  const response = await axios.post(baseUrl, data, config);
  return response.data;
};

export default { setToken, getAll, add };
