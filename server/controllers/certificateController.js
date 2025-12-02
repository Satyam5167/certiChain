import { v4 as uuidv4 } from 'uuid';
import Web3 from 'web3';
import dotenv from 'dotenv';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const contractJSON = require('../chain/build/contracts/Certification.json');

import {
    getUserCompanyName,
    insertCertificate,
    updateCertificateTxHash,
    getCertificateUid,
    getTransactionHash
} from '../queries/certificateQueries.js';

dotenv.config();

// --- Web3 Setup ---
const CONTRACT_ABI = contractJSON.abi;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const INFURA_URL = process.env.INFURA_URL;
const SERVER_PRIVATE_KEY = process.env.PRIVATE_KEY;

const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));
const account = web3.eth.accounts.privateKeyToAccount('0x' + SERVER_PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
const certificateContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// --- Controller ---
export const issueCertificate = async (req, res) => {
    try {
        const { student_name, course_name, expiration_date, student_email } = req.body;
        const issued_by_user_id = req.userId; // Assuming from auth middleware

        if (!student_name || !course_name) {
            return res.status(400).json({ message: "Student name and course name are required." });
        }

        const certificate_uid = uuidv4();

        // Get org name from DB
        const user = await getUserCompanyName(issued_by_user_id);
        if (!user) return res.status(404).json({ message: "Issuer not found." });

        const org_name = user.company_name;


        const certificateIdHash = web3.utils.keccak256(certificate_uid);
        const expirationTimestamp = expiration_date
            ? Math.floor(new Date(expiration_date).getTime() / 1000)
            : 0;

        // Send transaction
        const gasPrice = await web3.eth.getGasPrice();
        const tx = await certificateContract.methods.generateCertificate(
            certificateIdHash,
            student_name,
            org_name,
            course_name,
            expirationTimestamp
        ).send({
            from: account.address,
            gas: 500000,
            gasPrice
        });

        const transactionHash = tx.transactionHash;
        const dbCert = await insertCertificate(student_name, course_name, issued_by_user_id, certificate_uid, student_email);
        await updateCertificateTxHash(dbCert.id, transactionHash);

        return res.status(201).json({
            message: "Certificate issued successfully.",
            certificate_uid,
            transaction_hash: transactionHash,
        });

    } catch (err) {
        console.error("Error issuing certificate:", err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


// assuning users verifies it with transaction hash
export const verifyCertificate = async (req, res) => {
    let { certificate_uid, transaction_hash } = req.body;
    
    if (!transaction_hash && !certificate_uid) return res.status(404).json({ message: "Empty Field" });
    try {

        let data;

        if (transaction_hash) {
            
            const certRecord = await getCertificateUid(transaction_hash);
            certificate_uid = certRecord.certificate_uid;

            if (!certificate_uid) return res.status(404).json({ message: "certificate not found in database" });
            const certificateIdHash = web3.utils.keccak256(certificate_uid);

            data = await certificateContract.methods.getData(certificateIdHash).call();

        } else if (certificate_uid) {

            const certificateIdHash = web3.utils.keccak256(certificate_uid);
            data = await certificateContract.methods.getData(certificateIdHash).call();
            
            const certRecord = await getTransactionHash(certificate_uid);
            
            transaction_hash = certRecord.transaction_hash;

        }

        if (!data || !data[0])
            return res.status(404).json({ message: "Certificate not found on blockchain." });

        return res.status(200).json({
            message: "Certificate verified sucessfully.",
            blockchain_data: {
                student_name: data[0],
                org_name: data[1],
                course_name: data[2],
                //.toString() will handle BigInt
                expiration_date: data[3] ? data[3].toString() : null
            },
            certificate_uid,
            transaction_hash
        })

    } catch (error) {
        console.error("Error verifying certificate:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}