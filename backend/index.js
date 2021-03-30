const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');
const routes = require("./routes/index.js");
const axios = require('axios');
const cors = require('cors');

// Dotenv will be used for accessing the environment variables
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

//connect to MongoDB
connectDB();

app.use('/', routes);

app.listen(PORT, ()=> {
    console.log("Server is listening on port: ", PORT)
})
