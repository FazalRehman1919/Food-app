import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

/**---POJECT IMPORTING START */

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

//import the store from store to provide the data overall project to every folder
import store from "./store";

//import the store the with the help of provider to show to every file in project
import { Provider } from "react-redux";

/**---POJECT IMPORTING END */
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
