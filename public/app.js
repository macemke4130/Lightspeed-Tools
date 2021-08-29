const mysvg = document.getElementById("barcode");
let barcodePass;
let builderPass;

const generate = () => {
    const serial = document.getElementById("serial").value;
    let builder = document.getElementById("builder-input").value;
    let builderOutput = document.getElementById("builder-output");

    if (serial != "") {
        JsBarcode(mysvg, serial, {
            format: "code128",
            fontSize: 15,
            lineColor: "#00",
            width: 2, // Width of smallest bar --
            height: 75,
            displayValue: true
        });
    }

    if (builder != "") {
        builder = builder.toUpperCase();
        builderOutput.innerText = builder;
    }

    // Set Global Variables for printing --
    barcodePass = serial;
    builderPass = builder;
};

const sendToPrint = (e) => {
    e.preventDefault();
    window.location.href = `./sticker.html?barcode=${barcodePass}&builder=${builderPass}`;
}

document.getElementById("controls").onsubmit = sendToPrint;
document.getElementById("print").onclick = sendToPrint;