export default {
  key: process.env.APP_KEY,
  database: {
    type: process.env.DB_CONNECTION || 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dropSchema: false,
    entities: [`dist/**/*.entity.js`],
    synchronize: false,
    migrationsRun: true,
    migrations: ['dist/**/migrations/**/*.js'],
    migrationsTableName: 'migrations',
    logging: process.env.DB_LOGGING || false,
  },
};
