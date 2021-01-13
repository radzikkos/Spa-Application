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
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/items', db.getItems)
app.get('/prices', db.getPrices)
app.get('/rooms', db.getRooms)
app.get('/seances', db.getSeances)
app.get('/itemUsedInSeance', db.getItemUsedInSeance)
app.get('/salaries', db.getSalaries)
app.get('/employees', db.getEmployees)
app.get('/employees/:id', db.getEmployeeById)
app.get('/courses', db.getCourses)
app.get('/courses/:name', db.getCourseByName)
app.get('/coursesAndSeances', db.getCoursesAndSeances)
app.get('/coursesAndSeances/:name', db.getCourseAndSeancesByCourseName)

app.post('/items', db.createItem)
app.post('/prices', db.createPrice)
app.post('/rooms', db.createRoom)
app.post('/seances', db.createSeance)
app.post('/itemUsedInSeance', db.createItemUsedInSeance)
app.post('/salaries', db.createSalary)
app.post('/employees', db.createEmployee)
app.post('/courses', db.createCourse)
app.post('/coursesAndSeances', db.createCourseAndSeance)


app.put('/items/:name', db.updateItem)
app.put('/seances/:type', db.updateSeance)
app.put('/itemUsedInSeance/:seance_name/:item_name', db.updateItemUsedInSeance)
app.put('/salaries/:previous_salary', db.updateSalary)
app.put('/employees/:name/:surname/:workstand/:salary', db.updateEmployee)
app.put('/courses/:name', db.updateCourse)

app.delete('/items/:name', db.deleteItem)
app.delete('/prices/:price', db.deletePrice)
app.delete('/rooms/:nr', db.deleteRoom)
app.delete('/seances/:type', db.deleteSeance)
app.delete('/itemUsedInSeance/:seance_name/:item_name', db.deleteItemUsedInSeance)
app.delete('/salaries/:salary', db.deleteSalary)
app.delete('/employees/:name/:surname/:workstand/:salary', db.deleteEmployee)
app.delete('/courses/:name', db.deleteCourse)


app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: 'Endpoint Not found'
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})