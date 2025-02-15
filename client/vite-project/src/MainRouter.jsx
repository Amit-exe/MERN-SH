import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./auth/Signin";
import Signup from "./user/Signup";
import Users from "./user/Users";

function MainRouter() {
  return (
    <div>
      <Routes>
        <Route exact path="/" Component={Home} />

        <Route exact path="/signup" Component={Signup} />
        <Route exact path="/signin" Component={Signin} />
        <Route exact path="/users" Component={Users} />
      </Routes>
    </div>
  );
}

export default MainRouter;
