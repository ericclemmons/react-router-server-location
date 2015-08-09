# React Router ServerLocation ![https://img.shields.io/npm/v/react-router-server-location.svg](https://img.shields.io/npm/v/react-router-server-location.svg?style=flat-square)

> A [React Router][1] Location for universal apps.

[![](https://img.shields.io/github/issues-raw/ericclemmons/react-router-server-location.svg?style=flat-square)](https://github.com/ericclemmons/react-router-server-location/issues)
[![](https://img.shields.io/travis/ericclemmons/react-router-server-location/master.svg?style=flat-square)](https://travis-ci.org/ericclemmons/react-router-server-location)
[![](https://img.shields.io/david/ericclemmons/react-router-server-location.svg?style=flat-square)](https://david-dm.org/ericclemmons/react-router-server-location#info=dependencies)

- - -

### What does `ServerLocation` Do?

- Normalizes & exposes server-side request data so that React Router
  (and your components) can respond to all HTTP methods (e.g. `GET`, `POST`).

- Redirects server-side requests when the router transitions to another URL.

- Correctly supports complex, deep query strings (e.g. `?foo[bar][baz][bing]=...`)

- Allows the use of `<Redirect>` routes on the server as well as the client.

- Works with both [Express][3] & [Hapi][4].


### Why `ServiceLocation`?

By default, [React Router][1] uses [StaticLocation](http://rackt.github.io/react-router/#StaticLocation)
on the server **which does not support transitions**, and the `onAbort` handler
is not a reliable solution.

Plus, it allows your app components to take advantage of:

- Redirect server-side requests via `router.transitionTo`.
- The HTTP method via `query._method` (e.g. `GET`, `POST`).
- `POST` params are available on the `query` like normal `GET` query params.
- Access to HTTP headers via `query._headers`
  (which is useful for pivoting off of `X-Requested-With`)


### Installation

```shell
$ npm install --save react-router-server-location
```

### Usage

First, include `ServerLocation` as a dependency:

```js
import ServerLocation from "react-router-server-location";
```

Next, create an instance using your server's request & response objects:

```js
// Express
const location = new ServerLocation(req, res);

// or Hapi
const location = new ServerLocation(request, reply);
```

Finally, use [React Router][1] as normal:

```js
Router.create({ location, routes }).run((Root) => {
  React.renderToString(<Root />);
});
```


## Authors

- [Eric Clemmons](mailto:eric@smarterspam.com>) ([@ericclemmons][twitter])


## [License][license]


## Collaboration

If you have questions or issues, please [open an issue][issue]!


[1]: http://rackt.github.io/react-router/
[2]: https://github.com/ericclemmons/react-resolver
[3]: http://expressjs.com/
[4]: http://hapijs.com/
[issue]: https://github.com/ericclemmons/react-router-server-location/issues/new
[license]: https://github.com/ericclemmons/react-router-server-location/blob/master/LICENSE
[twitter]: https://twitter.com/ericclemmons/
