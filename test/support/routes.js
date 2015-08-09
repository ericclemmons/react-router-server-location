import React from "react";
import { Redirect, Route } from "react-router";

class Found extends React.Component {
  render() {
    return (
      <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(this.props) }} />
    );
  }
}

export default (
  <Route>
    <Route name="found" path="/found" handler={Found} />
    <Redirect to="found" />
  </Route>
);
