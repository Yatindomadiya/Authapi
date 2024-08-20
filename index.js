const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const port = process.env.SERVER_PORT | 3000;
const mongodb = process.env.MONGODB_URL
const authRoute = require('./routes/authroute')
const adminRoute = require('./routes/adminRoute')
const commonRoute = require('./routes/commonRoute')
const app = express()

app.use(express.json())

app.use(express.static('public'))


mongoose.connect(mongodb).then(() => {
    console.log('database connected');
})
    .catch((err) => {
        console.log(err);
    })


app.use('/api', authRoute)
app.use('/api/admin', adminRoute)
app.use('/api', commonRoute)


app.listen(port, () => {
    console.log('server started');
})           