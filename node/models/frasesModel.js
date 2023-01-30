import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const frasesModel = db.define('frases', {
	frase: { type: DataTypes.STRING },
	autor: { type: DataTypes.STRING },
	likes: { type: DataTypes.INTEGER },
});

export default frasesModel;
