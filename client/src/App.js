import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import TopPage from "./pages/TopPage";

const App = () => {
  // sockets test

  return <Route component={TopPage} />;
};

export default App;
