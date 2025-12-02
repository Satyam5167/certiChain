import { Pool } from 'pg'
import dns from 'dns'
import dotenv from 'dotenv'
dotenv.config()
// dns.setDefaultResultOrder('ipv4first')

// const pool = new Pool({
//     connectionString:process.env.DATABASE_URL,
//     family:4,
//     ssl:{
//         rejectUnauthorized: false
//     }
// })

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'satyam',
  database: 'certificate',
  port:5432,
});


export default pool;

