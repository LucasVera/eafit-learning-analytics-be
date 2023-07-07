require("dotenv").config();

const pool = {
  // Necessary for proper connection-pooling in serverless
  // see: https://sequelize.org/master/manual/aws-lambda.html#tl-dr
  max: 5,
  min: 0,
  idle: 0,
  acquire: 3000,
  evict: process.env.LAMBDA_TIMEOUT_SECONDS,
};

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_BASE_NAME,
  DB_PORT,
  DB_HOST,
  STAGE,
} = process.env;

const config = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: `${DB_BASE_NAME}${STAGE}`,
  port: DB_PORT,
  host: DB_HOST,
  dialect: "postgres",
  protocol: "postgres",
  logging: process.env.DB_LOGGING === "true",
  pool,
};

module.exports = config;
