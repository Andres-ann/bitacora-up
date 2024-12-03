import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const comentariosSchema = new mongoose.Schema(
  {
    comentario: {
      type: String,
    },
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'please complete this field'],
    },
    gif: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
  { _id: false }
);

const frasesSchema = new mongoose.Schema(
  {
    frase: {
      type: String,
      required: [true, 'please complete this field'],
    },
    autor: {
      type: String,
      required: [true, 'please complete this field'],
    },
    likes: {
      type: Number,
      default: 0,
    },
    visualizaciones: {
      type: Number,
      default: 0,
    },
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comentarios: [comentariosSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

frasesSchema.index({ frase: 'text', autor: 'text' });
frasesSchema.plugin(mongoosePaginate);

export const frasesModel = mongoose.model('Frase', frasesSchema);
