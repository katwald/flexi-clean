import axios from "axios";

// const signUpURL = "http://localhost:3001/api/users";
// const signInURL = "http://localhost:3001/api/login";
const signUpURL = "/api/users";
const signInURL = "/api/login";

const signup = async (credentials) => {
  const response = await axios.post(signUpURL, credentials);
  return response.data;
};

const signIn = async (credentials) => {
  const response = await axios.post(signInURL, credentials);
  return response.data;
};

export default { signup, signIn };
