import backendHost from "../constants/api-config";
import { returnErrors } from "./errorActions";
import axios from "axios";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../constants/auth";

// Check token & load user
export const loadUser = () => {
  return (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    fetch(`${backendHost}/api/auth/user`, tokenConfig(getState))
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: USER_LOADED,
          payload: data,
        })
      )
      .catch((error) => {
        // console.error("Error:", error);
        dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
          type: AUTH_ERROR,
        });
      });
  };
};

// Register User
// export const register = ({ name, username, email, password }) => {
//   return (dispatch) => {
//     // Headers
//     const config = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     }

//     // Request body
//     const body = JSON.stringify({ name, username, email, password });

//     fetch(`${backendHost}/api/auth`, body, config)
//       .then((res) => res.json())
//       .then((data) => {
//         dispatch({
//           type: REGISTER_SUCCESS,
//           payload: data,
//         });
//       })
//       .catch((error) => {
//         console.log(error.response);
//         console.log(error.res)
//         console.log(error)
//         dispatch(
//           // fix this, not hitting the backend
//           returnErrors(
//             error.data,
//             error.status,
//             "REGISTER_FAIL"
//           )
//         );
//         dispatch({
//           type: REGISTER_FAIL,
//         });
//       });
//   }
// }
export const register = ({ name, username, email, password }) => (
  dispatch
) => {
  console.log("name: ", name)
  console.log("username: ", username)
  console.log("email: ", email)
  console.log("password: ", password)
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ name, username, email, password });

  axios
    .post(`${backendHost}/api/users/register`, body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
}