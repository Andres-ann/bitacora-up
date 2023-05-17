import { frasesModel } from '../models/frasesModel.js';

// Método de búsqueda en la colección
export const getQuery = async (req, res) => {
	try {
		const { query } = req.query;
		const results = await frasesModel.find({ $text: { $search: query } });

		res.status(200).json(results);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
