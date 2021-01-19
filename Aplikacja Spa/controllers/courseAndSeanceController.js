const pool = require('../db');

const getCoursesAndSeances = (request, response) => {
    pool.query('SELECT * from kurs_seans_widok ORDER BY kurs', (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wypisac wynagrodzenia`)
        }
        response.status(200).json(results.rows)
    })
}

const getCourseAndSeancesByCourseName = (request, response) => {
    const name = request.params.name
    pool.query('SELECT * from seanse_w_kursach where kurs = $1', [name], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wypisac wynagrodzenia`)
        }
        response.status(200).json(results.rows)
    })
}

const createCourseAndSeance = (request, response) => {
    const { course_name, seance_name, employee_id } = request.body
    pool.query('INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (zwroc_kurs_id($1),zwroc_id_seansu($2),$3);', [course_name, seance_name, employee_id], (error, results) => {
        if (error) {
            return response.status(400).render('pages/courses', { items: 0, result: "Nie można dodać do kursu. Prawdopodobnie pracownik pracuje za długo" })
        }
        // response.status(201).send(`Seansu do kursu dodany`)
        return response.status(201).render('pages/courses', { items: 0, result: "Seans został dodany do kursu" })
    })
}

const updateCourseAndSeance = (request, response) => {
    const course_name = request.params.course_name
    const seance_name = request.params.seance_name
    const { name, surname, workstand, salary } = request.body[0]

    pool.query('UPDATE kurs_seans set pracownik_id = zwroc_id_pracownika($3, $4, $5,$6) where (kurs_id = zwroc_kurs_id($1)) and (seans_id = zwroc_id_seansu($2)) ', [course_name, seance_name, name, surname, workstand, salary], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna zmodyfikowac kursu`)
        }
        response.status(200).send(`Pracownik zmieniony zmieniony`)
    })
}

const deleteCourseAndSeance = (request, response) => {
    const course_name = request.params.course_name
    const seance_name = request.params.seance_name
    pool.query('DELETE FROM kurs_seans WHERE kurs_id = zwroc_kurs_id($1) and seans_id = zwroc_id_seansu($2)', [course_name, seance_name], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna usunac tego kursu`)
        }
        response.status(200).send(`Seans z kursu usuniety`)
    })
}

module.exports = {
    getCoursesAndSeances,
    getCourseAndSeancesByCourseName,
    createCourseAndSeance,
    updateCourseAndSeance,
    deleteCourseAndSeance
}