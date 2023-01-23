import pg from "pg";

const { Pool } = pg;

const connection = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "myfilms",
  password: "snowfoda5",
  connectionString: process.env.DATABASE_URL as string,
});

export default connection;
