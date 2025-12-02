import { Pool } from 'pg'
import dns from 'dns'
import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port:5432,
});


// dns.setDefaultResultOrder('ipv4first')

// const pool = new Pool({
//     connectionString:process.env.DATABASE_URL,
//     family:4,
//     ssl:{
//         rejectUnauthorized: false
//     }
// })

export default pool;