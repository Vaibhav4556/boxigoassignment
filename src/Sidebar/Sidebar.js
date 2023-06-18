import React from "react";
import { RiTruckFill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import { RiLogoutCircleFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

import "./Sidebar.css";

const SideBar = () => {
  const location = useLocation(); // Get the current location

  // Helper function to check if the given path is the active path
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <ul className="navlist">
      <li>
        <Link className={`menu-item ${isActive("/") ? "active" : ""}`} to="/">
          <div className="sidebaricon">
            <RiTruckFill size={25} /> MY MOVES
          </div>
        </Link>
      </li>
      <li>
        <Link
          className={`menu-item ${isActive("/profile") ? "active" : ""}`}
          to="/profile"
        >
          <div className="sidebaricon">
            <BsFillPersonFill size={25} /> MY PROFILE
          </div>
        </Link>
      </li>
      <li>
        <Link className={`menu-item ${isActive("#") ? "active" : ""}`} to="#">
          <div className="sidebaricon">
            <GiNotebook size={25} /> GET QUOTES
          </div>
        </Link>
      </li>
      <li>
        <Link className={`menu-item ${isActive("#") ? "active" : ""}`} to="#">
          <div className="sidebaricon">
            <RiLogoutCircleFill size={25} /> LOGOUT
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default SideBar;
