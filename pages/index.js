import React from "react";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { connect } from "react-redux";
import { loginUser } from "../store/actions/authActions";
import { setReferer } from "../store/actions/urlAction";
const IS_SERVER = !process.browser;
import ssrLoginUser from "../utils/ssrLoginUser";
// const apiUrl = process.browser
// ? `https://${window.location.host}/api/login.js`
// : `https://${req.headers.host}/api/login.js`

class index extends React.Component {
  // handleGoogleOAuth = async res => {
  //   console.log({ res });
  //   console.log(res.accessToken);
  //   const backendres = await axios.post("/auth/google", {
  //     access_token: res.accessToken
  //   });
  //   console.log({ backendres });
  // };

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">
          Welcome {this.  props.user ? this.props.user.lastName : null}
        </h1>
        <small> Storybooks 1.0.0</small>
        <p className="lead">
          Post stories from the best and worst of your life and choose for them
          to be readf by the world or completely private as your own personal
          diary
        </p>
        {/* <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Gooogle Login"
          onSuccess={this.handleGoogleOAuth}
          onFailure={this.handleGoogleOAuth}
        /> */}
        <Link href="/auth/google">
          <a className="btn btn-danger rounded-0">
            <i className="fab fa-google" /> Login with Google
          </a>
        </Link>
      </div>
    );
  }
}

index.getInitialProps = async context => {
  ssrLoginUser(context);
  return {};
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const mapStateToProps = (store) => ({
//   contacts: store.contacts_root.contacts
// });

// const mapDispatchToProps = dispatch => ({
//   getContacts: () => dispatch({ type: GET_CONTACTS })
// });
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export default connect(
  store => ({
    isAuthenticated: store.auth.isAuthenticated,
    user: store.auth.user
  }),
  { loginUser }
)(index);
