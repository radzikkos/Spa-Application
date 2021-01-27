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

const getRaport4 = (request, response) => {
    pool.query('SELECT * from klienci_ilosc_kursow', (error, results) => {
        if (error) {
            return response.status(400).render('pages/raport4', { items: 0, result: "Nie można wypisać klientów" })
        }
        return response.status(200).render('pages/raport4', { items: results.rows, result: "" })
    })
}

const getRaport5 = (request, response) => {
    pool.query('SELECT * from ile_sprzedano_kursow', (error, results) => {
        if (error) {
            return response.status(400).render('pages/raport5', { items: 0, result: "Nie można wypisać klientów" })
        }
        return response.status(200).render('pages/raport5', { items: results.rows, result: "" })
    })
}


module.exports = {
    getRaport1,
    getRaport2,
    getRaport3,
    getRaport4,
    getRaport5
}