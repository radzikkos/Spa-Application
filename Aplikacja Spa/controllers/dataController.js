const pool = require('../db');

const getData = (request, response) => {
    pool.query('SELECT * from przychody ORDER BY dzien DESC', (error, results) => {
        if (error) {
            return response.status(400).render('pages/data', { items: 0, result: "Nie można wypisać terminarza" })
        }
        return response.status(200).render('pages/data', { items: results.rows, result: "" })
    })
}
const getDataByData = (request, response) => {
    const id = request.params.id
    pool.query(' select k.imie, k.nazwisko from klient k where k.klient_id IN (select zwroc_klientow_w_danym_dniu($1))', [id], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wypisac klientow w tym dniu`)
        }
        response.status(200).json(results.rows)
    })
}

const createData = (request, response) => {
    const { data } = request.body
    pool.query('INSERT INTO data(data) VALUES ($1)', [data], (error, results) => {
        if (error) {
            return response.status(400).render('pages/data', { items: 0, result: "Nie można dodać tej daty" })
        }
        return response.status(201).render('pages/data', { items: 0, result: "Data została dodana" })
    })
}

const deleteData = (request, response) => {
    const data = request.params.data
    pool.query('DELETE FROM data WHERE data = $1', [data], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna usunac tego kursu`)
        }
        response.status(200).send(`Data usunieta`)
    })
}

module.exports = {
    getData,
    getDataByData,
    createData,
    deleteData
}