import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  console.log("token", token);

  return axios.create({
    baseURL: "https://marketplace-project-isaiah.herokuapp.com/api",
    headers: {
      Authorization: token,
    },
  });
};
