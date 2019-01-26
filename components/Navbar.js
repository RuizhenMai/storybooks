import React from "react";
import Link from "next/link";
import { connect } from "react-redux";

class Navbar extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
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
                <Link prefetch href="/">
                  <a className="nav-link">
                    <i className="fas fa-home" /> Home
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link prefetch href="/about">
                  <a className="nav-link">
                    <i className="fas fa-info-circle" /> About
                  </a>
                </Link>
              </li>
              {!isAuthenticated ? (
                <li className="nav-item">
                  <Link prefetch href="/login">
                    <a className="nav-link">
                      <i className="fas fa-sign-in-alt" /> Login
                    </a>
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link href="/auth/logout">
                    <a className="nav-link">
                      <i className="fas fa-sign-out-alt" /> Logout
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(store => ({
  isAuthenticated: store.auth.isAuthenticated // store.user is the user reducer
}))(Navbar);
