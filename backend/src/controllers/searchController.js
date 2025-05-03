import { frasesModel } from '../models/frasesModel.js';

export const getSearch = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Search query cannot be empty' });
    }

    const results = await frasesModel
      .find({
        $or: [
          { frase: { $regex: query, $options: 'i' } },
          { autor: { $regex: query, $options: 'i' } },
        ],
      })
      .select('_id');

    if (results.length === 0) {
      return res.status(404).json({ message: 'No results found' });
    }

    const fraseIds = results.map((frase) => frase._id);

    const frasesCompletas = await frasesModel
      .find({ _id: { $in: fraseIds } })
      .populate('usuarioId', 'name username avatar')
      .populate({
        path: 'comentarios',
        populate: {
          path: 'usuarioId',
          select: 'name username avatar',
        },
      });

    res.status(200).json(frasesCompletas);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while searching for phrases',
    });
  }
};
