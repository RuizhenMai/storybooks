import Navbar from "./Navbar";
import "../style.scss";
import React from "react";

const Layout = props => (
  <React.Fragment>
    <Navbar />
    <main>
      <div className="container">{props.children}</div>
    </main>
  </React.Fragment>
);

export default Layout;
