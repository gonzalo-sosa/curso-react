import React from "react";
import SideBar from "./sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  //const match = useMatch();
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <SideBar />
      <Outlet /> {/* Renderiza tanto <Users /> como <Posts /> */}
    </div>
  );
};

export default Dashboard;
