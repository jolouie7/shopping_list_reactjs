// Assuming you have more then one reducer
import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
// import counterReducer from "./CounterReducer";

export default combineReducers({
  itemReducer,
});
