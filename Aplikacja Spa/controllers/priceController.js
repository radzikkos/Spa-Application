const pool = require('../db');

const getPrices = (request, response) => {
    pool.query('SELECT cena_id , cena_pojedynczej_sztuki as cena FROM cena_rzeczy ORDER BY cena DESC', (error, results) => {
        if (error) {
            throw error
        }
        //response.status(200).json(results.rows)
        response.render('pages/prices', { items: results.rows, result: "" })
    })
}

const createPrice = (request, response) => {
    const { price } = request.body
    pool.query('INSERT INTO cena_rzeczy (cena_pojedynczej_sztuki) VALUES ($1)', [price], (error, results) => {
        if (error) {
            return response.status(400).render('pages/prices', { items: 0, result: "Nie udało się dodać ceny" })

        }
        return response.status(201).render('pages/prices', { items: results.rows, result: "Cena została dodana" })
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

module.exports = {
    getPrices,
    createPrice,
    deletePrice
}