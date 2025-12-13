const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:process.env.DB_PASS || '7890',
    database:'attendence_db'
})

connection.connect(error => {
    if(error) {
        console.log("DB Error: ", error)
    }else {
        console.log("Database Connected..!")
    }
});

module.exports = connection;