import React from "react";
import Page from "../component/Page";
class App extends React.Component {
  // TODO
  // Need to figure out how to inject correct props after html rendering but before
  // next/react mounts the app!

  // getInitialProps is run on serverside, and on client side on client routing
  // static async getInitialProps({ req, query }) {
  //   if (req) {
  //     const that = this;
  //     const data = await fetch("/?api=true")
  //       .then(res => res.json())
  //       .catch(err => console.log("err Json", err));
  //     return { ...data };
  //   }
  //   return query.data.res;
  // }

  constructor(props) {
    super(props);
    console.log("Initial Request", props);
    this.state = this.props;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("nextProps, nextState", nextProps, nextState);
    return true;
  }

  render() {
    return <Page {...this.state} />;
  }
}

export default App;
