import axios from "axios";

const baseUrl = "http://localhost:3001/employees";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const response = await axios.post(baseUrl, content);
  return response.data;
};

const update = async (id) => {
  const response = await axios.put(baseUrl, id);
  return response.data;
};

const remove = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, createNew, update, remove };
