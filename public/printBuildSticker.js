const serial = localStorage.getItem("serial");
const bikeKey = localStorage.getItem("bikeKey");
const builder = localStorage.getItem("builder");
const tires = localStorage.getItem("tires");

const serialBarcode = document.getElementById("serial-barcode");
const keyBarcode = document.getElementById("key-barcode");
const builderOutput = document.getElementById("builder-output-sticker");
const serialSticker = document.getElementById("serial-sticker");
const keySticker = document.getElementById("key-sticker");
const tiresSticker = document.getElementById("tires-sticker");

JsBarcode(serialBarcode, serial, {
    format: "code128",
    margin: 0,
    lineColor: "#00",
    width: 1,
    height: bikeKey === "null" ? 30 : 15,
    displayValue: false
});

if (bikeKey != "null") {
    JsBarcode(keyBarcode, bikeKey, {
        format: "code128",
        margin: 0,
        lineColor: "#00",
        width: 1,
        height: 15,
        displayValue: false
    });
}

serialSticker.innerText = serial;
if (bikeKey != "null") keySticker.innerText = "Key: " + bikeKey;
builderOutput.innerText = "Built by " + builder;
tiresSticker.innerText = tires;

if (bikeKey === "null") {
    const keyBarcodeGroup = document.getElementsByClassName("barcode-group")[1];
    keyBarcodeGroup.remove();
}

if (tires === "null") {
    tiresSticker.remove();
}

window.print();
setTimeout(function(){ window.close(); }, 10000);