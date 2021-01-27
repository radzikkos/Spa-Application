const pool = require('../db');

const getEmployees = (request, response) => {
    var sal;
    pool.query('SELECT * from WYNAGRODZENIE ORDER BY KWOTA', (error, results) => {
        if (error) {
            return response.status(400).render('pages/employees', { items: 0, result: "Nie można wypisać pracowników", salary: 0, seance: 0 })
        }
        sal = results.rows;
    })

    var seances;
    pool.query('SELECT * from seans', (error, results) => {
        if (error) {
            return response.status(400).render('pages/employees', { items: 0, result: "Nie można wypisać pracowników", salary: 0, seance: 0 })
        }
        seances = results.rows;
    })
    pool.query('SELECT * from pracownik_wszystko ORDER BY stanowisko', (error, results) => {
        if (error) {
            return response.status(400).render('pages/employees', { items: 0, result: "Nie można wypisać pracowników", salary: 0, seance: 0 })
        }
        console.log(sal)
        return response.status(200).render('pages/employees', { items: results.rows, result: "", salary: sal, seance: seances })
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
    console.log(seance_name, salary, name, surname, workstand)
    var sal;
    pool.query('SELECT * from WYNAGRODZENIE ORDER BY KWOTA', (error, results) => {
        if (error) {
            return response.status(400).render('pages/employees', { items: 0, result: "Nie można wypisać pracowników", salary: 0, seance: 0 })
        }
        sal = results.rows;
        //return response.status(200).render('pages/employees', { items: results.rows, result: "", salary: "AA" })
    })

    var seances;
    pool.query('SELECT * from seans', (error, results) => {
        if (error) {
            return response.status(400).render('pages/employees', { items: 0, result: "Nie można wypisać pracowników", salary: 0, seance: 0 })
        }
        seances = results.rows;
        //return response.status(200).render('pages/employees', { items: results.rows, result: "", salary: "AA" })
    })
    pool.query('INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (($1), zwroc_wynagrodzenie_id($2),$3, $4, $5);', [seance_name, salary, name, surname, workstand], (error, results) => {
        if (error) {
            return response.status(400).render('pages/employees', { items: 0, result: "Nie można dodać pracownika", salary: sal, seances: seances })
        }
        return response.status(201).render('pages/employees', { items: 0, result: "Pracownik został dodany", salary: sal, seance: seances })
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
            console.log("Nie można usunąć tego pracownika, pracuje w jakimś seansie, który jest jest zamówiony")
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