const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

/*Tell Express that EJS is used */
app.set('view engine', 'ejs')

// app.use(express.json())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.raw());
app.use(express.static("public"));


app.get('/', (req, res) => {
    //res.json({ info: 'Node.js, Express, and Postgres API' })
    //res.sendFile(__dirname + '/template/index.html')
    res.render('pages/index')
})

var itemsRouter = require('./routes/itemRouter')
var pricesRouter = require('./routes/priceRouter')
var roomsRouter = require('./routes/roomRouter')
var seancesRouter = require('./routes/seanceRouter')
var itemsUsedInSeance = require('./routes/itemUsedInSeanceRouter')
var salariesRouter = require('./routes/salaryRouter')
var employeesRouter = require('./routes/employeeRouter')
var coursesRouter = require('./routes/courseRouter')
var coursesAndSeancesRouter = require('./routes/courseAndSeanceRouter')
var dataRouter = require('./routes/dataRouter')
var clientsRouter = require('./routes/clientRouter')

app.use('/items', itemsRouter)
app.use('/prices', pricesRouter)
app.use('/rooms', roomsRouter)
app.use('/seances', seancesRouter)
app.use('/itemUsedInSeance', itemsUsedInSeance)
app.use('/salaries', salariesRouter)
app.use('/employees', employeesRouter)
app.use('/courses', coursesRouter)
app.use('/coursesAndSeances', coursesAndSeancesRouter)
app.use('/data', dataRouter)
app.use('/clients', clientsRouter)

//app.get('/items', db.getItems)
//app.get('/prices', db.getPrices)
// app.get('/rooms', db.getRooms)
// app.get('/seances', db.getSeances)
// app.get('/seances/:name', db.getSeanceByName)
// app.get('/itemUsedInSeance', db.getItemUsedInSeance)
// app.get('/salaries', db.getSalaries)
// app.get('/employees', db.getEmployees)
// app.get('/employees/:id', db.getEmployeeById) /*Poprawic */ /*Zobaczymy czy bedzie potrzeba */
// app.get('/courses', db.getCourses)
// app.get('/courses/:name', db.getCourseByName)
// app.get('/coursesAndSeances', db.getCoursesAndSeances)
// app.get('/coursesAndSeances/:name', db.getCourseAndSeancesByCourseName)
// app.get('/data', db.getData)
// app.get('/data/:id', db.getDataByData) /*Wypisanie klientow w danym dniu */
// app.get('/clients', db.getClients)
// app.get('/clients/:id', db.getClientByNameAndSurname)

/*Dopisać raport wszystkich klientów i kursów wraz z datami */
app.get('/clientsAndCourses', db.getClientsAndCourses)

// app.get('/seanceEmployees/:name', db.getSeanceEmployees)


// app.post('/items', db.createItem)
//app.post('/prices', db.createPrice)
// app.post('/rooms', db.createRoom)
// app.post('/seances', db.createSeance)
// app.post('/itemUsedInSeance', db.createItemUsedInSeance)
// app.post('/salaries', db.createSalary)
// app.post('/employees', db.createEmployee)
// app.post('/courses', db.createCourse)
// app.post('/coursesAndSeances', db.createCourseAndSeance)
// app.post('/data', db.createData)
// app.post('/clients', db.createClient)
app.post('/clientsAndCourses', db.createClientAndCourse)


// app.put('/items/:name', db.updateItem)
// app.put('/seances/:type', db.updateSeance)
// app.put('/itemUsedInSeance/:seance_name/:item_name', db.updateItemUsedInSeance)
// app.put('/salaries/:previous_salary', db.updateSalary)
// app.put('/employees/:id', db.updateEmployee)
// app.put('/courses/:name', db.updateCourse)
// app.put('/coursesAndSeances/:course_name/:seance_name', db.updateCourseAndSeance)
app.put('/clientsAndCourses/:name/:surname/:data', db.updateClientAndCourse)

// app.delete('/items/:name', db.deleteItem)
// app.delete('/prices/:price', db.deletePrice)
// app.delete('/rooms/:nr', db.deleteRoom)
// app.delete('/seances/:type', db.deleteSeance)
// app.delete('/itemUsedInSeance/:seance_name/:item_name', db.deleteItemUsedInSeance)
// app.delete('/salaries/:salary', db.deleteSalary)
// app.delete('/employees/:id', db.deleteEmployee)
// app.delete('/courses/:name', db.deleteCourse)
// app.delete('/coursesAndSeances/:course_name/:seance_name', db.deleteCourseAndSeance)
// app.delete('/data/:data', db.deleteData)
// app.delete('/clients/:id', db.deleteClient)
app.delete('/clientsAndCourses/:name/:surname/:data', db.deleteClientAndCourse)


app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: 'Endpoint Not found'
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})