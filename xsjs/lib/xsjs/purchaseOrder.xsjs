function savePO(po) {
  var conn = $.hdb.getConnection();

  var output = JSON.stringify(po);

  var fnCreatePurchaseOrder = conn.loadProcedure(
    "CAF3E027B3DD4BB588EB8842F42F77C7.PurchaseOrder::createPurchaseOrder"
  );

  var result = fnCreatePurchaseOrder({
    IM_PURCHASEORDERID: po.PURCHASEORDERID,
    IM_CREATEDBY: po.CREATEDBY,
    IM_CREATEDAT: po.CREATEDAT,
    IM_CHANGEDBY: po.CHANGEDBY,
    IM_CHANGEDAT: po.CHANGEDAT,
    IM_NOTEID: po.NOTEID,
    IM_PARTNER: po.PARTNER,
    IM_CURRENCY: po.CURRENCY,
    IM_GROSSAMOUNT: po.GROSSAMOUNT,
    IM_NETAMOUNT: po.NETAMOUNT,
    IM_TAXAMOUNT: po.TAXAMOUNT,
    IM_LIFECYCLESTATUS: po.LIFECYCLESTATUS,
    IM_APPROVALSTATUS: po.APPROVALSTATUS,
    IM_CONFIRMSTATUS: po.CONFIRMSTATUS,
    IM_ORDERINGSTATUS: po.ORDERINGSTATUS,
    IM_INVOICINGSTATUS: po.INVOICINGSTATUS
  });

  conn.commit();

  conn.close();

  if (result && result.EX_ERROR !== null) {
    return { body: result, status: $.net.http.BAD_REQUEST };
  } else {
    return { body: output, status: $.net.http.CREATED };
  }
}

var body = $.request.body.asString();

var po = JSON.parse(body);

//validate the inputs here!
var output = savePO(po);
$.response.contentType = "application/json";
$.response.setBody(output.body);
$.response.status = output.status;
