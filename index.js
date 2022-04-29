const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Use Middleware:
app.use(cors());
app.use(express.json());

// MongoDb Connection:
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ph-5.b3v7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
        try {
                await client.connect()
                const courseCollection = client.db("Quran-Care").collection("services");

                // Get All Courses:
                app.get('/courses', async (req, res) => {
                        const query = {};
                        const findAllCourse = courseCollection.find(query);
                        const allCourse = await findAllCourse.toArray();
                        res.send(allCourse);
                })

                // Get Single Course:
                app.get('/course/:id', async (req, res) => {
                        const id = req.params.id;
                        const query = { id: +id };
                        const course = await courseCollection.findOne(query);
                        res.send(course);
                })

                // Add New Course:
                app.post('/courses', async (req, res) => {
                        const newCourse = req.body;
                        const course = await courseCollection.insertOne(newCourse);
                        res.send(course);
                })
        }
        finally {

        }
}
run().catch(console.dir);

// Get From Root Path:
app.get('/', function (req, res) {
        res.send("Welcome to Quran Care Backend!");
})


// Listening from Server:
app.listen(port, () => {
        console.log("Hello Quran Care!");
})
