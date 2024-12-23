import React from "react";
import { Link } from "react-router-dom"; // 使用 Link 组件进行路由导航

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul style={{ display: "flex", listStyleType: "none" }}>
        <li style={{ margin: "0 10px" }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ margin: "0 10px" }}>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
