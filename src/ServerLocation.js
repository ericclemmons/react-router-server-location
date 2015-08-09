import Qs from "qs";
import url from "url";

export default class ServerLocation {
  constructor(req, res) {
    // URL path for both Express & Hapi
    const { pathname } = req._parsedUrl || req.url;

    // Combine GET, POST, headers, & method for React Router & components
    const search = Qs.stringify({
      // GET params for both Express & Hapi
      ...req.query,

      // POST params for both Express & Hapi
      ...(req.body || req.payload),

      _headers: req.headers,
      _method: req.method.toUpperCase(),
    });

    this.path = url.format({ pathname, search });
    this.redirect = (path) => res.redirect(path);
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
