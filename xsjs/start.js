"use strict";

const xsjs = require("@sap/xsjs");
const xsenv = require("@sap/xsenv");
let port = process.env.PORT || 3000;

let options = { redirectUrl: "/index.xsjs" };

//HANA
try {
  options = Object.assign(
    options,
    xsenv.getServices({ hana: "jeff-hdi-container" })
  );
} catch (e) {
  console.log("[WARN]", e.message);
}

//UAA
try {
  options = Object.assign(options, xsenv.getServices({ uaa: "myuaa" }));
} catch (e) {
  console.log("[WARN]", e.message);
}

// xsenv.getServices({ hana: "jeff-hdi-container", uaa: "myuaa" });

xsjs(options).listen(port);
console.log(`XSJS application listening on port %d, ${port}`);
