const pool = require('../db');

const getClients = (request, response) => {
    pool.query('SELECT * from klient', (error, results) => {
        if (error) {
            return response.status(400).render('pages/clients', { items: 0, result: "Nie można wypisać klientów" })
        }
        return response.status(200).render('pages/clients', { items: results.rows, result: "" })
    })
}

const getClientByNameAndSurname = (request, response) => {
    const id = request.params.id
    pool.query('SELECT zwroc_dane_klientaV2($1) as klient_kursy', [id], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wypisac klientow`)
        }
        response.status(200).json(results.rows)
    })
}

const createClient = (request, response) => {
    const { name, surname, pesel } = request.body
    pool.query('INSERT INTO klient(imie, nazwisko, pesel) VALUES ($1, $2, $3)', [name, surname, pesel], (error, results) => {
        if (error) {
            return response.status(400).render('pages/clients', { items: 0, result: "Nie można dodać klienta" })
        }
        return response.status(201).render('pages/clients', { items: 0, result: "Klient dodany" })
    })
}

const deleteClient = (request, response) => {
    const id = request.params.id
    pool.query('DELETE FROM klient WHERE klient_id = $1 ', [id], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna usunac tego klienta`)
        }
        response.status(200).send(`Klient usuniety`)
    })
}

module.exports = {
    getClients,
    getClientByNameAndSurname,
    createClient,
    deleteClient,
}