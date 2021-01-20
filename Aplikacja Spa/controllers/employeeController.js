const pool = require('../db');

const getEmployees = (request, response) => {
    pool.query('SELECT * from pracownik_wszystko ORDER BY stanowisko', (error, results) => {
        if (error) {
            return response.status(400).render('pages/employees', { items: 0, result: "Nie można wypisać pracowników" })
        }
        return response.status(200).render('pages/employees', { items: results.rows, result: "" })
    })
}

const getEmployeeById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * from pracownik_wynagrodzenie where pracownik_id = $1 ORDER BY stanowisko ', [id], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wyszukac pracownika`)
        } else {
            response.status(200).json(results.rows)
        }

    })
}

const createEmployee = (request, response) => {
    const { seance_name, salary, name, surname, workstand } = request.body
    pool.query('INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (zwroc_id_seansu($1), zwroc_wynagrodzenie_id($2),$3, $4, $5);', [seance_name, salary, name, surname, workstand], (error, results) => {
        if (error) {
            return response.status(400).render('pages/employees', { items: 0, result: "Nie można dodać pracownika" })
        }
        return response.status(201).render('pages/employees', { items: 0, result: "Pracownik został dodany" })
    })
}


const updateEmployee = (request, response) => {
    const id = request.params.id
    const { new_salary } = request.body

    pool.query('UPDATE pracownik set wynagrodzenie_id = zwroc_wynagrodzenie_id($1) where pracownik_id = $2', [new_salary, id], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna zmodyfikowac pracownika`)
        }
        response.status(200).send(`Wynagrodzenie pracownika zmienione`)
    })
}

const deleteEmployee = (request, response) => {
    const id = request.params.id

    pool.query('DELETE FROM pracownik WHERE pracownik_id = $1', [id], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna usunac tego pracownika`)
        }
        response.status(200).send(`Pracownik usuniety`)
    })
}



module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
}