// scripts/generateCert.js

module.exports = async function (callback) {
  try {
    const Certification = artifacts.require("Certification");
    const cert = await Certification.deployed();

    // Create a unique certificate ID (use keccak256 hash)
    const id = web3.utils.keccak256("cert_demo_100");

    console.log("🔹 Generated Certificate ID:", id);

    // Generate a new certificate (onlyOwner can do this)
    const tx = await cert.generateCertificate(
      id,
      "Laxmi Raj",          // candidate_name
      "PAHADI ACADEMY",        // org_name
      "MOMO BECHNA",     // course_name
      1924992000               // expiration_date (Unix timestamp)
    );

    console.log("✅ Transaction successful!");
    console.log("   Tx Hash:", tx.tx);
    console.log("   Gas Used:", tx.receipt.gasUsed);

    // Fetch the stored certificate data
    const data = await cert.getData(id);

    console.log("\n📜 Certificate Data Retrieved:");
    console.log("   Candidate Name:", data[0]);
    console.log("   Organization  :", data[1]);
    console.log("   Course Name   :", data[2]);
    console.log("   Expiration    :", data[3].toString());

  } catch (err) {
    console.error("❌ Error:", err);
  }

  callback();
};
