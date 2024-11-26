import { frasesModel } from '../models/frasesModel.js';

//Devuelve una frase al azar
export const getFraseRandom = async (req, res) => {
  try {
    const fraserandom = await frasesModel.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json(fraserandom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
