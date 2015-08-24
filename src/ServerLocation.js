import Qs from "qs";
import url from "url";

export default class ServerLocation {
  constructor({ req, request, reply, res }, redirect) {
    if (req) {
      // Express
      this.path = url.format({
        pathname: req.path,
        search: Qs.stringify({
          ...req.query,
          ...req.body,
          _headers: req.headers,
          _method: req.method.toUpperCase(),
        }),
      });

      this.redirect = redirect || res.redirect.bind(res);
    } else if (request) {
      // Hapi
      this.path = url.format({
        pathname: request.url.pathname,
        search: Qs.stringify({
          ...request.query,
          ...request.payload,
          _headers: request.headers,
          _method: request.method.toUpperCase(),
        }),
      });

      this.redirect = redirect || reply.redirect.bind(reply);
    } else {
      throw new Error("ServerLocation.constructor requires `req` or `request` key");
    }
  }

  get needsDOM() {
    return false;
  }

  getCurrentPath() {
    return this.path;
  }

  pop() {
    throw new Error("<ServerLocation> does not support pop()");
  }

  push(path) {
    this.redirect(path);
  }

  replace(path) {
    this.redirect(path);
  }

  toString() {
    return `<ServerLocation path="${this.getCurrentPath()}">`;
  }
}
