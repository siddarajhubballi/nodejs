const express = require('express');
const mysql = require('mysql');
const { urlencoded } = require('express');
const { parseFlagList } = require('mysql/lib/ConnectionConfig');
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bills"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

var allBills;

const getBill = () => {
    con.query("SELECT * FROM bill", (err, res) => {
        if (err) throw err;
        setUsers(res);
    })
}

function setBill(rows) {
    allBills = rows;
}



app.get("/user", (req, res) => {
    res.render('user');
});

app.get("/operator", (req, res) => {
    res.render('operator');
});

app.post("/operatorSuccess",(req, res) => {
    console.log(req.body);
    let username = req.body.username;
    let accno = parseInt(req.body.accno);
    let address= req.body.address;
    let status = 0;
    let units = parseFloat(req.body.units);
    let price = 4*units; 
    let queryString = "INSERT INTO bill VALUES (";
    queryString = queryString + "'" + username + "',";
    queryString = queryString + accno + ",";
    queryString = queryString + "'" + address + "',";
    queryString = queryString + status + ",";
    queryString = queryString + units + ",";
    queryString = queryString + price;
    queryString = queryString + ');';
    con.query(queryString);
    res.render("operatorSuccess", {username, accno, address, status, units, price});
});

app.post("/userSuccess" , (req, res) => {
    console.log(req.body);
    let username = req.body.username;
    let queryString = "UPDATE bill SET status=1 WHERE username='" + username + "';";
    console.log(queryString);
    con.query(queryString);
    res.render("userSuccess", {username});
});

app.get("/", (req, res) => {
    console.log("On home page")
    res.render("home");
});

app.listen(3000, ()=> {
    console.log("listening on port 3000");
});

