import { frasesModel } from '../models/frasesModel.js';

export const getSearch = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Search query cannot be empty' });
    }

    const results = await frasesModel.find({
      $or: [
        { frase: { $regex: query, $options: 'i' } },
        { autor: { $regex: query, $options: 'i' } },
      ],
    });

    if (results.length === 0) {
      return res.status(404).json({ message: 'No results found' });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'An error occurred while searching for phrases' });
  }
};
