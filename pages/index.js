import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";

const index = props => {
  return (
    <Layout logged={props.logged}>
      <h1>Welcome</h1>
      <p>Welcome to Storybooks 1.0.0</p>
      <p>
        Post stories from the best and worst of your life and choose for them to
        be readf by the world or completely private as your own personal diary
      </p>
      {/* <Link as={`/`} href={`/?`}>
        <a />
      </Link> real magic*/}
      <Link href="auth/google">
        <a className="btn btn-danger rounded-0">
          <i className="fab fa-google" /> Login With Google
        </a>
      </Link>
    </Layout>
  );
};

index.getInitialProps = async context => {
  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  // console.log(context);
  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  // const { req } = context;
  // if (req) {
  //   const {
  //     query: { user }
  //   } = context;
  //   if (user) return { logged: true };
  // }
  // return { logged: false };
  // const response = await axios.get("/auth/verify").catch(console.log);
  // console.log(response);

  // console.log(response.data);
  // if (response.data.user) return { logged: true };
  return { logged: false };
};

export default index;
