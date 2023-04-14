import { frasesModel } from '../models/frasesModel.js';

//metodos para el CRUD

//Mostrar todas las frases
export const getAllFrases = async (req, res) => {
	try {
		const frases = await frasesModel.find();
		res.status(200).json(frases);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//Mostrar una frase por id
export const getFrase = async (req, res) => {
	try {
		const { id } = req.params;
		const frase = await frasesModel.findById(id);
		if (!frase) {
			return res.status(404).json(`Item with ID: ${id} not found`);
		}
		res.status(200).json(frase);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//Crear una frase
export const createFrase = async (req, res) => {
	try {
		const frase = await frasesModel.create(req.body);
		res.status(201).json(frase);
	} catch (error) {
		res.status(500).json({ message: 'An error has ocurred.' });
	}
};

//Actualizar una frase
export const updateFrase = async (req, res) => {
	try {
		const { id } = req.params;
		const frase = await frasesModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
		res.status(200).json(frase);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//Eliminar una frase
export const deleteFrase = async (req, res) => {
	try {
		const { id } = req.params;
		const frase = await frasesModel.findByIdAndDelete(id);
		if (!frase) {
			return res.status(404).json(`Item with ID: ${id} not found`);
		}
		res.status(200).json('Item successfully deleted');
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
