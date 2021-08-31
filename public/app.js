console.log("Created by Lucas Mace");
console.log("lucasmace4130@gmail.com");

const mysvg = document.getElementById("barcode");
let barcodePass;
let builderPass;

let serial = document.getElementById("serial");
let builder = document.getElementById("builder-input");

const generate = () => {
    let builderOutput = document.getElementById("builder-output");

    if (serial.value != "") {
        JsBarcode(mysvg, serial.value, {
            format: "code128",
            fontSize: 15,
            lineColor: "#00",
            width: 1, 
            height: 50,
            displayValue: true
        });
    }

    if (builder.value != "") {
        builderOutput.innerText = builder.value.toUpperCase();
    }

    // Set Global Variables for printing --
    barcodePass = serial.value;
    builderPass = builder.value;
};

const sendToPrint = (e) => {
    e.preventDefault();

    if (builder.value === "") return;
    
    const check = validate();
    if (check === false) return;

    window.open(`./sticker.html?barcode=${barcodePass}&builder=${builderPass}`, "_blank");
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