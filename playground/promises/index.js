const hdbext = require("@sap/hdbext");

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

module.exports = { connPromise, queryPromise, hanaConfig };
