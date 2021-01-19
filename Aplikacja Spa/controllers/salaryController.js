const pool = require('../db');

const getSalaries = (request, response) => {
    pool.query('SELECT kwota from wynagrodzenie ORDER BY kwota DESC', (error, results) => {
        if (error) {
            response.status(400).render('pages/salaries', { items: 0, result: "Nie można wypisać wynagrodzeń" })
        }
        response.status(200).render('pages/salaries', { items: results.rows, result: "" })
    })
}
const createSalary = (request, response) => {
    const { salary } = request.body
    pool.query('INSERT INTO wynagrodzenie(kwota) VALUES ($1)', [salary], (error, results) => {
        if (error) {
            response.status(200).render('pages/salaries', { items: 0, result: "Nie można dodać tego wynagrodzenia" })
        }
        response.status(200).render('pages/salaries', { items: 0, result: "Wynagrodzenie zostało dodane" })
    })
}

const updateSalary = (request, response) => {
    const previous_salary = parseInt(request.params.previous_salary)
    const { new_salary } = request.body[0]

    pool.query('UPDATE wynagrodzenie SET  kwota = $2 WHERE (wynagrodzenie_id = (select w.wynagrodzenie_id from wynagrodzenie w where w.kwota = $1));', [previous_salary, new_salary], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna zmodyfikowac wynagrodzenia`)
        }
        response.status(200).send(`Wynagrodzenie zmodyfikowane`)
    })
}

const deleteSalary = (request, response) => {
    const salary = request.params.salary
    pool.query('DELETE FROM wynagrodzenie WHERE kwota = $1', [salary], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna usunac tego wynagrodzenia`)
        }
        response.status(200).send(`Wynagrodzenie usuniete`)
    })
}

module.exports = {
    getSalaries,
    createSalary,
    updateSalary,
    deleteSalary
}