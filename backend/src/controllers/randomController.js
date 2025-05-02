import { frasesModel } from '../models/frasesModel.js';

export const getFraseRandom = async (req, res) => {
  try {
    const frasesRandom = await frasesModel.aggregate([
      { $sample: { size: 1 } },
    ]);

    if (frasesRandom.length === 0) {
      return res.status(404).json({ message: 'No phrases found' });
    }

    const fraseId = frasesRandom[0]._id;

    const frase = await frasesModel
      .findById(fraseId)
      .populate('usuarioId', 'name username avatar')
      .populate({
        path: 'comentarios',
        populate: {
          path: 'usuarioId',
          select: 'name username avatar',
        },
      });

    if (!frase) {
      return res.status(404).json({ message: 'Phrase not found' });
    }

    res.status(200).json(frase);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while retrieving the random phrase',
    });
  }
};
