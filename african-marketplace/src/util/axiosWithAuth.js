import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  console.log("token", token);

  return axios.create({
    //baseURL: "http://localhost:5000/api",
    baseURL: "https://marketplace-project-isaiah.herokuapp.com/api",
    headers: {
      Authorization: token,
    },
  });
};
