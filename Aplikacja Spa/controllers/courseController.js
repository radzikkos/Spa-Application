const pool = require('../db');

const getCourses = (request, response) => {
    pool.query('SELECT * from kurs_widok', (error, results) => {
        if (error) {
            //return response.status(200).render('pages/courses', { items: 0, result: "Nie można wyświetlić kursów" })
        }
        return response.status(200).render('pages/courses', { items: results.rows, result: "" })
            //response.status(200).json(results.rows)
    })
}

const getCourseByName = (request, response) => {
    const name = request.params.name

    pool.query('SELECT seans from seanse_w_kursach where kurs_id = zwroc_kurs_id($1) ', [name], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wyszukac kursu`)
        } else {
            response.status(200).json(results.rows)
        }

    })
}

const createCourse = (request, response) => {
    const { name, level } = request.body
    if (!/^[a-zA-Z]+$/.test(name)) {
        return response.status(400).render('pages/courses', { items: 0, result: "Nie udało się dodać kursu" })
    }
    pool.query('INSERT INTO kurs(nazwa, poziom_luksusu) VALUES ($1, $2)', [name, level], (error, results) => {
        if (error) {
            return response.status(400).render('pages/courses', { items: 0, result: "Nie można dodać tego kursu" })
        }
        return response.status(201).render('pages/courses', { items: 0, result: "Kurs dodany" })
    })
}

const updateCourse = (request, response) => {
    const name = request.params.name
    const { level } = request.body[0]

    pool.query('UPDATE kurs set poziom_luksusu = $1 where nazwa = $2', [level, name], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna zmodyfikowac kursu`)
        }
        response.status(200).send(`Level kursu zmieniony`)
    })
}

const deleteCourse = (request, response) => {
    const name = request.params.name
    pool.query('DELETE FROM kurs WHERE nazwa = $1', [name], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna usunac tego kursu`)
        }
        response.status(200).send(`Kurs usuniety`)
    })
}

module.exports = {
    getCourses,
    getCourseByName,
    createCourse,
    updateCourse,
    deleteCourse
}