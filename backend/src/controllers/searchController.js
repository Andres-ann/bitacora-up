import { frasesModel } from '../models/frasesModel.js';

// Método de búsqueda en la colección
export const getSearch = async (req, res) => {
  try {
    const { query } = req.query;
    const results = await frasesModel.find({
      $or: [
        { frase: { $regex: query, $options: 'i' } },
        { autor: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
