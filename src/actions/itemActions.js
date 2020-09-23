import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
} from "../constants/items";

export const getItems = () => {
  return (dispatch) => {
    dispatch(setItemsLoading());
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: GET_ITEMS,
          payload: data,
        })
      )
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

export const addItem = (item) => {
  return (dispatch) => {
    fetch("http://localhost:5000/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: ADD_ITEM,
          payload: data,
        })
      )
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

export const deleteItem = (id) => {
  return (dispatch) => {
    fetch(`http://localhost:5000/api/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: DELETE_ITEM,
          payload: data,
        })
      )
      .catch((error) => {
        console.error("Error:", error);
      });
  };
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}