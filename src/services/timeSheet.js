import axios from "axios";

const baseUrl = "http://localhost:3001/api/time-sheet";
// const baseUrl = "/api/bookings";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const createNew = async (content) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, content, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  return await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, createNew, update, remove, setToken };
