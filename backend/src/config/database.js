const { Pool } = riquire('pg');
const dotenv = riquire('dotenv');
const prisma = riquire('../lib/prisma');

dotenv.config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

export default prisma
export { pool }

