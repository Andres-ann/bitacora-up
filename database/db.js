const mysql = require("mysql");

const conexion = mysql.createConnection({
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_DATABASE || "bd_bitacora_up",
});

conexion.connect((error) => {
	if (error) {
		console.error(`El error es: ${error}`);
	}
	console.log("connected to database MySql");
});

module.exports = conexion;
