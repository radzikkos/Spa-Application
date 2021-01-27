const pool = require('../db');

const getSeances = (request, response) => {
    var rooms;
    pool.query('SELECT * from pomieszczenie', (error, results) => {
        if (error) {
            return response.status(400).render('pages/employees', { items: 0, result: "Nie można wypisać pracowników", salary: 0, seance: 0 })
        }
        rooms = results.rows;
        pool.query('SELECT * from rzecz', (error, results) => {
            if (error) {
                return response.status(400).render('pages/employees', { items: 0, result: "Nie można wypisać pracowników", salary: 0, seance: 0 })
            }
            i = results.rows;

            pool.query('SELECT * from seans', (error, results) => {
                if (error) {
                    return response.status(400).render('pages/employees', { items: 0, result: "Nie można wypisać pracowników", salary: 0, seance: 0 })
                }
                seance = results.rows;
                console.log(seance);
                pool.query('SELECT * from widok_seansu ORDER BY seans_id DESC', (error, results) => {
                    if (error) {
                        return response.status(400).send(`Nie mozna wypisac seansu`)
                    }
                    //console.log(i)
                    //response.status(200).json(results.rows)
                    response.render('pages/seances', { items: results.rows, result: "", rooms: rooms, item: i, seances: seance })
                })
            })
        })
    })

}

const getSeanceByName = (request, response) => {
    const name = request.params.name
    pool.query('SELECT nazwa, uzyta_ilosc from rzeczy_w_seansie_widok where seans_id = zwroc_id_seansu($1)', [name], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wypisac seansu`)
        }
        response.status(200).json(results.rows)
    })
}



const createSeance = (request, response) => {
    const { room, type, time } = request.body
    if (!/^[a-zA-Z]+$/.test(type)) {
        return response.status(401).render('pages/seances', { items: 0, result: "Nie udało się dodać seansu" })
    }
    pool.query('INSERT INTO seans(pomieszczenie_id, rodzaj, czas_trwania ) VALUES ($1, $2, $3)', [room, type, time], (error, results) => {
        if (error) {
            return response.status(400).render('pages/seances', { items: 0, result: "Nie udało się dodać seansu" })
        }
        return response.status(201).render('pages/seances', { items: results.rows, result: "Seans został dodany" })
    })
}

const updateSeance = (request, response) => {
    const type = request.params.type
    const { time } = request.body[0]

    pool.query('UPDATE seans SET  czas_trwania = $1 WHERE rodzaj = $2', [time, type], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna zmodyfikowac sensu`)
        }
        response.status(200).send(`Seans ${type} zostal zmodyfikowany`)
    })
}

const deleteSeance = (request, response) => {
        const type = request.params.type
        pool.query('DELETE FROM seans WHERE seans_id = $1', [type], (error, results) => {
            if (error) {
                return response.status(400).render('pages/seances', { items: 0, result: "Ten seans jest przypisany do kursu. Nie możesz go usunąć " })
            }

            response.status(200).send(`Seans ${type} zostal usuniety`)
        })
    }
    /* Show employees connected with seance*/
const getSeanceEmployees = (request, response) => {
    const name = request.params.name
    pool.query('select zwroc_pracownikow_robiacych_seansV2(zwroc_id_seansu(($1))) as pracownik', [name], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wypisac Pracownikow robiacych dany seans`)
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getSeances,
    getSeanceByName,
    createSeance,
    updateSeance,
    deleteSeance,
    getSeanceEmployees
}