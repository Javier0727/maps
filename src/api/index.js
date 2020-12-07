import Axios from "axios";

const apiCall = (method, url) => {
  return Axios(url, {
    method,
  });
};

export default apiCall;
