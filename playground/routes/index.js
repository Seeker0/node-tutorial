"use strict";

const express = require("express"),
  hdbext = require("@sap/hdbext"),
  router = express.Router();

const { hanaConfig, connPromise, queryPromise } = require("../promises");

let sql = `select * from 896257565B6F47D5878ADEDA920B48DF."jefftinyworld.tinydb::tinyf.world"`;

router.get("/", (req, res, next) => {
  connPromise(hanaConfig).then(client => {
    client.exec(sql, (err, rows) => {
      if (err) {
        console.error(`Execut error: ${err}`);
      } else {
        console.log(rows);
        res.render("index.jade", {
          title: "Sample Node.js on HANA express",
          datarow: rows
        });
      }
    });
    client.end();
  });
});

module.exports = router;
