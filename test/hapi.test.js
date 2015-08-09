import request from "supertest-as-promised";
import test from "blue-tape";
import url from "url";

import server from "./support/hapi";

test("Hapi", function(t) {
  t.test("/found", function(t) {
    return server.injectThen({
      method: "POST",
      payload: { body: "body" },
      url: "/found?query=query",
    }).then(({ payload, statusCode }) => {
      t.equal(statusCode, 200, "HTTP Status should be 200");

      const { query } = JSON.parse(payload.replace("<pre>", "").replace("</pre>", ""));

      t.ok(query._headers, `Route's "query._headers" should be set`);
      t.equal(query._method, "POST", `Route's "query._method" should be "POST"`);
      t.equal(query.body, "body", `Route's "query.body" should be "body"`);
      t.equal(query.query, "query", `Route's "query.query" should be "query"`);
    });
  });

  t.test("/fake", function(t) {
    return server.injectThen({
      method: "POST",
      payload: { body: "body "},
      url: "/fake?query",
    }).then(({ headers: { location }, statusCode }) => {
      t.equal(statusCode, 302, "HTTP Status should be 302");
      t.ok(location, "Location header set");

      const { pathname } = url.parse(location);

      t.equal(pathname, "/found");
    });
  });
});
