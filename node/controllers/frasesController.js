import frasesModel from '../models/frasesModel.js';

//** metodos para el CRUD */

//** Mostrar todos los registros */
export const getAllFrases = async (req, res) => {
	try {
		const frases = await frasesModel.findAll({
			order: [['id', 'DESC']],
		});
		res.json(frases);
	} catch (error) {
		res.json({ message: error.message });
	}
};

//** Mostrar un registro por ID */
export const getFrase = async (req, res) => {
	try {
		const frase = await frasesModel.findAll({
			where: {
				id: req.params.id,
			},
		});
		res.json(frase[0]);
	} catch (error) {
		res.json({ message: error.message });
	}
};

//** Crear un registro */
export const createFrase = async (req, res) => {
	try {
		await frasesModel.create(req.body);
		res.json({ message: '¡Registro creado correctamente!' });
	} catch (error) {
		res.json({ message: error.message });
	}
};

//** Actualizar un registro */
export const updateFrase = async (req, res) => {
	try {
		await frasesModel.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		res.json({ message: '¡Registro actualizado correctamente!' });
	} catch (error) {
		res.json({ message: error.message });
	}
};

//** Eliminar un registro */
export const deleteFrase = async (req, res) => {
	try {
		await frasesModel.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.json({ message: '¡Registro eliminado correctamente!' });
	} catch (error) {
		res.json({ message: error.message });
	}
};
