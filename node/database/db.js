import { Sequelize } from 'sequelize';

const db = new Sequelize(
	'bitacora-up',
	'cd9a2kkw864w2a0jnijd',
	'pscale_pw_Pl4t30Oc62idBytpaSm1HHlHUrmNeX4tByqjjDPhaY',
	{
		host: 'us-east.connect.psdb.cloud',
		dialect: 'mysql',
		dialectOptions: {
			ssl: {
				rejectUnauthorized: true,
			},
		},
	}
);

export default db;
