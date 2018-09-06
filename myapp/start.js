"use strict";

const express = require("express");
const xsenv = require("@sap/xsenv");
const passport = require("passport");
let JWTStrategy = require("@sap/xssec").JWTStrategy;
const logging = require("@sap/logging");
let options = {
  appContext: logging.createAppContext()
};

const app = express();

let services = xsenv.getServices({ hana: "jeff-hdi-container", uaa: "myuaa" });

app.use(logging.middleware(options));

passport.use(new JWTStrategy(services.uaa));

app.use(passport.initialize());
app.use(passport.authenticate("JWT", { session: false }));

// app.get("/", (req, res, next) => {
//   res.send(
//     `Application user: ${req.user.id}<br> HANA user: ${services.hana.user}`
//   );
// });

// app.get("/", (req, res, next) => {
//   let isAuthorized = req.authInfo.checkScope("openid");
//   if (isAuthorized) {
//     res.send(`Application user: ${req.user.id}`);
//   } else {
//     res.status(403).send("Forbidden");
//   }
// });

app.get("/", (req, res, next) => {
  let logger = req.loggingContext.getLogger("/Application");
  let tracer = req.loggingContext.getTracer("");

  let isAuthorized = req.authInfo.checkScope("openid");
  if (isAuthorized) {
    tracer.debug(`Authorization success. User: ${req.user.id}, Path: '/'.`);
    res.send(`Application user: ${req.user.id}`);
  } else {
    logger.info(`Authorization failed. User: ${req.user.id}, Path: '/'.`);
    res.status(403).send("Forbidden");
  }
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`myapp listening on port ${port}`));
