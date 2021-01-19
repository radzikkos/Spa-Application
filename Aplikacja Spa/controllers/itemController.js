const pool = require('../db');

const getItems = (request, response) => {
    pool.query('SELECT * FROM rzeczy_cena ORDER BY rzecz_id DESC', (error, results) => {
        if (error) {
            return response.status(400).send('Nie mozna wypisac cen')
        }
        response.render('pages/items', { items: results.rows, result: "" })
    })
}

const createItem = (request, response) => {
    const { price, name, amount } = request.body
    if (!/^[a-zA-Z]+$/.test(name)) {
        return response.status(400).render('pages/items', { items: 0, result: "Nie udało się dodać przedmiotu" })
    }
    pool.query('INSERT INTO rzecz(cena_id, nazwa, ilosc) VALUES (zwroc_id_ceny($1),$2,$3); ', [price, name, amount], (error, results) => {
        if (error) {
            return response.status(400).render('pages/items', { items: 0, result: "Nie udało się dodać przedmiotu" })
        }

        return response.status(201).render('pages/items', { items: results.rows, result: "Przedmiot został dodany" })
    })

}

const updateItem = (request, response) => {
    const name = request.params.name
    const { price, amount } = request.body[0]

    pool.query('UPDATE rzecz SET cena_id = zwroc_id_ceny($1), ilosc = (ilosc + $2) WHERE nazwa = $3', [price, amount, name], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna zmodyfikowac ${name}`)
        }
        response.status(200).send(`${name} zostal zmodyfikowany`)
    })
}

const deleteItem = (request, response) => {
    const name = request.params.name
    pool.query('DELETE FROM rzecz WHERE nazwa = $1', [name], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna usunac tej rzeczy`)
        }
        response.status(200).send(`Rzecz ${name} zostala usunieta z bazy`)
    })
}

module.exports = {
    getItems,
    createItem,
    updateItem,
    deleteItem
}