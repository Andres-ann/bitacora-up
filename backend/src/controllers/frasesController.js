import { frasesModel } from '../models/frasesModel.js';
import { fraseValidationSchema } from '../validations/frasesValidation.js';

export const getAllFrases = async (req, res) => {
  const { page = 1, limit = 25 } = req.query;
  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
      populate: {
        path: 'usuarioId',
        select: 'name username avatar',
      },
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
    const frase = await frasesModel
      .findById(id)
      .populate('usuarioId', 'name username avatar')
      .populate({
        path: 'comentarios',
        populate: {
          path: 'usuarioId',
          select: 'name username avatar',
        },
      });

    if (!frase) {
      return res.status(404).json(`Frase with ID: ${id} not found`);
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
      message: 'Frase created successfully',
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
      return res.status(404).json({ error: 'Frase not found' });
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

export const addLike = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedFrase = await frasesModel.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!updatedFrase) {
      return res.status(404).json({ error: 'Frase not found' });
    }

    res
      .status(200)
      .json({ message: 'Like added successfully', frase: updatedFrase });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the like' });
  }
};

export const addView = async (req, res) => {
  try {
    const { id } = req.params;

    await frasesModel.findByIdAndUpdate(id, { $inc: { visualizaciones: 1 } });

    const updatedFrase = await frasesModel
      .findById(id)
      .populate('usuarioId', 'name username avatar')
      .populate({
        path: 'comentarios',
        populate: {
          path: 'usuarioId',
          select: 'name username avatar',
        },
      });

    if (!updatedFrase) {
      return res.status(404).json({ error: 'Frase not found' });
    }

    res
      .status(200)
      .json({ message: 'View added successfully', frase: updatedFrase });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the view' });
  }
};

export const addComentario = async (req, res) => {
  const { id } = req.params;
  const { comentario, gif } = req.body;

  const userId = req.user?.id;

  try {
    if (!comentario) {
      return res.status(400).json({
        error: 'TThe comment cannot be empty',
      });
    }

    const frase = await frasesModel.findById(id);
    if (!frase) {
      return res.status(404).json({ error: 'Frase not found' });
    }

    const nuevoComentario = {
      comentario,
      usuarioId: userId,
      gif: gif || null,
    };

    frase.comentarios.push(nuevoComentario);
    await frase.save();

    res.status(201).json({
      mensaje: 'Comment added successfully',
    });
  } catch (error) {
    console.error('Error adding comment:', error);

    res.status(500).json({
      error: 'Server error adding comment',
      mensaje: 'Comment not found',
    });
  }
};

export const updateComentario = async (req, res) => {
  try {
    const { fraseId, commentId } = req.params;
    const { comentario, gif } = req.body;
    const userIdFromToken = req.user.id;

    const frase = await frasesModel.findById(fraseId);

    if (!frase) {
      return res.status(404).json({ error: 'Frase not found' });
    }

    const comentarioToUpdate = frase.comentarios.id(commentId);

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
    const { fraseId, commentId } = req.params;
    const userIdFromToken = req.user.id;

    const frase = await frasesModel.findById(fraseId);

    if (!frase) {
      return res.status(404).json({ error: 'Frase not found' });
    }

    const comentarioToDelete = frase.comentarios.find(
      (comentario) => comentario._id.toString() === commentId
    );

    if (!comentarioToDelete) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comentarioToDelete.usuarioId.toString() !== userIdFromToken) {
      return res.status(403).json({ error: 'Forbidden: Not your comment' });
    }

    frase.comentarios = frase.comentarios.filter(
      (comentario) => comentario._id.toString() !== commentId
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
