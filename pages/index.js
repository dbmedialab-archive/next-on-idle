import React from "react";
import Page from "../components/Page";

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "From SSR"
    };
  }

  componentDidMount() {
    this.setState({
      title: "From Client"
    });
  }
  render() {
    return <Page title={this.state.title} />;
  }
}
