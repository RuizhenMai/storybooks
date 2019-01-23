import React from "react";
import Link from "next/link";

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-1">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">BRAND</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link">
                    <i className="fas fa-home" /> Home
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about">
                  <a className="nav-link">
                    <i className="fas fa-info-circle" /> About
                  </a>
                </Link>
              </li>
              {this.props.logged ? (
                <li className="nav-item">
                  <Link href="/auth/logout">
                    <a className="nav-link">
                      <i className="fas fa-sign-out-alt" /> Logout
                    </a>
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
