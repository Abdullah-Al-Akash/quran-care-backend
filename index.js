const express = require('express');
const cors = require('cors');
require('dotenv').config;

const app = express();
const port = process.env.PORT || 5000;

// Use Middleware:
app.use(cors());
app.use(express.json());

// Get From Root Path:
app.get('/', function (req, res) {
        res.send("Welcome to Quran Care Backend!");
})


// Listening from Server:
app.listen(port, () => {
        console.log("Hello Quran Care!");
})
