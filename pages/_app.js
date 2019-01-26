import React from "react";
import App, { Container } from "next/app";
import Layout from "../components/Layout";
import withRedux from "next-redux-wrapper";
import makeStore from "../store";
import { Provider } from "react-redux";
import Head from "next/head";
import "../style.scss";

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Head>
          <title>StoryBook</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />

          {/* Font Awesome */}
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
            integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
            crossOrigin="anonymous"
          />
        </Head>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {/* <script
            src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"
          /> */}
          <script src="/static/jquery.slim.min.js" />
          {/* <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
            integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
            crossorigin="anonymous"
          /> */}
          <script src="/static/popper.min.js" />
          {/* <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
            integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
            crossorigin="anonymous"
          /> */}
          <script src="/static/bootstrap.min.js" />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
