import { frasesModel } from '../models/frasesModel.js';
import { fraseValidationSchema } from '../validations/frasesValidation.js';

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

export const createFrase = async (req, res) => {
  try {
    const validatedData = await fraseValidationSchema.validateAsync(
      {
        ...req.body,
        usuarioId: req.user.id,
      },
      { abortEarly: false }
    );

    const nuevaFrase = await frasesModel.create(validatedData);

    res.status(201).json({
      message: 'Frase creada exitosamente',
      frase: nuevaFrase,
    });
  } catch (error) {
    if (error.isJoi) {
      return res
        .status(400)
        .json({ errors: error.details.map((detail) => detail.message) });
    }
    res.status(500).json({ error: error.message });
  }
};

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

    const validatedData = await fraseValidationSchema.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    const updatedFrase = await frasesModel.findByIdAndUpdate(
      id,
      validatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(updatedFrase);
  } catch (error) {
    if (error.isJoi) {
      return res
        .status(400)
        .json({ errors: error.details.map((detail) => detail.message) });
    }
    res
      .status(500)
      .json({ error: 'An error occurred while updating the frase' });
  }
};

export const deleteFrase = async (req, res) => {
  try {
    const { id } = req.params;
    const userIdFromToken = req.user.id;

    const frase = await frasesModel.findById(id);

    if (!frase) {
      return res.status(404).json({ error: 'Object not found' });
    }

    if (frase.usuarioId.toString() !== userIdFromToken) {
      return res.status(403).json({ error: 'Unauthorized: Not your frase' });
    }

    await frasesModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'Frase deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the frase' });
  }
};

export const addComentario = async (req, res) => {
  const { id } = req.params;
  const { comentario, gif } = req.body;

  try {
    const validatedData = await comentarioValidationSchema.validateAsync(
      { comentario, gif },
      { abortEarly: false }
    );

    const frase = await frasesModel.findById(id);

    if (!frase) {
      return res.status(404).json({ message: 'Frase not found' });
    }

    const nuevoComentario = {
      comentario: validatedData.comentario,
      usuarioId: req.user.id,
      gif: validatedData.gif,
      createdAt: new Date(),
    };

    frase.comentarios.push(nuevoComentario);
    await frase.save();

    res.status(201).json({
      message: 'Comment added successfully',
      comentario: nuevoComentario,
    });
  } catch (error) {
    if (error.isJoi) {
      return res
        .status(400)
        .json({ errors: error.details.map((detail) => detail.message) });
    }
    res
      .status(500)
      .json({ message: 'An error occurred while adding the comment.' });
  }
};

export const updateComentario = async (req, res) => {
  try {
    const { fraseId, comentarioId } = req.params;
    const { comentario, gif } = req.body;
    const userIdFromToken = req.user.id;

    const frase = await frasesModel.findById(fraseId);

    if (!frase) {
      return res.status(404).json({ error: 'Frase not found' });
    }

    const comentarioToUpdate = frase.comentarios.id(comentarioId);

    if (!comentarioToUpdate) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comentarioToUpdate.usuarioId.toString() !== userIdFromToken) {
      return res.status(403).json({ error: 'Forbidden: Not your comment' });
    }

    const validatedData = await comentarioValidationSchema.validateAsync(
      { comentario, gif },
      { abortEarly: false }
    );

    if (validatedData.comentario)
      comentarioToUpdate.comentario = validatedData.comentario;
    if (validatedData.gif) comentarioToUpdate.gif = validatedData.gif;
    comentarioToUpdate.updatedAt = new Date();

    await frase.save();

    res.status(200).json({
      message: 'Comment updated successfully',
      comentario: comentarioToUpdate,
    });
  } catch (error) {
    if (error.isJoi) {
      return res
        .status(400)
        .json({ errors: error.details.map((detail) => detail.message) });
    }
    res
      .status(500)
      .json({ error: 'An error occurred while updating the comment' });
  }
};

export const deleteComentario = async (req, res) => {
  try {
    const { fraseId, comentarioId } = req.params;
    const userIdFromToken = req.user.id;

    const frase = await frasesModel.findById(fraseId);

    if (!frase) {
      return res.status(404).json({ error: 'Frase not found' });
    }

    const comentarioToDelete = frase.comentarios.find(
      (comentario) => comentario._id.toString() === comentarioId
    );

    if (!comentarioToDelete) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comentarioToDelete.usuarioId.toString() !== userIdFromToken) {
      return res.status(403).json({ error: 'Forbidden: Not your comment' });
    }

    frase.comentarios = frase.comentarios.filter(
      (comentario) => comentario._id.toString() !== comentarioId
    );

    await frase.save();

    res.status(200).json({
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the comment' });
  }
};
