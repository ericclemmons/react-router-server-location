import ServerLocation from "..";
import test from "blue-tape";

const req = {
  body: {},
  headers: {},
  method: "get",
  query: {},
};

const res = {};

const request = {
  headers: {},
  method: "get",
  payload: {},
  query: {},
  url: {},
};

const reply = {};

test("ServerLocation", function(t) {
  t.test(".constructor", function(t) {
    t.test("requires req or reply", function(t) {
      t.plan(1);

      t.throws(function() {
        new ServerLocation({ foo: "bar" });
      });

      t.end();
    });

    t.test("with ({ req, res }) uses res.redirect", function(t) {
      t.plan(1);

      new ServerLocation({ req, res: { redirect: t.pass } }).replace("success");

      t.end();
    });

    t.test("with ({ req, res }, redirect) uses redirect", function(t) {
      t.plan(1);

      new ServerLocation({ req, res }, t.pass).replace("success");

      t.end();
    });

    t.test("with ({ request, reply }) uses reply.redirect", function(t) {
      t.plan(1);

      new ServerLocation({ request, reply: { redirect: t.pass } }).replace("success");

      t.end();
    });

    t.test("with ({ request, reply }, redirect) uses redirect", function(t) {
      t.plan(1);

      new ServerLocation({ request, reply }, t.pass).replace("success");

      t.end();
    });
  });
});
