const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')


// app.use(express.json())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.raw());


app.get('/', (req, res) => {
    //res.json({ info: 'Node.js, Express, and Postgres API' })
    res.sendFile(__dirname + '/template/index.html')
})

app.get('/items', db.getItems)
app.get('/prices', db.getPrices)
app.get('/rooms', db.getRooms)
app.get('/seances', db.getSeances)
app.get('/seances/:name', db.getSeanceByName)
app.get('/itemUsedInSeance', db.getItemUsedInSeance)
app.get('/salaries', db.getSalaries)
app.get('/employees', db.getEmployees)
app.get('/employees/:id', db.getEmployeeById) /*Poprawic */ /*Zobaczymy czy bedzie potrzeba */
app.get('/courses', db.getCourses)
app.get('/courses/:name', db.getCourseByName)
app.get('/coursesAndSeances', db.getCoursesAndSeances)
app.get('/coursesAndSeances/:name', db.getCourseAndSeancesByCourseName)
app.get('/data', db.getData)
app.get('/data/:data', db.getDataByData) /*Wypisanie klientow w danym dniu */
app.get('/clients', db.getClients)
app.get('/clients/:name/:surname', db.getClientByNameAndSurname)
app.get('/clientsAndCourses', db.getClientsAndCourses)

app.get('/seanceEmployees/:name', db.getSeanceEmployees)
app.get('/employeesWorkTime', db.getEmployeesWorkTime)

app.post('/items', db.createItem)
app.post('/prices', db.createPrice)
app.post('/rooms', db.createRoom)
app.post('/seances', db.createSeance)
app.post('/itemUsedInSeance', db.createItemUsedInSeance)
app.post('/salaries', db.createSalary)
app.post('/employees', db.createEmployee)
app.post('/courses', db.createCourse)
app.post('/coursesAndSeances', db.createCourseAndSeance)
app.post('/clients', db.createClient)
app.post('/clientsAndCourses', db.createClientAndCourse)


app.put('/items/:name', db.updateItem)
app.put('/seances/:type', db.updateSeance)
app.put('/itemUsedInSeance/:seance_name/:item_name', db.updateItemUsedInSeance)
app.put('/salaries/:previous_salary', db.updateSalary)
app.put('/employees/:name/:surname/:workstand/:salary', db.updateEmployee)
app.put('/courses/:name', db.updateCourse)
app.put('/coursesAndSeances/:course_name/:seance_name', db.updateCourseAndSeance)
app.put('/clientsAndCourses/:name/:surname/:data', db.updateClientAndCourse)

app.delete('/items/:name', db.deleteItem)
app.delete('/prices/:price', db.deletePrice)
app.delete('/rooms/:nr', db.deleteRoom)
app.delete('/seances/:type', db.deleteSeance)
app.delete('/itemUsedInSeance/:seance_name/:item_name', db.deleteItemUsedInSeance)
app.delete('/salaries/:salary', db.deleteSalary)
app.delete('/employees/:name/:surname/:workstand/:salary', db.deleteEmployee)
app.delete('/courses/:name', db.deleteCourse)
app.delete('/coursesAndSeances/:course_name/:seance_name', db.deleteCourseAndSeance)
app.delete('/data/:data', db.deleteData)
app.delete('/clients/:name/:surname', db.deleteClient)
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