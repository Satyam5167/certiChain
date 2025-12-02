import pool from '../db.js';
//this query is used to get find the user by there email
//I am using this to check if the user already exists in if they try to register
export const findUserByEmail = async(email) =>{
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`,[email]);
    return result.rows[0];
}

//This query is used to insert the details of new user in the users table
export const createUser = async(name, email, hashedPassword, company_name) =>{
    const result = await pool.query(
        `INSERT INTO users (name, email, password_hash, company_name) VALUES($1, $2, $3, $4) RETURNING id`,
        [name, email,hashedPassword,company_name]);

    return result.rows[0];
}