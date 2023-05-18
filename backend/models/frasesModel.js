import mongoose from 'mongoose';

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
		},
		visualizaciones: {
			type: Number,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

frasesSchema.index({ frase: 'text', autor: 'text' });

export const frasesModel = mongoose.model('Frase', frasesSchema);
