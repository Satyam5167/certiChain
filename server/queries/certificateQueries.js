import pool from '../db.js'
//This query is used to get the company name of the logged-in user
//It will be used to set the org_name in the certificate i.e the org who isseud the certificate
export const getUserCompanyName = async (userId) =>{
    const result = 
    await pool.query(
        `SELECT company_name FROM users WHERE id=$1`,[userId]);

    return result.rows[0];
}

//This query is used to save the certificate information into our database
export const insertCertificate = async(student_name, course_name, 
    issued_by_user_id, certificate_uid, student_email) =>{
        const result = await pool.query(`
            INSERT INTO certificate (student_name, course_name, issued_by_user_id, certificate_uid, issue_date, student_email)
            VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5)
            RETURNING id;
            `, [student_name, course_name, issued_by_user_id,certificate_uid, student_email]
        );

        return result.rows[0];
}

//This query is used to update the transaction_hash  of a particular certifiacte_id
export const updateCertificateTxHash = async(id , transaction_hash) =>{
    await pool.query(`
        UPDATE certificate 
        SET transaction_hash = $1
        WHERE id = $2        
        `, [transaction_hash, id]
    );
}

//This query is used to get the certificate_uid or the keccak256 hash for a particular transaction_hash
export const getCertificateUid = async(transaction_hash) => {
    const result = await pool.query(`
        SELECT certificate_uid FROM certificate WHERE transaction_hash=$1
        `,[transaction_hash]);
        return result.rows[0];
}


export const getTransactionHash = async(certificate_uid)=>{
    const result = await pool.query(`
        SELECT transaction_hash FROM certificate WHERE certificate_uid=$1
        `,[certificate_uid]);

        return result.rows[0];
}