import Hapi from "hapi";
import React from "react";
import Router from "react-router";

import routes from "./routes";
import ServerLocation from "../../";

const server = new Hapi.Server();

server.connection({
  host: "localhost",
  port: 3000,
});

server.register(require("inject-then"), function(error) {
  if (error) {
    throw error;
  }
});

server.route({
  method: ["GET", "POST"],
  path: "/{path*}",
  handler: function(request, reply) {
    Router.create({
      location: new ServerLocation(request, reply),
      routes: routes,
    }).run(function(Handler, state) {
      var element = React.createElement(Handler, state);
      var markup = React.renderToStaticMarkup(element);

      reply(markup);
    });
  }
})

export default server;
