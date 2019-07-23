import axios from "axios";
import { API_URL, TODOS, SIGNUP, PROFILE, LOGIN } from "../Constants";

export default class api_services {
  signupUser = values => {
    return axios.post(`${API_URL}${SIGNUP}`, values);
  };
  getItems = token => {
    return axios.get(`${API_URL}${TODOS}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  getProfile = token => {
    return axios.get(`${API_URL}${PROFILE}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  postLogin = values => {
    return axios.post(`${API_URL}${LOGIN}`, values);
  };

  deleteTodo = (id, token) => {
    return axios.delete(`${API_URL}${TODOS}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  addTask = (token, obj) => {
    return axios.post(`${API_URL}${TODOS}`, obj, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  searchTask = (mystr, token) => {
    return axios.get(mystr, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };
}
