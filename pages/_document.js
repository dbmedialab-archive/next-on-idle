import React from "react";
import Document, { Main } from "next/document";
// import { NextScript } from "next/document";
import htmlescape from "htmlescape";

export default class MyDocument extends Document {
  constructor(props) {
    super(props);
    const { __NEXT_DATA__ } = props;
    //console.log(__NEXT_DATA__);
  }

  render() {
    return (
      <html lang="no">
        <body>
          <Main />
          {/* <NextScript /> */}
          {createNextData(this.props.__NEXT_DATA__)}
          {renderNextScript(this.props.__NEXT_DATA__)}
          {renderBuiltInNextScript(this.props.__NEXT_DATA__)}
        </body>
      </html>
    );
  }
}

function mapPage(page) {
  if (page === "/") {
    return "/index.js";
  }
  return `${page}.js`;
}

function renderNextScript({ buildId, page }) {
  return (
    <script
      async
      id={`__NEXT_PAGE__${page}`}
      src={`/_next/${buildId}/page${mapPage(page)}`}
    />
  );
}

function renderBuiltInNextScript({ buildId, page }) {
  return (
    <React.Fragment>
      {renderNextScript({ buildId, page: "/_app" })}
      {renderNextScript({ buildId, page: "/_error" })}
      <script
        async
        src={`/_next/static/commons/main-5af2b0d64987b3ade558.js`}
      />
    </React.Fragment>
  );
}

function createNextData(nextData) {
  if (!nextData.chunks) {
    nextData.chunks = [];
  }
  if (nextData.props) {
    nextData.props.pageProps = null;
  }

  const data = `
        __NEXT_DATA__ = ${htmlescape(nextData)}
        module={}
        __NEXT_LOADED_PAGES__ = []
        __NEXT_LOADED_CHUNKS__ = []

        __NEXT_REGISTER_PAGE = function (route, fn) {
          __NEXT_LOADED_PAGES__.push({ route: route, fn: fn })
        }

        __NEXT_REGISTER_CHUNK = function (chunkName, fn) {
          __NEXT_LOADED_CHUNKS__.push({ chunkName: chunkName, fn: fn })
        }

        false
    `;
  // WTF? I think the false 2 lines above is and bugs but.... it's there from next..

  return <script dangerouslySetInnerHTML={{ __html: data }} />;
}

{
  /* <script async="" id="__NEXT_PAGE__/" src="/_next/dd804c98-e228-4ad4-839b-d995624b1487/page/index.js"></script>
<script async="" id="__NEXT_PAGE__/_app" src="/_next/dd804c98-e228-4ad4-839b-d995624b1487/page/_app.js"></script>
<script async="" id="__NEXT_PAGE__/_error" src="/_next/dd804c98-e228-4ad4-839b-d995624b1487/page/_error.js"></script>
<script src="/_next/static/commons/main-5af2b0d64987b3ade558.js" async=""></script> */
}
