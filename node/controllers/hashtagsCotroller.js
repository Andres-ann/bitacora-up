import hashtagsModel from '../models/hashtagsModel';

//** metodos para el CRUD */

//** Mostrar todos los registros */
export const getAllHashtags = async (req, res) => {
	try {
		const hashtags = await hashtagsModel.findAll({
			order: [['id', 'ASC']],
		});
		res.json(hashtags);
	} catch (error) {
		res.json({ message: error.message });
	}
};

//** Mostrar un registro por ID */
export const getHashtag = async (req, res) => {
	try {
		const hashtag = await hashtagsModel.findAll({
			where: {
				id: req.params.id,
			},
		});
		res.json(hashtag[0]);
	} catch (error) {
		res.json({ message: error.message });
	}
};

//** Crear un registro */
export const createHashtag = async (req, res) => {
	try {
		await hashtagsModel.create(req.body);
		res.json({ message: '¡Registro creado correctamente!' });
	} catch (error) {
		res.json({ message: error.message });
	}
};

//** Actualizar un registro */
export const updateHashtag = async (req, res) => {
	try {
		await hashtagsModel.update(req.body, {
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
export const deleteHashtag = async (req, res) => {
	try {
		await hashtagsModel.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.json({ message: '¡Registro eliminado correctamente!' });
	} catch (error) {
		res.json({ message: error.message });
	}
};
