const { response } = require("express");

addItem = function() {
    document.getElementById("items").style.display = "none";
    document.getElementById("itemsFormAdd").style.display = "inline";
    document.getElementById("buttonToAdd").style.display = "none";
    document.getElementById("result").style.display = "none";
}