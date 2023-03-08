import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const hashtagsModel = db.define('hashtags', {
	hashtag: { type: DataTypes.STRING },
});

export default hashtagsModel;
