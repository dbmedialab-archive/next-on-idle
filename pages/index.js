import React from "react";

class App extends React.Component {
  static getInitialProps({
    query: {
      data: { title }
    }
  }) {
    return { title };
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default Page;
