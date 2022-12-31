const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

app.use(cors())

mongoose.set('strictQuery', false);

require('dotenv').config()

const dbConfig = require('./config/dbConfig')

const port = process.env.port || 7090;

app.use(express.json())

const usersRoute = require('./routes/usersRoute');
const busesRoute = require('./routes/busesRoute');
const bookingsRoute = require('./routes/bookingsRoute');

app.use('/api/users', usersRoute);
app.use('/api/buses', busesRoute);
app.use('/api/bookings',bookingsRoute);


app.listen(port,() => {
    console.log(`server is running on port number ${port}`);
})