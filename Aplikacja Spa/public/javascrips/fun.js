function addItem() {
    document.getElementById("itemsFormAdd").style.display = "inline";
    document.getElementById("buttonToAdd").style.display = "none";
    document.getElementById("buttonToAdd1").style.display = "none";
    document.getElementById("extraInformationAboutSeance").style.display = "none";
    document.getElementById("items").style.display = "none";
    document.getElementById("buttonToAdd").style.display = "none";
    document.getElementById("buttonToShow").style.display = "none";
    document.getElementById("result").style.display = "none";
}
/*Function hiding div with showed elements,
and doesnt have range on delete and moreInforamtion elements */
function addItemWithoutHidingExtra() {
    document.getElementById("extraInformationAboutSeance").style.display = "none";
    document.getElementById("items").style.display = "none";
    document.getElementById("itemsFormAdd").style.display = "inline";
    document.getElementById("buttonToAdd").style.display = "none";
    document.getElementById("result").style.display = "none";
}

function deleteData(url, id) {

    fetch(url + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            console.log(response.status);
            if (!response.ok) {
                document.getElementById("extraInformationAboutSeance").innerHTML = "Nie udało się usunąć. Rekord ma jakieś powiązania";
                console.log("Nie usunieto")
            } else {
                document.getElementById("extraInformationAboutSeance").innerHTML = "Usunięto z bazy - odśwież stronę";
            }
            response.json().then(json => {
                    return json;
                })
                .catch(function(err) {
                    console.log(err);
                })
        })
}

function addItemToSeance() {
    document.getElementById("buttonToAdd").style.display = "none";
    document.getElementById("buttonToAdd1").style.display = "none";
    document.getElementById("extraInformationAboutSeance").style.display = "none";
    document.getElementById("items").style.display = "none";
    document.getElementById("itemsToSeanceAdd").style.display = "inline";
    document.getElementById("buttonToAdd").style.display = "none";
    document.getElementById("buttonToShow").style.display = "none";
    document.getElementById("result").style.display = "none";
}

function addClientToCourse() {
    document.getElementById("buttonToAdd1").style.display = "none";
    document.getElementById("buttonToAdd").style.display = "none";
    document.getElementById("extraInformationAboutSeance").style.display = "none";
    document.getElementById("items").style.display = "none";
    document.getElementById("clientToCourse").style.display = "inline";
    document.getElementById("buttonToShow").style.display = "none";
    document.getElementById("result").style.display = "none";
}