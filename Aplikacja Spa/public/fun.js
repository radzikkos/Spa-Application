addItem = function() {
    document.getElementById("items").style.display = "none";
    document.getElementById("itemsFormAdd").style.display = "inline";
    document.getElementById("buttonToAdd").style.display = "none";
    document.getElementById("result").style.display = "none";
}

const update = document.querySelector('#delete-button')

update.addEventListener('click', _ => {
    fetch('/prices', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "price": 1
            })
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(data => {
            window.location.reload()
        })
})