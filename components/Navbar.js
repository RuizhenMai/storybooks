import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import MobileNavlink from "./MobileNavlink";
import DesktopNavLink from "./DesktopNavLink";

class Navbar extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">BRAND</a>
          </Link>
          <button
            className="navbar-toggler border-danger"
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
                <MobileNavlink href="/" value="Home" className="fas fa-home" />
                <DesktopNavLink href="/" value="Home" className="fas fa-home" />
              </li>
              <li className="nav-item">
                <MobileNavlink
                  href="/about"
                  value="About"
                  className="fas fa-info-circle"
                />
                <DesktopNavLink
                  href="/about"
                  value="About"
                  className="fas fa-info-circle"
                />
              </li>
              {!isAuthenticated ? (
                <li className="nav-item">
                  <MobileNavlink
                    href="/login"
                    value="Login"
                    className="fas fa-sign-in-alt"
                  />
                  <DesktopNavLink
                    href="/login"
                    value="Login"
                    className="fas fa-sign-in-alt"
                  />
                </li>
              ) : (
                <li className="nav-item">
                  <MobileNavlink
                    href="/auth/logout"
                    value="Logout"
                    className="fas fa-sign-out-alt"
                  />
                  <DesktopNavLink
                    href="/auth/logout"
                    value="Logout"
                    className="fas fa-sign-out-alt"
                  />
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
