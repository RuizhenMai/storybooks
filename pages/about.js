import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

const about = () => {
  return (
    <Layout>
      <h1>Welcome This is about page</h1>
    </Layout>
  );
};

about.getInitialProps = async context => {
  //   console.log(context);
  return {};
};

export default about;
