const pool = require('../db');

const getItemUsedInSeance = (request, response) => {
    pool.query('SELECT nazwa,rodzaj,uzyta_ilosc from rzeczy_w_seansie_widok', (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wypisac rzeczy w seansie`)
        }
        response.status(200).json(results.rows)
    })
}

const createItemUsedInSeance = (request, response) => {
    const { seance_name, item_name, amount } = request.body
    pool.query('INSERT INTO rzeczy_wykorzystane_do_seansu(seans_id, rzecz_id, uzyta_ilosc) VALUES ($1,($2),$3);', [seance_name, item_name, amount], (error, results) => {
        if (error) {
            return response.status(400).render('pages/seances', { items: 0, result: "Nie można dodać rzeczy do tego seansu" })

        }

        return response.status(201).render('pages/seances', { items: results.rows, result: "Rzecz do seansu została dodana" })
    })
}

const updateItemUsedInSeance = (request, response) => {
    const seance_name = request.params.seance_name
    const item_name = request.params.item_name
    const { amount } = request.body[0]

    pool.query('UPDATE rzeczy_wykorzystane_do_seansu SET  uzyta_ilosc = $1 WHERE seans_id = zwroc_id_seansu($2) and rzecz_id = zwroc_rzecz_id($3)', [amount, seance_name, item_name], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna zmodyfikowac rzeczy w seansie`)
        }
        response.status(200).send(`Przedmiot  w seansie zostal zmodyfikowany`)
    })
}

const deleteItemUsedInSeance = (request, response) => {
    const seance_name = request.params.seance_name
    const item_name = request.params.item_name
    pool.query('DELETE FROM rzeczy_wykorzystane_do_seansu WHERE seans_id = zwroc_id_seansu($1) and rzecz_id = zwroc_rzecz_id($2)', [seance_name, item_name], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna usunac tej rzeczy w seansie`)
        }
        response.status(200).send(`Rzecz zostala usunieta z seansu`)
    })
}

module.exports = {
    getItemUsedInSeance,
    createItemUsedInSeance,
    updateItemUsedInSeance,
    deleteItemUsedInSeance
}