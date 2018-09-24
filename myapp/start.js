"use strict";

require("dotenv").config();

const hdbext = require("@sap/hdbext"),
  express = require("express"),
  xsenv = require("@sap/xsenv"),
  passport = require("passport"),
  logging = require("@sap/logging");

let JWTStrategy = require("@sap/xssec").JWTStrategy,
  options = {
    appContext: logging.createAppContext()
  };

const app = express();
const hostname = "ussxsadevdb.mykonicaminolta.com",
  tinyContinents =
    '896257565B6F47D5878ADEDA920B48DF."jefftinyworld.tinydb::tinyf.world"',
  tinyCountries =
    '896257565B6F47D5878ADEDA920B48DF."jefftinyworld.tinydb::tinyf.country"';

let services = xsenv.getServices({ hana: "jeff-hdi-container", uaa: "myuaa" }),
  hanaConfig = {
    host: hostname,
    port: 39015,
    databaseName: "HXE",
    user: process.env.DB_USER,
    password: process.env.USER_SECRET
  },
  hanaConfig2 = xsenv.cfServiceCredentials({ name: "hdi_tinydb" });

const connPromise = config =>
  new Promise((resolve, reject) =>
    hdbext.createConnection(
      config,
      (err, client) => (err ? reject(err) : resolve(client))
    )
  );

const queryPromise = (client, table) =>
  new Promise((resolve, reject) =>
    client.exec(`SELECT * FROM ${table}`, (err, rows) => {
      client.end();
      err ? reject(err) : resolve(rows);
    })
  );

app.use(logging.middleware(options));

passport.use(new JWTStrategy(services.uaa));

app.use(passport.initialize());
app.use(passport.authenticate("JWT", { session: false }));

app.get("/", (req, res, next) => {
  let logger = req.loggingContext.getLogger("/Application");
  let tracer = req.loggingContext.getTracer("");

  let isAuthorized = req.authInfo.checkScope("openid");
  if (isAuthorized) {
    tracer.debug(`Authorization success. User: ${req.user.id}, Path: '/'.`);

    connPromise(hanaConfig)
      .then(client => queryPromise(client, tinyCountries))
      .then(rows =>
        res.send(
          `Application user: ${req.user.id} <br> Results: ${JSON.stringify(
            rows
          )}`
        )
      )
      .catch(err => console.error(err));
  } else {
    logger.info(`Authorization failed. User: ${req.user.id}, Path: '/'.`);
    res.status(403).send("Forbidden");
  }
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`myapp listening on port ${port}`));
