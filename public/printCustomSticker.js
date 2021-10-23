const title = localStorage.getItem("title");
const body = localStorage.getItem("body");
const titlePreview = document.getElementById("title-preview");
const bodyPreview = document.getElementById("body-preview");

titlePreview.innerText = title;
bodyPreview.innerText = body;

window.print();
setTimeout(function(){ window.close(); }, 10000);