import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const AppLayout = ({ mode, toggleMode, model }) => {

  return (
    <>
      <Header mode={mode} toggleMode={toggleMode} />
      <Outlet model={model} />
    </>
  );
};

export default AppLayout;
