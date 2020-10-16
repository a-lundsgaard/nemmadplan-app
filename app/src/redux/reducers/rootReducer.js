import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import undoable from "easy-redux-undo";
import homeReducer from "../components/home/homeSlice";
import counterReducer from "../components/counter/counterSlice";
import complexReducer from "../components/complex/complexSlice";

import loggedReducer from '../components/test/loggedReducer';

import counterReducer2 from '../components/test/counterReducer';

import searchInput from '../components/test/searchInput';




const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    home: homeReducer,
    signin: counterReducer2,
    searchInput: searchInput,
    undoable: undoable(
      combineReducers({
        counter: counterReducer,
        complex: complexReducer
      })
    )
  });

export default createRootReducer;
