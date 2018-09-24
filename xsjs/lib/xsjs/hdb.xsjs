/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
"use strict";

const conn = $.hdb.getConnection();
let query =
  'SELECT FROM PurchaseOrder.Item { POHeader.PURCHASEORDERID as "PurchaseOrderItemId", PRODUCT as "ProductID", GROSSAMOUNT as "Amount" } ';
let rs = conn.executeQuery(query);

let body = "";

for (let item of rs) {
  if (item.Amount >= 500) {
    body +=
      item.PurchaseOrderItemId +
      "\t" +
      item.ProductID +
      "\t" +
      item.Amount +
      "\n";
  }
}

$.response.setBody(body);
$.response.contentType = "application/vnd.ms-excel; charset=utf-16le";
$.response.headers.set("Content-Disposition", "attachment; filename=Excel.xls");
$.response.status = $.net.http.OK;
