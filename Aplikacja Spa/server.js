require('dotenv').config({ path: '.env' })

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT

/*Tell Express that EJS is used */
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.raw());
app.use(express.static("public"));

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
var clientsAndCourses = require('./routes/clientAndCourseRouter')
var raportsRouter = require('./routes/raportRouter')

app.get('/', (req, res) => {
    res.render('pages/index')
})
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
app.use('/clientsAndCourses', clientsAndCourses)
app.use('/raports', raportsRouter)

app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: 'Endpoint Not found'
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})