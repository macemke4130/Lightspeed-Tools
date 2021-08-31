const params = window.location.search;
const serial = params.split("barcode=")[1].split("&")[0];
const builder = params.split("builder=")[1];

const mysvg = document.getElementById("barcode");
const builderOutput = document.getElementById("builder-output");

JsBarcode(mysvg, serial, {
    format: "code128",
    fontSize: 15,
    lineColor: "#00",
    width: 1.5, 
    height: 45,
    displayValue: true
});

builderOutput.innerText = builder.toUpperCase();

window.print();

setTimeout(function(){ window.close(); }, 10000);