import { json } from "body-parser";
import express from "express";
import React from "react";
import Router from "react-router";

import routes from "./routes";
import ServerLocation from "../../";

export default express()
  .use(json())
  .all("*", function(req, res) {
  Router.create({
    location: new ServerLocation(req, res),
    routes: routes,
  }).run(function(Handler, state) {
    var element = React.createElement(Handler, state);
    var markup = React.renderToStaticMarkup(element);

    res.send(markup);
  });
});
