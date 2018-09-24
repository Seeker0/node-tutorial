"use strict";

let oFirstDialog;

const openFirstDialog = function() {
  if (oFirstDialog) {
    oFirstDialog.open();
  } else {
    oFirstDialog = sap.ui.commons.Dialog({
      width: "400px",
      height: "550px",
      title: "Country Details",
      applyContentPadding: true,
      modal: true,
      content: [
        new sap.ui.commons.form.SimpleForm({
          content: [
            new sap.ui.core.Title({ text: "Country Name" }),
            new sap.ui.commons.Label({ text: "name" }),
            new sap.ui.commons.TextField({ value: "", id: "name" }),
            new sap.ui.commons.Label({ text: "partof" }),
            new sap.ui.commons.TextField({ value: "", id: "partof" })
          ]
        })
      ]
    });

    oFirstDialog.addButton(
      new sap.ui.commons.Button({
        text: "OK",
        press: function() {
          let name = sap.ui
            .getCore()
            .byId("name")
            .getValue();
          let partof = sap.ui.getCore().byId("partof").getValue;
          let payload = {};
          payload.name = name;
          payload.partof = partof;
          let insertdata = JSON.stringify(payload);

          $.ajax({
            type: "POST",
            url: "country/country.xsjs",
            contentType: "application/json",
            data: insertdata,
            dataType: "json",
            crossDomain: true,
            success: function(data) {
              oFirstDialog.close();

              sap.ui
                .getcore()
                .byId("tinytab")
                .getModel()
                .refresh(true);
              alert("Data inserted successfully");
            },
            error: function(data) {
              let message = JSON.stringify(data);
              alert(message);
            }
          });
        }
      })
    );

    oFirstDialog.open();
  }
};
