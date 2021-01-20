const pool = require('../db');

const getClientsAndCourses = (request, response) => {
    pool.query('SELECT * from klient_kurs_widok ORDER BY data DESC', (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wypisac klientKurs`)
        }
        response.status(200).json(results.rows)
    })
}

const createClientAndCourse = (request, response) => {
    const { client_id, course_name, data } = request.body
    pool.query('INSERT INTO klient_kurs(klient_id, kurs_id, data_id) VALUES ($1,zwroc_kurs_id($2),zwroc_data_id($3))', [client_id, course_name, data], (error, results) => {
        if (error) {
            return response.status(400).render('pages/clients', { items: 0, result: "Nie można zapisać klienta" })
        }
        return response.status(201).render('pages/clients', { items: 0, result: "Klient zapisany na kurs" })
    })
}

const updateClientAndCourse = (request, response) => {
    const data = request.params.data
    const id = request.params.id;
    const { course } = request.body

    pool.query('UPDATE klient_kurs set kurs_id = zwroc_kurs_id($1) where (klient_id = $2) and (data_id = zwroc_data_id($3)) ', [course, id, data], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna zmodyfikowac klient kurs`)
        }
        response.status(200).send(`Kurs w danym dniu dla klienta zostal zmieniony`)
    })
}

const deleteClientAndCourse = (request, response) => {
    const id = request.params.id
    const data = request.params.data

    pool.query('DELETE FROM klient_kurs WHERE (klient_id = $1) and (data_id = zwroc_data_id($2))', [id, data], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna usunac tego zamowienia`)
        }
        response.status(200).send(`Zamowienie usuniete`)
    })
}

module.exports = {
    getClientsAndCourses,
    createClientAndCourse,
    updateClientAndCourse,
    deleteClientAndCourse
}