import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "./index.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
// ReactDOM.render(
//     <BrowserRouter>
//         <App/>
//     </BrowserRouter>
//     , document.querySelector('#root'));

ReactDOM.render(<App />, document.querySelector("#root"));
