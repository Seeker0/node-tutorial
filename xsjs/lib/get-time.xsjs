"use strict";

const conn = $.hdb.getConnection();
let resultSet = conn.executeQuery("SELECT CURRENT_UTCTIMESTAMP FROM DUMMY");

$.response.setBody(
  `Current HANA time (UTC): ${resultSet[0].CURRENT_UTCTIMESTAMP}`
);

conn.close();
