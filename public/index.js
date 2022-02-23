console.log("Created by Lucas Mace");
console.log("lucasmace4130@gmail.com");

const serialInput = document.getElementById("serial-input");
const bikeKeyInput = document.getElementById("bike-key-input");
const builderInput = document.getElementById("builder-input");
const tiresInput = document.getElementById("tires-input");

const serialPreviewText = document.getElementById("serial-preview-text");
const bikeKeyPreviewText = document.getElementById("bike-key-preview-text");
const builderPreview = document.getElementById("builder-preview");
const tiresPreview = document.getElementById("tires-preview");

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

    if (tiresInput.value != "none") {
        tiresPreview.style.display = "block";
        switch (tiresInput.value) {
            case "orange":
                tiresPreview.innerText = "Orange Seal";
                break;
            case "stan":
                tiresPreview.innerText = "Stan's";
                break;
            case "tubed":
                tiresPreview.innerText = "Tubes";
                break;
            default:
                break;
        }
        tiresPreview.innerText = tiresPreview.innerText + " Installed";
    } else {
        tiresPreview.style.display = "none";
        tiresPreview.innerText = clear;
    }
};

const sendToPrint = (e) => {
    e.preventDefault();

    const check = validate();
    if (check === false) {
        builderInput.focus();
        return;
    }

    const builderName = builderInput.value;

    localStorage.clear();
    localStorage.setItem("serial", serialInput.value);
    localStorage.setItem("bikeKey", (bikeKeyInput.value != "") ? bikeKeyInput.value : "null");
    localStorage.setItem("builder", builderName);
    localStorage.setItem("tires", (tiresInput.value != "") ? tiresPreview.innerText : "null");

    builderInput.value = clear;
    bikeKeyInput.value = clear;
    serialInput.value = clear;
    tiresInput.value = "none";

    serialInput.focus();
    generate();

    affirm(builderName);
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

const affirm = (builderName) => {
    const adj = ["Wonderful", "Amazing", "Golden", "Radient", "Passionate", "Magnificent", "Excellent", "Heroic", "Marvelous", "Glorious", "Fantastic", "Amazeballs", "Superb", "Beautiful", "Handsome", "Charming", "Delightful"];
    const noun = ["God", "Shining Star", "Soul", "Hero", "Superstar", "Lover", "Prophet", "Warrior", "Champion", "Conqueror"];

    const randomAdj = Math.floor(Math.random() * adj.length);
    const randomNoun = Math.floor(Math.random() * noun.length);

    const theAdj = adj[randomAdj];
    const theNoun = noun[randomNoun];

    builderName = builderName.charAt(0).toUpperCase() + builderName.slice(1);

    if (typeof builderName === "string") alert(`${builderName} is a ${theAdj} ${theNoun}.`);

    window.open("./printBuildSticker.html", "_blank");

}

document.getElementById("controls").onsubmit = sendToPrint;
document.getElementById("print").onclick = sendToPrint;