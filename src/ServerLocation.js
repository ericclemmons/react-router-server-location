import Qs from "qs";
import url from "url";

export default class ServerLocation {
  constructor(req, res) {
    const pathname = req.url;

    // Combine GET, POST, headers, & method for React Router & components
    const search = Qs.stringify({
      ...req.query,
      ...req.body,
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
