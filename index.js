const express = require('express');
const morgan = require("morgan");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors =require('cors');

const app = express();

//bodyparser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//Middleware
app.use(morgan('dev'));

//router
const router1 = require('./SchemaRoutes/StudentRouter');
app.use('/',router1);

const router2 = require('./SchemaRoutes/AttendanceRouter');
app.use('/Attendance',router2);
//LocalHost
const port = process.env.port || 4000;

app.listen(port, () => console.log(`server started on port ${port}`));

//DB Server Creation 
mongoose
    .connect('mongodb+srv://mohanraj:5683263464@mern-app-ilfch.mongodb.net/Attendance-System?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongo Connected...'))
    .catch(err => console.log(err)); 