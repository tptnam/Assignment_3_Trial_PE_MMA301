import axios from "axios";

const mock = axios.create({
  baseURL: "https://66798edb18a459f639507619.mockapi.io/api/v1/",
  timeout: 100000000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { mock };
