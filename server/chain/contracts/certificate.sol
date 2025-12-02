// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import the Ownable contract
import "./Ownable.sol";

/**
 * @title CertificateLedger
 * @notice Issues and verifies certificates, restricted by an owner.
 */
contract Certification is Ownable { // Inherit from Ownable

    struct Certificate {
        string candidate_name;
        string org_name;
        string course_name;
        uint256 expiration_date;
    }

    mapping(bytes32 => Certificate) public certificates;

    event CertificateGenerated(bytes32 indexed _certificateId);

    /**
     * @notice Generates a new certificate.
     * @dev Can only be called by the contract owner (your backend server).
     * @param _certificateId The keccak256 hash of the unique certificate ID.
     * ...
     */
    function generateCertificate(
        bytes32 _certificateId,
        string memory _candidate_name,
        string memory _org_name,
        string memory _course_name,
        uint256 _expiration_date
    ) public onlyOwner { // <-- ADD THIS MODIFIER
        
        require(certificates[_certificateId].expiration_date == 0, "Certificate with this ID already exists");

        certificates[_certificateId] = Certificate(
            _candidate_name,
            _org_name,
            _course_name,
            _expiration_date
        );

        emit CertificateGenerated(_certificateId);
    }

    /**
     * @notice Retrieves certificate data using its keccak256 hash ID.
     * @dev This is a public view function, anyone can call it for free.
     * @param _certificateId The keccak256 hash of the unique certificate ID.
     * ...
     */
    function getData(bytes32 _certificateId)
        public
        view
        returns (
            string memory candidate_name,
            string memory org_name,
            string memory course_name,
            uint256 expiration_date
        )
    {
        Certificate storage cert = certificates[_certificateId];
        require(cert.expiration_date != 0, "Certificate not found");

        return (
            cert.candidate_name,
            cert.org_name,
            cert.course_name,
            cert.expiration_date
        );
    }
}