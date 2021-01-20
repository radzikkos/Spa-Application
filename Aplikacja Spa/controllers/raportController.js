const pool = require('../db');

const getRaport1 = (request, response) => {
    pool.query('SELECT * from kurs_seans_widok order by kurs', (error, results) => {
        if (error) {
            return response.status(400).render('pages/raport1', { items: 0, result: "Nie można wypisać raportu" })
        }
        return response.status(200).render('pages/raport1', { items: results.rows, result: "" })

    })
}

const getRaport2 = (request, response) => {
    pool.query('SELECT * from klient_kurs_widok', (error, results) => {
        if (error) {
            return response.status(400).render('pages/raport2', { items: 0, result: "Nie można wypisać raportu" })
        }
        return response.status(200).render('pages/raport2', { items: results.rows, result: "" })
    })
}

const getRaport3 = (request, response) => {
    pool.query('SELECT * from cennik', (error, results) => {
        if (error) {
            return response.status(400).render('pages/raport2', { items: 0, result: "Nie można wypisać raportu" })
        }
        return response.status(200).render('pages/raport3', { items: results.rows, result: "" })

    })
}


module.exports = {
    getRaport1,
    getRaport2,
    getRaport3
}