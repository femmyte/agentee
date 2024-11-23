import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "/api";

axios.defaults.params = {
  timestamp: new Date().getTime(),
};

axios.defaults.headers = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // if it's an unexpected error
  if (!expectedError) {
    toast("Something failed! Try again.");
  }

  return Promise.reject(error); // the error is sent to the catch block
});

const apiClient = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default apiClient;
