const Pool = require('pg').Pool
const pool = new Pool({
        user: 'ibwbksua',
        host: 'ziggy.db.elephantsql.com',
        database: 'ibwbksua',
        password: 'lyyCPZGsY_DRtnOYdRY8RdvbwxHf175w',
    })
    /**Poprawic trigger dla klient-kurs, by odejmowal ilosc rzeczy */
    /*Napisac get sb by ID */
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

    pool.query('UPDATE rzecz SET cena_id = zwroc_id_ceny($1), ilosc = (ilosc + $2) WHERE nazwa = $3', [price, amount, name], (error, results) => {
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
    //pool.query('SELECT * from seans', (error, results) => {
    pool.query('SELECT * from widok_seansu', (error, results) => {
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

/**
 * CRUD for item used in seance -associate table
 */
const getItemUsedInSeance = (request, response) => {
    pool.query('SELECT * from rzeczy_w_seansie_widok', (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wypisac rzeczy w seansie`)
        }
        response.status(200).json(results.rows)
    })
}

const createItemUsedInSeance = (request, response) => {
    const { seance_name, item_name, amount } = request.body[0]
    pool.query('INSERT INTO rzeczy_wykorzystane_do_seansu(seans_id, rzecz_id, uzyta_ilosc) VALUES (zwroc_id_seansu($1),zwroc_rzecz_id($2),$3);', [seance_name, item_name, amount], (error, results) => {
        if (error) {
            return response.status(400).send('Nie mozna dodac rzeczy to seansu')
        }
        response.status(201).send(`Rzecz do seansu zostala dodana`)
    })
}

const updateItemUsedInSeance = (request, response) => {
    const seance_name = request.params.seance_name
    const item_name = request.params.item_name
    const { amount } = request.body[0]

    pool.query('UPDATE rzeczy_wykorzystane_do_seansu SET  uzyta_ilosc = $1 WHERE seans_id = zwroc_id_seansu($2) and rzecz_id = zwroc_rzecz_id($3)', [amount, seance_name, item_name], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna zmodyfikowac rzeczy w seansie`)
        }
        response.status(200).send(`Przedmiot  w seansie zostal zmodyfikowany`)
    })
}

const deleteItemUsedInSeance = (request, response) => {
    const seance_name = request.params.seance_name
    const item_name = request.params.item_name
    pool.query('DELETE FROM rzeczy_wykorzystane_do_seansu WHERE seans_id = zwroc_id_seansu($1) and rzecz_id = zwroc_rzecz_id($2)', [seance_name, item_name], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna usunac tej rzeczy w seansie`)
        }
        response.status(200).send(`Rzecz zostala usunieta z seansu`)
    })
}

/**
 * CRUD for salaries
 */
const getSalaries = (request, response) => {
    pool.query('SELECT kwota from wynagrodzenie ORDER BY kwota DESC', (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wypisac wynagrodzenia`)
        }
        response.status(200).json(results.rows)
    })
}
const createSalary = (request, response) => {
    const { salary } = request.body[0]
    pool.query('INSERT INTO wynagrodzenie(kwota) VALUES ($1)', [salary], (error, results) => {
        if (error) {
            return response.status(400).send('Nie mozna dodac tego wynagrodzenia')
        }
        response.status(201).send(`Wynagrodzenie zostalo dodane`)
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
    /*----------------------------------------------------------------------------------- */
    /**
     * CRUD for employees
     */
const getEmployees = (request, response) => {
    pool.query('SELECT * from pracownik_wynagrodzenie ORDER BY stanowisko', (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wypisac wynagrodzenia`)
        }
        response.status(200).json(results.rows)
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
    const { seance_name, salary, name, surname, workstand } = request.body[0]
    pool.query('INSERT INTO pracownik(seans_id, wynagrodzenie_id, imie, nazwisko, stanowisko) VALUES (zwroc_id_seansu($1), zwroc_wynagrodzenie_id($2),$3, $4, $5);', [seance_name, salary, name, surname, workstand], (error, results) => {
        if (error) {
            return response.status(400).send('Nie mozna dodac tego pracownika')
        }
        response.status(201).send(`Pracownik dodany`)
    })
}

/**Mozna zmienci mu tylko wyplate - jebac */
const updateEmployee = (request, response) => {
    const name = request.params.name
    const surname = request.params.surname
    const workstand = request.params.workstand
    const salary = parseInt(request.params.salary)
    const new_salary = request.body[0]['new_salary']

    pool.query('UPDATE pracownik set wynagrodzenie_id = zwroc_wynagrodzenie_id($5) where pracownik_id = (zwroc_id_pracownika($1, $2, $3, $4))', [name, surname, workstand, salary, new_salary], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna zmodyfikowac pracownika`)
        }
        response.status(200).send(`Wynagrodzenie pracownika zmienione`)
    })
}

const deleteEmployee = (request, response) => {
    const name = request.params.name
    const surname = request.params.surname
    const workstand = request.params.workstand
    const salary = parseInt(request.params.salary)
    pool.query('DELETE FROM pracownik WHERE pracownik_id = zwroc_id_pracownika($1, $2, $3, $4)', [name, surname, workstand, salary], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna usunac tego pracownika`)
        }
        response.status(200).send(`Pracownik usuniety`)
    })
}

/**
 * CRUD for courses
 */
const getCourses = (request, response) => {
    pool.query('SELECT * from kurs_widok', (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wypisac wynagrodzenia`)
        }
        response.status(200).json(results.rows)
    })
}

const getCourseByName = (request, response) => {
    const name = request.params.name

    pool.query('SELECT * from kurs_widok where nazwa = $1 ', [name], (error, results) => {
        if (error) {
            return response.status(400).send(`Nie mozna wyszukac kursu`)
        } else {
            response.status(200).json(results.rows)
        }

    })
}

const createCourse = (request, response) => {
    const { name, level } = request.body[0]
    pool.query('INSERT INTO kurs(nazwa, poziom_luksusu) VALUES ($1, $2)', [name, level], (error, results) => {
        if (error) {
            return response.status(400).send('Nie mozna dodac tego kursu')
        }
        response.status(201).send(`Kurs dodany`)
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

/*
CRUD for course and seance - associate table
 */
const getCoursesAndSeances = (request, response) => {
    pool.query('SELECT * from kurs_seans_widok', (error, results) => {
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
    const { course_name, seance_name, name, surname, workstand, salary } = request.body[0]
    pool.query('INSERT INTO kurs_seans(kurs_id, seans_id, pracownik_id) VALUES (zwroc_kurs_id($1),zwroc_id_seansu($2),zwroc_id_pracownika($3, $4, $5,$6));', [course_name, seance_name, name, surname, workstand, salary], (error, results) => {
        if (error) {
            return response.status(400).send('Nie mozna dodac tego seansu do kursu')
        }
        response.status(201).send(`Seansu do kursu dodany`)
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

    /*ItemUsedInSeance */
    getItemUsedInSeance,
    createItemUsedInSeance,
    updateItemUsedInSeance,
    deleteItemUsedInSeance,

    /*Salaries */
    getSalaries,
    createSalary,
    updateSalary,
    deleteSalary,

    /*Employees */
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,

    /*Course */
    getCourses,
    getCourseByName,
    createCourse,
    updateCourse,
    deleteCourse,

    /*CoursesAndSeances */
    getCoursesAndSeances,
    getCourseAndSeancesByCourseName,
    createCourseAndSeance,

}