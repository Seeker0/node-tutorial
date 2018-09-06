"use strict";

const xsjs = require("@sap/xsjs");
const xsenv = require("@sap/xsenv");
let port = process.env.PORT || 3000;

let options = xsenv.getServices({ hana: "jeff-hdi-container", uaa: "myuaa" });

xsjs(options).listen(port);
console.log(`XSJS application listening on port %d, ${port}`);
