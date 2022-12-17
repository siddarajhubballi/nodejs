const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bills"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

//run once
// con.query("CREATE TABLE bill(username varchar(255), accno int, address varchar(255), status integer, units integer, price integer);", function (err, result) {
//     if (err) throw err;
//     console.log("bill created");
//  });
});

const createBills = () => {
    con.query("INSERT INTO bill VALUES ('prajwal', 1001, 'BVB backgate hostel, vidyanagar', 0, 200, 2000);");
    con.query("INSERT INTO bill VALUES ('vishal', 1002, 'Hanuman temple, old bustand', 0, 400, 1500);");
    con.query("INSERT INTO bill VALUES ('anirudhr', 1003, 'Unkal lake, unkal', 0, 300, 1200);");
    con.query("INSERT INTO bill VALUES ('manvanth', 1004, 'arts college, vidyanagar', 0, 600, 700);");
    con.query("INSERT INTO bill VALUES ('amith', 1005, 'post office, navanagar', 0, 900, 800);");
    con.query("INSERT INTO bill VALUES ('vinayak', 1006, 'gajendragad, gadag', 0, 1000, 1000);");
    con.query("commit;");
}

createBills();