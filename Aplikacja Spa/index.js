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

app.post('/items', db.createItem)
app.post('/prices', db.createPrice)
app.post('/rooms', db.createRoom)
app.post('/seances', db.createSeance)

app.put('/items/:name', db.updateItem)
app.put('/seances/:type', db.updateSeance)

app.delete('/items/:name', db.deleteItem)
app.delete('/prices/:price', db.deletePrice)
app.delete('/rooms/:nr', db.deleteRoom)
app.delete('/seances/:type', db.deleteSeance)

app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: 'Endpoint Not found'
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})