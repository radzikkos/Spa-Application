const pool = require('../db');

const getRooms = (request, response) => {
    pool.query('SELECT pomieszczenie_id as nr_pokoju FROM pomieszczenie ORDER BY pomieszczenie_id DESC;', (error, results) => {
        if (error) {
            return response.status(400).render('pages/rooms', { items: 0, result: "Nie udało się wyświetlić pomieszczeń" })
        }
        return response.status(200).render('pages/rooms', { items: results.rows, result: "" })
    })
}

const createRoom = (request, response) => {
    const { nr } = request.body
    pool.query('INSERT INTO pomieszczenie VALUES ($1);  ', [nr], (error, results) => {
        if (error) {
            return response.status(400).render('pages/rooms', { items: 0, result: "Nie można dodać tego pomieszczenia" })
        }
        return response.status(201).render('pages/rooms', { items: results.rows, result: "Pomieszczenie zostało dodane" })
    })
}

const deleteRoom = (request, response) => {
    const nr = (request.params.nr)
    pool.query('DELETE FROM pomieszczenie WHERE pomieszczenie_id = $1', [nr], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna usunac tego pomieszczenia`)
        }
        response.status(200).send(`Pomieszczenie ${nr} zostal usuniete`)
    })
}

module.exports = {
    getRooms,
    createRoom,
    deleteRoom
}