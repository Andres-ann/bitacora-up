const conexion = require("../database/db");

//Guardar registro
exports.save = (req, res) => {
	const frase = req.body.frase;
	const autor = req.body.autor;
	conexion.query("INSERT INTO frases SET ?", { frase: frase, autor: autor }, (err, result) => {
		if (err) {
			console.error(err);
		} else {
			res.redirect("/");
		}
	});
};

//Actualizar registro
exports.update = (req, res) => {
	const id = req.body.id;
	const frase = req.body.frase;
	const autor = req.body.autor;
	conexion.query(
		"UPDATE frases SET ? WHERE id = ?",
		[{ frase: frase, autor: autor }, id],
		(err, result) => {
			if (err) {
				console.error(err);
			} else {
				res.redirect("/");
			}
		}
	);
};

//Sumar Likes
exports.updateLikes = (req, res) => {
	const id = req.body.id;
	const likes = req.body.likes;
	conexion.query("UPDATE frases SET ? WHERE id = ?", [{ likes: likes }, id], (err, result) => {
		if (err) {
			console.error(err);
		} else {
			res.redirect("/random");
		}
	});
};
