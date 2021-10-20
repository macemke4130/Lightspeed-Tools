console.log("Created by Lucas Mace");
console.log("lucasmace4130@gmail.com");

const inputTitle = document.getElementById("title");
const inputBody = document.getElementById("body");
const titlePreview = document.getElementById("title-preview");
const bodyPreview = document.getElementById("body-preview");
const clear = "";

const generate = () => {
    titlePreview.innerText = inputTitle.value;
    bodyPreview.innerText = inputBody.value;
}

const sendToPrint = (e) => {
    e.preventDefault();
    
    localStorage.clear();
    localStorage.setItem("title", inputTitle.value);
    localStorage.setItem("body", inputBody.value);

    inputTitle.value = clear;
    inputBody.value = clear;
    titlePreview.innerText = clear;
    bodyPreview.innerText = clear;
    
    inputTitle.focus();

    window.open("/printCustomSticker.html", "_blank");
}

document.getElementById("controls").onsubmit = sendToPrint;
document.getElementById("print").onclick = sendToPrint;