import axios from "axios";


const address = (token) => {
  return axios.create({
    baseURL: "http://84.201.129.203:8888/api/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const authAPI = {
  signUp(userInfo) {
    return address()
      .post(`/auth/sign_up`, userInfo)
      .then((reponse) => response);
  },
  signIn(userData) {
    return address()
      .post(`/auth/sign_in`, userData)
      .then((response) => response);
  },
};

export const casesAPI = {
  addNewUnauthorizedReport(newReport) {
    return address()
      .post(`/public/report`, newReport)
      .then((response) => response);
  },
  addNewAuthorizedReport(token, newReport) {
    return address(token)
      .post(`/public/cases`, newReport)
      .then((response) => response);
  },
  getReports(token) {
    return address(token)
      .get(`/cases`)
      .then((response) => response);
  },
}