import React from "react";
import ssrLoginUser from "../utils/ssrLoginUser";
class about extends React.Component {
  render() {
    return <h1>Welcome This is about page</h1>;
  }
}

about.getInitialProps = async context => {
  ssrLoginUser(context);

  return {};
};

export default about;
