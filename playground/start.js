"use strict";

require("dotenv").config();

const hdbext = require("@sap/hdbext");
const xsenv = require("@sap/xsenv");
const express = require("express");
const app = express();

app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

const index = require("./routes/index");

// let welcome = require("./views/index.html");

// let { hanaConfig } = require("./promises");

// app.use(hdbext.middleware(hanaConfig));

// let hanaConfig2 = xsenv.cfServiceCredentials({ hana: "hdi_tinydb" });
let countries =
  '896257565B6F47D5878ADEDA920B48DF."jefftinyworld.tinydb::tinyf.country"';

let continents =
  '896257565B6F47D5878ADEDA920B48DF."jefftinyworld.tinydb::tinyf.world"';

let pos = 'CAF3E027B3DD4BB588EB8842F42F77C7."PurchaseOrder.Header"';

let hanaConfig = {
  host: "ussxsadevdb.mykonicaminolta.com",
  port: 39015,
  databaseName: "HXE",
  user: process.env.DB_USER,
  password: process.env.USER_SECRET
};

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
      client.close();
      err ? reject(err) : resolve(rows);
    })
  );

connPromise(hanaConfig)
  .then(client => queryPromise(client, pos))
  .then(data => console.log(data))
  .catch(console.error);

// app.get("/", (req, res, next) => {
//   let client = req.db;
//   queryPromise(client, tinyCountries).then(data =>
//     res.send(JSON.stringify(data))
//   );
// });

// app.use("/", index);
//
// let port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`playground listening on port ${port}`));
