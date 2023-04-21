import mongoose from 'mongoose';

//schema
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

//modelo a partir del esquema
export const frasesModel = new mongoose.model('Frase', frasesSchema);
