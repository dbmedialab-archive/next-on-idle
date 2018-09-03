import React from "react";
import Page from "../component/Page";
class App extends React.Component {
  // TODO
  // Need to figure out how to inject correct props after html rendering but before
  // next/react mounts the app!

  constructor(props) {
    super(props);
  }

  render() {
    console.log("render props :", this.props);
    console.log("render props url.:", this.props.url);
    console.log("render props url.query:", this.props.url.query);
    console.log("render props url.query.data:", this.props.url.query.data);
    return <Page {...this.props.url.query.data} />;
  }
}

export default App;
