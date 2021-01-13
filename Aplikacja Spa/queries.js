const Pool = require('pg').Pool
const pool = new Pool({
    user: 'ibwbksua',
    host: 'ziggy.db.elephantsql.com',
    database: 'ibwbksua',
    password: 'lyyCPZGsY_DRtnOYdRY8RdvbwxHf175w',
})


/* 
CRUD for items
*/
const getItems = (request, response) => {
    pool.query('SELECT * FROM rzeczy_cena', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createItem = (request, response) => {
    const { price, name, amount } = request.body[0]
    pool.query('INSERT INTO rzecz(cena_id, nazwa, ilosc) VALUES (zwroc_id_ceny($1),$2,$3); ', [price, name, amount], (error, results) => {
        if (error) {
            return response.status(400).send('Nie mozna dodac tego przedmiotu')
        }
        response.status(201).send(`Przedmiot ${name} zostal dodany`)
    })
}

const updateItem = (request, response) => {
    const name = request.params.name
    const { price, amount } = request.body[0]

    pool.query('UPDATE rzecz SET cena_id = zwroc_id_ceny($1), ilosc = $2 WHERE nazwa = $3', [price, amount, name], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna zmodyfikowac ${name}`)
        }
        response.status(200).send(`${name} zostal zmodyfikowany`)
    })
}

const deleteItem = (request, response) => {
    const name = request.params.name
    pool.query('DELETE FROM rzecz WHERE nazwa = $1', [name], (error, results) => {
        if (error) {
            //throw error;
            return response.status(400).send(`Nie mozna usunac tej rzeczy`)
        }
        response.status(200).send(`Rzecz ${name} zostala usunieta z bazy`)
    })
}

/* 
CRUD for prices
*/
const getPrices = (request, response) => {
    pool.query('SELECT cena_pojedynczej_sztuki as cena FROM cena_rzeczy ORDER BY cena DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPrice = (request, response) => {

    const price = request.body[0]['price']
    pool.query('INSERT INTO cena_rzeczy (cena_pojedynczej_sztuki) VALUES ($1)', [price], (error, results) => {
        if (error) {
            //throw error
            return response.status(400).send('Nie mozna dodac tej wartosci')
        }
        response.status(201).send(`Cena ${price} zlote zostala dodana`)
    })
}

const deletePrice = (request, response) => {
    const price = (request.params.price)
    pool.query('DELETE FROM cena_rzeczy WHERE cena_id = zwroc_id_ceny($1)', [price], (error, results) => {
        if (error) {
            //throw error;
            return response.status(400).send(`Nie mozna usunac ceny ${price}`)
        }
        response.status(200).send(`Cena ${price} zostala usunieta z bazy`)
    })
}

/**
 * CRUD for rooms
 */
const getRooms = (request, response) => {
    pool.query('SELECT pomieszczenie_id as nr_pokoju FROM pomieszczenie ORDER BY pomieszczenie_id DESC;', (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wypisac pomieszczen`)
        }
        response.status(200).json(results.rows)
    })
}

const createRoom = (request, response) => {
    const { nr } = request.body[0]
    pool.query('INSERT INTO pomieszczenie VALUES ($1);  ', [nr], (error, results) => {
        if (error) {
            return response.status(400).send('Nie mozna dodac tego pokoju')
        }
        response.status(201).send(`Pokoj nr ${nr} zostal dodany`)
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

/**
 * CRUD for seances
 */
const getSeances = (request, response) => {
    pool.query('SELECT * from seans', (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wypisac seansu`)
        }
        response.status(200).json(results.rows)
    })
}

const createSeance = (request, response) => {
    const { room, type, time } = request.body[0]
    pool.query('INSERT INTO seans(pomieszczenie_id, rodzaj, czas_trwania ) VALUES ($1, $2, $3)', [room, type, time], (error, results) => {
        if (error) {
            return response.status(400).send('Nie mozna dodac seansu')
        }
        response.status(201).send(`Seans zostal dodany`)
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
    pool.query('DELETE FROM seans WHERE rodzaj = $1', [type], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna usunac tego seansu`)
        }
        response.status(200).send(`Seans ${type} zostal usuniety`)
    })
}





module.exports = {
    /*Items */
    getItems,
    createItem,
    updateItem,
    deleteItem,

    /*Prices */
    getPrices,
    createPrice,
    deletePrice,

    /*Rooms */
    getRooms,
    createRoom,
    deleteRoom,

    /*Seances */
    getSeances,
    createSeance,
    updateSeance,
    deleteSeance,
}