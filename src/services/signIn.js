import axios from "axios";

const signUpURL = "http://localhost:3001/users";
const signInURL = "http://localhost:3001/login";

const signup = async (credentials) => {
  console.log("credentials", credentials);
  const response = await axios.post(signUpURL, credentials);
  return response.data;
};

const signIn = async (credentials) => {
  console.log("credential", credentials);
  const response = await axios.post(signInURL, credentials);
  return response.data;
};

export default { signup, signIn };
