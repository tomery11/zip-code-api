const express = require('express')
// const MongoClient = require('mongodb')
const bodyParser = require('body-parser')
// const db = require('./config/db')
const app = express();
// const mongoose = require('mongoose');
// require('dotenv/config')
app.use(bodyParser.json());

//import routes

const zipcodeRoute = require('./app/routes/zipcode')
//middleware
// app.use('/posts', postsRoute)
app.use('/', zipcodeRoute)

//import Models
// const Zipcode = require('./app/models/Zipcode');



// app.get('/', ( (req, res) => {
//     res.send('We are on home')
// }))

const port = 8080;

// //connect to DB
// mongoose.connect(process.env.DB_CONNECTION, () => {
//     console.log('connected to db')
// })




app.listen(port, () =>{
    console.log("We are live on: localhost:" + port)
})


