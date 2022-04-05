import React from "react";
import Home from "./Home/Home";
import Nav from "./Nav/Nav";
import Auth from "./Auth/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Nav></Nav>
      <Routes>
        <Route path="/posts" exact element={<Home />}></Route>
        <Route path="/posts/search" exact element={<Home />}></Route>
        <Route path="/auth" exact element={<Auth />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
