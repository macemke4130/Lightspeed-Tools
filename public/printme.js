const params = window.location.search;
const serial = params.split("barcode=")[1].split("&")[0];
const key = params.split("key=")[1].split("&")[0];
const builder = params.split("builder=")[1];

const serialFormat = serial.replace("%20", " ");
const keyFormat = key.replace("%20", " ");
const builderFormat = builder.replace("%20", " ");

const serialBarcode = document.getElementById("serial-barcode");
const keyBarcode = document.getElementById("key-barcode");
const builderOutput = document.getElementById("builder-output-sticker");
const serialSticker = document.getElementById("serial-sticker");
const keySticker = document.getElementById("key-sticker");

JsBarcode(serialBarcode, serialFormat, {
    format: "code128",
    fontSize: 16,
    font: "'Inconsolata', monospace",
    textMargin: 0,
    lineColor: "#00",
    width: 1,
    height: keyFormat === "null" ? 20 : 10,
    displayValue: false
});

if (keyFormat != "null") {
    JsBarcode(keyBarcode, keyFormat, {
        format: "code128",
        fontSize: 16,
        font: "'Inconsolata', monospace",
        lineColor: "#00",
        width: 1,
        height: 10,
        displayValue: false
    });
}

serialSticker.innerText = serialFormat;
if (keyFormat != "null") keySticker.innerText = "Key: " + keyFormat;
builderOutput.innerText = "Built by " + builderFormat.toUpperCase();

if (keyFormat === "null") {
    keyBarcode.remove();
    keySticker.remove();
}

window.print();

setTimeout(function(){ window.close(); }, 10000);