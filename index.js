const express = require('express')
const bodyParser = require("body-parser")
const mysql = require("mysql")

const app = express();
const port = 4000

//Connect to mysql
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "company",
});

connection.connect((err) => {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    connection.end((err) => {
        if (err) {
            console.error("error connecting: " + err.stack);
            return;
        }
            console.log("Finished");
    });
});

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

//Routing
app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`Listen to the port ${port}`)
})