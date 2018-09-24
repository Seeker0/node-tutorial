var oFirstDialog;

function openFirstDialog() {
  if (oFirstDialog) {
    oFirstDialog.open();
  } else {
    oFirstDialog = new sap.ui.commons.Dialog({
      width: "400px",
      height: "550px",
      title: "Purchase Order Details",
      applyContentPadding: true,
      modal: true,
      content: [
        new sap.ui.commons.form.SimpleForm({
          content: [
            new sap.ui.core.Title({ text: "Purchase Order ID" }),
            new sap.ui.commons.Label({ text: "ID" }),
            new sap.ui.commons.TextField({ value: "", id: "PURCHASEORDERID" }),
            new sap.ui.commons.Label({ text: "Created By" }),
            new sap.ui.commons.TextField({ value: "", id: "CREATEDBY" }),
            new sap.ui.commons.Label({ text: "Created At" }),
            new sap.ui.commons.TextField({ value: "", id: "CREATEDAT" }),
            new sap.ui.commons.Label({ text: "Changed By" }),
            new sap.ui.commons.TextField({ value: "", id: "CHANGEDBY" }),
            new sap.ui.commons.Label({ text: "Changed At" }),
            new sap.ui.commons.TextField({ value: "", id: "CHANGEDAT" }),
            new sap.ui.commons.Label({ text: "Note ID" }),
            new sap.ui.commons.TextField({ value: "", id: "NOTEID" }),
            new sap.ui.commons.Label({ text: "Partner ID" }),
            new sap.ui.commons.TextField({ value: "", id: "PARTNER" }),
            new sap.ui.commons.Label({ text: "Currency" }),
            new sap.ui.commons.TextField({ value: "", id: "CURRENCY" }),
            new sap.ui.commons.Label({ text: "Gross Amount" }),
            new sap.ui.commons.TextField({ value: "", id: "GROSSAMOUNT" }),
            new sap.ui.commons.Label({ text: "Net Amount" }),
            new sap.ui.commons.TextField({ value: "", id: "NETAMOUNT" }),
            new sap.ui.commons.Label({ text: "Tax Amount" }),
            new sap.ui.commons.TextField({ value: "", id: "TAXAMOUNT" }),
            new sap.ui.commons.Label({ text: "Lifecycle Status" }),
            new sap.ui.commons.TextField({ value: "", id: "LIFECYCLESTATUS" }),
            new sap.ui.commons.Label({ text: "Approval Status" }),
            new sap.ui.commons.TextField({ value: "", id: "APPROVALSTATUS" }),
            new sap.ui.commons.Label({ text: "Confirmed Status" }),
            new sap.ui.commons.TextField({ value: "", id: "CONFIRMSTATUS" }),
            new sap.ui.commons.Label({ text: "Ordering Status" }),
            new sap.ui.commons.TextField({ value: "", id: "ORDERINGSTATUS" }),
            new sap.ui.commons.Label({ text: "Invoicing Status" }),
            new sap.ui.commons.TextField({ value: "", id: "INVOICINGSTATUS" })
          ]
        })
      ]
    });

    oFirstDialog.addButton(
      new sap.ui.commons.Button({
        text: "OK",
        press: function() {
          let getVal = id =>
            sap.ui
              .getCore()
              .byId(id)
              .getValue();
          let payload = {
            PURCHASEORDERID: getVal("PURCHASEORDERID"),
            CREATEDBY: getVal("CREATEDBY"),
            CREATEDAT: getVal("CREATEDAT"),
            CHANGEDBY: getVal("CHANGEDBY"),
            CHANGEDAT: getVal("CHANGEDAT"),
            NOTEID: getVal("NOTEID"),
            PARTNER: getVal("PARTNER"),
            CURRENCY: getVal("CURRENCY"),
            GROSSAMOUNT: getVal("GROSSAMOUNT"),
            NETAMOUNT: getVal("NETAMOUNT"),
            TAXAMOUNT: getVal("TAXAMOUNT"),
            LIFECYCLESTATUS: getVal("LIFECYCLESTATUS"),
            APPROVALSTATUS: getVal("APPROVALSTATUS"),
            CONFIRMSTATUS: getVal("CONFIRMSTATUS"),
            ORDERINGSTATUS: getVal("ORDERINGSTATUS"),
            INVOICINGSTATUS: getVal("INVOICINGSTATUS")
          };

          var insertdata = JSON.stringify(payload);

          $.ajax({
            type: "POST",
            url: "xsjs/xsjs/purchaseOrder.xsjs",
            contentType: "application/json",
            data: insertdata,
            dataType: "json",
            crossDomain: true,
            success: function(data) {
              oFirstDialog.close();

              sap.ui
                .getCore()
                .byId("POs")
                .getModel()
                .refresh(true);
              alert("PO inserted successfully");
            },
            error: function(data) {
              var message = JSON.stringify(data);
              alert(message);
            }
          });
        }
      })
    );

    oFirstDialog.open();
  }
}
