// import { createStore, applyMiddleware  } from "redux";
// import CartQuantity from "./Reducer";
// import { composeWithDevTools } from "redux-devtools-extension";
// // import CartQuantity from './Reducer';
// import rootReducers from ".";
// import {thunk} from "redux-thunk";

// // const MyStore=createStore(CartQuantity,composeWithDevTools())
// const MyStore = createStore(
//   rootReducers,
//   composeWithDevTools(),

// );

// export default MyStore;
//////////////////////////////////////////////////////////////////////////////////
// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension"; // Import dev tools
// import rootReducers from "./Reducer"; // Make sure the correct root reducer path is used
// import {thunk} from "redux-thunk"; // Import thunk properly as default

// // Create the store using rootReducer, thunk middleware, and dev tools
// const MyStore = createStore(
//   rootReducers,
//   composeWithDevTools(applyMiddleware(thunk)) // Use devtools with middleware
// );

// export default MyStore;

import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk'; // Import thunk middleware
import { thunk } from "redux-thunk";

import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './index'; // Adjust the path as necessary

const MyStore = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk)) // Apply thunk middleware
);

export default MyStore;