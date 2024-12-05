import { frasesModel } from '../models/frasesModel.js';

export const getFraseRandom = async (req, res) => {
  try {
    const fraserandom = await frasesModel.aggregate([{ $sample: { size: 1 } }]);

    if (fraserandom.length === 0) {
      return res.status(404).json({ message: 'No phrases found' });
    }

    res.status(200).json(fraserandom[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while retrieving the random phrase',
    });
  }
};
