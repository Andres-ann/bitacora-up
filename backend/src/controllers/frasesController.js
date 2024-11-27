import { frasesModel } from '../models/frasesModel.js';

// Mostrar todas las frases con paginación
export const getAllFrases = async (req, res) => {
  const { page = 1, limit = 25 } = req.query;
  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
    };

    const frases = await frasesModel.paginate({}, options);

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
    const frase = await frasesModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
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
