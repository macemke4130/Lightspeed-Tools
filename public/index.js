console.log("Created by Lucas Mace");
console.log("lucasmace4130@gmail.com");

const serialInput = document.getElementById("serial-input");
const bikeKeyInput = document.getElementById("bike-key-input");
const builderInput = document.getElementById("builder-input");

const serialPreviewText = document.getElementById("serial-preview-text");
const bikeKeyPreviewText = document.getElementById("bike-key-preview-text");
const builderPreview = document.getElementById("builder-preview");

const serialPreviewBarcode = document.getElementById("serial-preview-barcode");
const bikeKeyPreviewBarcode = document.getElementById("bike-key-preview-barcode");

const clear = "";

const generate = () => {
    if (serialInput.value != "") {
        JsBarcode(serialPreviewBarcode, serialInput.value, {
            format: "code128",
            lineColor: "#00",
            width: 1,
            height: bikeKeyInput.value === clear ? 30 : 15,
            displayValue: false,
            margin: 0
        });
        serialPreviewText.innerText = serialInput.value;
    } else {
        serialPreviewText.innerText = clear;
        serialPreviewBarcode.style.height = 0;
    }

    if (bikeKeyInput.value != "") {
        JsBarcode(bikeKeyPreviewBarcode, bikeKeyInput.value, {
            format: "code128",
            lineColor: "#00",
            width: 1,
            height: 15,
            displayValue: false,
            margin: 0
        });
        bikeKeyPreviewText.innerText = "KEY: " + bikeKeyInput.value;
    } else {
        bikeKeyPreviewText.innerText = clear;
        bikeKeyPreviewBarcode.style.height = 0;
    }

    if (builderInput.value != "") {
        builderPreview.innerText = "BUILT BY " + builderInput.value;
    } else {
        builderPreview.innerText = clear;
    }
};

const sendToPrint = (e) => {
    e.preventDefault();

    const check = validate();
    if (check === false) {
        builderInput.focus();
        return;
    }

    localStorage.clear();
    localStorage.setItem("serial", serialInput.value);
    localStorage.setItem("bikeKey", (bikeKeyInput.value != "") ? bikeKeyInput.value : "null");
    localStorage.setItem("builder", builderInput.value);

    builderInput.value = clear;
    bikeKeyInput.value = clear;
    serialInput.value = clear;

    serialInput.focus();
    generate();

    window.open("./printBuildSticker.html", "_blank");
}

const validate = () => {
    const required = [serialInput, builderInput];
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