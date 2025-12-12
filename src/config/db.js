const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Niz@r1Pass!',
    database:'attendance_db'
})

connection.connect(error => {
    if(error) {
        console.log("DB Error: ", error)
    }else {
        console.log("Database Connected..!")
    }
});

module.exports = connection;