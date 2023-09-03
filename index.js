const express = require('express')
const bodyParser = require("body-parser")
const mysql = require("mysql")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");

const app = express();
const port = 4000
const salt = 10;

const mongodb_URL = "mongodb+srv://lazada:lazada@cluster0.t3zabpy.mongodb.net/?retryWrites=true&w=majority"

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
// app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());

//create a connection to mongodb
mongoose.connect(mongodb_URL);
mongoose.connection.once("open", () => console.log("Mongodb Connected!")).on("error", (err) => console.log("ERROR: " + err))

//Connect to mysql
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lazada",
});
 
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "You are not authenticated!"})
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not ok"})
            } else {
                req.name = decoded.name;
                req.role = decoded.role;
                next();
            }
        })      
    }
}

//Routing
app.get("/", verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name, role: req.role});
})

app.post("/register", (req, res) => {
    const sql = "INSERT INTO user (`name`, `role`, `email`, `password`) VALUES (?)";

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error for hashing password!"});

        const values = [
            req.body.name,
            req.body.role,
            req.body.email,
            hash
        ]
    
        connection.query(sql, [values], (error, result) => {
            if(error) return res.json({Error: "Failed to insert data to server"});
            return res.json({Status: "Success"})
        })
    })
})

app.post("/login", (req, res) => {
    const sql = "SELECT * FROM user WHERE email = ?";

    const values = [
        req.body.email,
        req.body.password
    ]
    connection.query(sql, [req.body.email], (err, data) => {
        if(err) return res.json({Error: "Failed to login to system"});
        if(data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: "Password compare error"})
                if(response) {
                    const name = data[0].name;
                    const role = data[0].role;
                    const token = jwt.sign({name, role}, "jwt-secret-key", {expiresIn: '1d'})
                    res.cookie('token', token);

                    return res.json({Status: "Success"})
                } else {
                    return res.json({Error: "Password not matched"})
                }
            })
        } else {
            return res.json({Error: "No email existed"})
        }
    })
})

app.get("/logout", (req, res) => {
    res.clearCookie('token')
    return res.json({Status: "Success"})
})

app.listen(port, () => {
    console.log(`Listen to the port ${port}`)
})