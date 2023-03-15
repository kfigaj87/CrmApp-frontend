import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../views/Home";
import Login from "../views/Login";
import AddCustomer from "../views/AddCustomer";
import SingleCustomer from "../views/SingleCustomer";

const AppRoutes = (props) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login user={props.user} setUser={props.setUser} />}
      />

      <Route path="/crm/customers" element={<Home />} />

      <Route path="/crm/addCustomer" element={<AddCustomer />} />
      <Route path="/crm/customer/:id" element={<SingleCustomer />} />
    </Routes>
  );
};

export default AppRoutes;
