const path = require("path");
const mongoose = require('mongoose');
const express = require('express');
const server = express();
const dotenv=require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const webhook = require('./routes/webhook');
const auth = require('./routes/auth');
//const appointment=require('./routes/appointment')
const cors=require('cors');

server.use(cors({exposedHeaders:["Autorization"]}));
mongoose.connect(process.env.MONGO_URI,
    {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>console.log("db connected"));
mongoose.connection.on('error',err=>{
    console.log(`db connection error:${err.message}`)
});
mongoose.set('useFindAndModify', false);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

  server.use('/', webhook);
  server.use('/',auth);
  //server.use('/',appointment);

  let port = 1234;
server.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});


