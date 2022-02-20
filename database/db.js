const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_bitacora_up'
});

conexion.connect((error) => {
    if (error) {
        console.error(`El error es: ${error}`);
    }
    console.log('connected to database MySql!')
})

module.exports = conexion;