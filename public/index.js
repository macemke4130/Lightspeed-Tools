console.log("Created by Lucas Mace");
console.log("lucasmace4130@gmail.com");

const serialBarcode = document.getElementById("input-serial-barcode");
const keyBarcode = document.getElementById("input-key-barcode");

const serial = document.getElementById("serial-input");
const bikeKey = document.getElementById("key-input");
const builder = document.getElementById("builder-input");

const clear = "";

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

    if (bikeKey.value != "") {
        JsBarcode(keyBarcode, bikeKey.value, {
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
        builderOutput.innerText = builder.value;
    }
};

const sendToPrint = (e) => {
    e.preventDefault();

    const check = validate();
    if (check === false) return;
    
    localStorage.clear();
    localStorage.setItem("serial", serial.value);
    localStorage.setItem("bikeKey", (bikeKey.value != "") ? bikeKey.value : "null");
    localStorage.setItem("builder", builder.value);

    builder.value = clear;
    bikeKey.value = clear;
    serial.value = clear;

    serial.focus();

    window.open("./printBuildSticker.html", "_blank");
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