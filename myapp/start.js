"use strict";

const express = require("express");
const xsenv = require("@sap/xsenv");
const passport = require("passport");
let JWTStrategy = require("@sap/xssec").JWTStrategy;
const logging = require("@sap/logging");
let appContext = logging.createAppContext();

const app = express();

console.log("================");
console.log(appContext);

app.use(logging.middleware(appContext));

passport.use(new JWTStrategy(xsenv.getServices({ uaa: { tag: "xsuaa" } }).uaa));

app.use(passport.initialize());
app.use(passport.authenticate("JWT", { session: false }));

app.get("/", (req, res, next) => {
  let logger = req.loggingContext.getLogger("/Application");
  let tracer = req.loggingContext.getTracer();

  let isAuthorized = req.authInfo.checkScope("example.scope");
  if (isAuthorized) {
    tracer.debug(`Authorization success. User: ${req.user.ide}, Path: '/'.`);
    res.send(`Application user: ${req.user.id}`);
  } else {
    logger.ifo(`Authorization failed. User: ${req.user.id}, Path: '/'.`);
    res.status(403).send("Forbidden");
  }
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`myapp listening on port ${port}`));
