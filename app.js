require('dotenv').config()
const {DBConnection} = require('./src/services/mongoose')
const userRoutes = require('./src/routes/routesuser')

const path = require("path")
const {engine} = require("express-handlebars")
const express = require('express')
const cors = require('cors')
const { clearScreenDown } = require('readline')

const app = express()
const port = process.env.PORT

DBConnection().catch(err => console.log(err))

app.engine('handlebars', engine()) 
app.set('view engine', 'handlebars')
app.use(express.json()) 
app.use(express.urlencoded({ extended: false }))                                         
app.use(userRoutes)

app.post('/authenticate', async (req, res)=>{
    const {username} = req.body
    return res.json({username: username, secret: "sha256..."})
})

app.listen(port, () => {
    console.log(`Server launched at http://localhost:${port}`) 
})