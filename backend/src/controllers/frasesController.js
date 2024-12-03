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
    const { frase, autor } = req.body;

    // Crear la frase asociándola al usuario autenticado
    const nuevaFrase = await frasesModel.create({
      frase,
      autor,
      usuarioId: req.user.id, // Usuario autenticado
    });

    res.status(201).json({
      message: 'Frase creada exitosamente',
      frase: nuevaFrase,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Actualizar una frase
export const updateFrase = async (req, res) => {
  try {
    const { id } = req.params;
    const userIdFromToken = req.user.id;

    const frase = await frasesModel.findById(id);

    if (!frase) {
      return res.status(404).json({ error: 'Frase not found' });
    }

    if (frase.usuarioId.toString() !== userIdFromToken) {
      return res.status(403).json({ error: 'Unauthorized: Not your frase' });
    }

    const updates = req.body;
    const updatedFrase = await frasesModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedFrase);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while updating the frase' });
  }
};

//Eliminar una frase
export const deleteFrase = async (req, res) => {
  try {
    const { id } = req.params; // ID de la frase a eliminar
    const userIdFromToken = req.user.id; // ID del usuario autenticado

    // Buscar la frase
    const frase = await frasesModel.findById(id);

    if (!frase) {
      return res.status(404).json({ error: 'Object not found' });
    }

    if (frase.usuarioId.toString() !== userIdFromToken) {
      return res.status(403).json({ error: 'Unauthorized: Not your frase' });
    }

    // Eliminar la frase
    await frasesModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'Frase deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the frase' });
  }
};

// Crear un comentario
export const addComements = async (req, res) => {
  const { id } = req.params;
  const { comentario, gif } = req.body;

  try {
    const frase = await frasesModel.findById(id);

    if (!frase) {
      return res.status(404).json({ message: 'Frase not found' });
    }

    const nuevoComentario = {
      comentario,
      usuarioId: req.user.id,
      gif,
      createdAt: new Date(),
    };

    frase.comentarios.push(nuevoComentario);
    await frase.save();

    res.status(201).json({
      message: 'Comment added successfully',
      comentario: nuevoComentario,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred while adding the comment.' });
  }
};
