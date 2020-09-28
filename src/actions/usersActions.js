import backendHost from "../constants/api-config";
import { returnErrors } from "./errorActions";
import axios from "axios";

import {
  GET_ALL_USERS_LOADING,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
} from "../constants/users";

// Get All Users
export const getAllUsers = () => {
  return (dispatch, getState) => {
    console.log("in users actions")
    console.log(tokenConfig(getState));
    // User loading
    dispatch({ type: GET_ALL_USERS_LOADING });

    axios
      .get(`${backendHost}/api/users`, tokenConfig(getState))
      .then((res) =>
      // console.log(res)
        dispatch({
          type: GET_ALL_USERS_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) => {
        console.log(error)
        dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
          type: GET_ALL_USERS_FAIL,
        });
      });
  };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().authReducer.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
    // config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
}