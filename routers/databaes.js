const mysql = require('mysql')
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    port: '3306',
    database:'jd'
})

module.exports = pool