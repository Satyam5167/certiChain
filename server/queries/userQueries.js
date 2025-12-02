import pool from '../db.js'


export  const getCurrentUser = async(id)=>{
    const result =  await pool.query(`
        SELECT name FROM users WHERE id = $1
        `,[id]);

    return result.rows[0];
}