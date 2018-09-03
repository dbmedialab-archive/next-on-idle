import React from "react";
import Document, { Main } from "next/document";

// import { NextScript } from "next/document";
import htmlescape from "htmlescape";

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="no">
        <body>
          <Main />
          {/* <NextScript /> */}
          {createNextData(this.props.__NEXT_DATA__)}
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
      <script async src={`/${buildId}/main.js`} />
      {loadStateAndLoadNext({ buildId, page })}
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

function loadStateAndLoadNext({ buildId, page }) {
  const data = `

  function mapPage(page) {
    if (page === "/") {
      return "/index.js";
    }
    return page + ".js"
  }
    function loadScript(url) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
    }

    // TODO: is fetch supported by all (IE11 ?)
    fetch("/?api=true")
      .then(function(res) {
        return res.json();
      })
      .then(function(pageProps) {
        var nextData = window.__NEXT_DATA__;
        nextData.query.data = pageProps;
        window.__NEXT_DATA__ = nextData;
      })
      .then(function() {
        var page = mapPage("${page}")
        loadScript("/_next/${buildId}/page" + page);
      })
      .catch(err => console.log("err Json", err));
    `;
  return <script dangerouslySetInnerHTML={{ __html: data }} />;
}
