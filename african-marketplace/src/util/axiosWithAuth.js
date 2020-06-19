import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  console.log("token", token);

  return axios.create({
    baseURL:
      // "https://cors-anywhere.marketplace-project-isaiah.herokuapp.com/api",
      "https://marketplace-project-isaiah.herokuapp.com/api",
    headers: {
      Authorization: token,
    },
  });
};
