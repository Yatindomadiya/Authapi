const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const port = process.env.SERVER_PORT | 3000;
const mongodb = process.env.MONGODB_URL
const router = require('./routes/authroute')

const app = express()

app.use(express.json())

app.use(express.static('public'))


mongoose.connect(mongodb).then(() => {
    console.log('database connected');
})
    .catch((err) => {
        console.log(err);
    })


app.use('/api', router)


app.listen(port, () => {
    console.log('server started');
})   