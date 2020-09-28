// tokenConfig(getState), is attaching the token to the request in the header
import axios from "axios";

import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
} from "../constants/items";
import backendHost from "../constants/api-config";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => {
  return (dispatch) => {
    dispatch(setItemsLoading());
    axios.get(`${backendHost}/api/items`)
      .then((res) =>
        dispatch({
          type: GET_ITEMS,
          payload: res.data,
        })
      )
      .catch((error) => {
        dispatch(returnErrors(error.response.data, error.response.status));
      });
  }
}

export const addItem = (item) => {
  return (dispatch, getState) => {
    axios
      // tokenConfig(getState), is attaching the token to the request in the header
      .post(`${backendHost}/api/items`, item, tokenConfig(getState))
      .then((res) =>
        dispatch({
          type: ADD_ITEM,
          payload: res.data,
        })
      )
      .catch((error) => {
        dispatch(returnErrors(error.response.data, error.response.status));
      });
  };
}

export const deleteItem = (id) => {
  return (dispatch, getState) => {
    // tokenConfig(getState), is attaching the token to the request in the header
    axios
      .delete(`${backendHost}/api/items/${id}`, tokenConfig(getState))
      .then((res) =>
        dispatch({
          type: DELETE_ITEM,
          payload: res.data,
        })
      )
      .catch((error) => {
        dispatch(returnErrors(error.response.data, error.response.status));
      });
  };
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}