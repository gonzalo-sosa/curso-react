import React from "react";
import { Link } from "react-router-dom";
import Products from "./products";
import Posts from "./posts";
import Dashboard from "./admin/dashboard";

const NavBar = () => {
  return (
    <ul>
      <li>
        <Link to="/" end>Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/admin">Dashboard</Link>
      </li>
      <li>
        <Link to="/movies">Movies</Link>
      </li>
    </ul>
  );
};

export default NavBar;
