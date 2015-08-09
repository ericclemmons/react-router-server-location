import request from "supertest-as-promised";
import test from "blue-tape";
import url from "url";

import app from "./support/express";

test("Express", function(t) {
  t.test("/found", function(t) {
    return request(app)
      .post("/found")
      .send({ body: "body" })
      .expect(200)
      .then(({ text }) => {
        const { query } = JSON.parse(text.replace("<pre>", "").replace("</pre>", ""));

        t.ok(query._headers, `Route's "query._headers" should be set`);
        t.equal(query._method, "POST", `Route's "query._method" should be "POST"`);
        t.equal(query.body, "body", `Route's "query.body" should be "body"`);
      })
    ;
  });

  t.test("/fake", function(t) {
    return request(app)
      .post("/fake")
      .send({ body: "body" })
      .expect(302)
      .then(({ headers: { location } }) => {
        t.ok(location, "Location header set");

        const { pathname } = url.parse(location);

        t.equal(pathname, "/found");
      })
    ;
  });
});
