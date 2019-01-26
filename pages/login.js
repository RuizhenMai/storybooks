import React from "react";
import Link from "next/link";
import Router from "next/router";
import ssrLoginUser from "../utils/ssrLoginUser";
import { connect } from "react-redux";
const IS_SERVER = !process.browser;

class login extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="display-4 card-title">Login</h1>
              <form action="#">
                <div className="form-group">
                  <label htmlFor="email">
                    <p className="lead mb-0">Email</p>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Password">
                    <p className="lead mb-0">Password</p>
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="Password"
                    name="Password"
                    placeholder="Password"
                  />
                </div>
                <input
                  type="submit"
                  value="LOGIN"
                  className="btn btn-danger btn-block rounded-0"
                />
                <hr />
                <a className="mb-3 btn btn-block btn-facebook rounded-0 text-white lead">
                  <i className="fab fa-facebook-f" /> Connect with Facebook
                </a>
                <Link href="/auth/google">
                  <a className="btn btn-block btn-light rounded-0">
                    {/* <i className="fab fa-google" style={{ color: "red" }} /> */}
                    <img
                      src="https://img.icons8.com/color/48/000000/google-logo.png"
                      style={{ width: "19px" }}
                    />{" "}
                    Connect With Google
                  </a>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

login.getInitialProps = async context => {
  ssrLoginUser(context);
  // if (IS_SERVER) console.log(context.req.headers.referer);
  if (context.store.getState().auth.isAuthenticated) {
    if (!IS_SERVER) {
      Router.back();
    }
    context.res.redirect(context.req.headers.referer || "/");
  }

  return {};
};

export default connect(store => ({
  isAuthenticated: store.auth.isAuthenticated,
  referer: store.url.referer
}))(login);
