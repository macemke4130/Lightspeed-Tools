console.log("Created by Lucas Mace");
console.log("lucasmace4130@gmail.com");

const serialBarcode = document.getElementById("input-serial-barcode");
const keyBarcode = document.getElementById("input-key-barcode");

let barcodePass;
let keyPass;
let builderPass;

let serial = document.getElementById("serial");
let key = document.getElementById("key");
let builder = document.getElementById("builder-input");

const generate = () => {
    let builderOutput = document.getElementById("builder-output");

    if (serial.value != "") {
        JsBarcode(serialBarcode, serial.value, {
            format: "code128",
            fontSize: 15,
            font: "'Inconsolata', monospace",
            lineColor: "#00",
            width: 1, 
            height: 25,
            displayValue: true
        });
    }

    if (key.value != "") {
        JsBarcode(keyBarcode, key.value, {
            format: "code128",
            fontSize: 15,
            font: "'Inconsolata', monospace",
            lineColor: "#00",
            width: 1, 
            height: 25,
            displayValue: true
        });
    }

    if (builder.value != "") {
        builderOutput.innerText = builder.value.toUpperCase();
    }

    // Set Global Variables for printing --
    barcodePass = serial.value;
    keyPass = key.value ? key.value : null;
    builderPass = builder.value;
};

const sendToPrint = (e) => {
    e.preventDefault();

    const check = validate();
    if (check === false) return;

    if (builder.value === "") return;

    builder.value = "";
    key.value = "";
    serial.value = "";

    // Needs logic for clearing SVGs --

    serial.focus();

    window.open(`./sticker.html?barcode=${barcodePass}&key=${keyPass}&builder=${builderPass}`, "_blank");
}

const validate = () => {
    const required = [serial, builder];
    const red = "5px solid red";
    const reset = "1px solid black";

    for (let i = 0; i < required.length; i++) {
        if (required[i].value === "" || required[i].value === undefined) {
            required[i].style.border = red;
            return false;
        } else {
            required[i].style.border = reset;
        }
    }
    return true;
}

document.getElementById("controls").onsubmit = sendToPrint;
document.getElementById("print").onclick = sendToPrint;