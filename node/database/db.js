import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const HOST = process.env.MYSQL_ADDON_HOST || 'localhost';
const DB = process.env.MYSQL_ADDON_DB || 'frases';
const USER = process.env.MYSQL_ADDON_USER || '';
const PORT = process.env.MYSQL_ADDON_PORT || '8000';
const PASSWORD = process.env.MYSQL_ADDON_PASSWORD || '';
const URI = process.env.MYSQL_ADDON_URI || 'http://localhost:8000';

const db = new Sequelize(DB, USER, PASSWORD, {
	host: HOST,
	dialect: 'mysql',
});

export default db;
