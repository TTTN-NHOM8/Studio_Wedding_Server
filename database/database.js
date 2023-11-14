const mysql = require('mysql')
const conlection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "studio_wedding",
    port: 3306
})

conlection.connect(err => {
    if (err) throw err
    console.log("Database is connect")
})

module.exports = conlection