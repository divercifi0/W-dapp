// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract WarrantyManager {

    address payable public owner;
    uint256 public manufacturerCounter;
    uint256 public warrantyCounter;
    uint256 public claimCounter;

    constructor() {
        owner = payable(msg.sender);
        manufacturerCounter = 0;
        warrantyCounter = 0;
        claimCounter = 0;
    }

    enum WarrantyStatus {
        Active,
        Claimed
        // Voided
    }

    struct Warranty {
        string serialNumber;
        uint256 creationTimeStamp;
        uint256 claimTimeStamp;
        string coverageDetails;
        uint256 durationInMonths;
        WarrantyStatus status;
        bool isClaimed;
        address customer;
        address manufacturer;
        uint256 lastUpdated;
    }

    struct Manufacturer {
        string name;
        string contact;
    }

    // struct CustomerClaims {
    //     uint256 serialNumber;
    //     uint256 claimTimeStamp;
    //     address customer;
    //     address manufacturer;
    //     string claimDetails;
    // }
    
    

    event WarrantyCreated(string serialNumber, string coverageDetails, uint256 durationInMonths, address manufacturer);
    event WarrantyClaimed(string serialNumber, uint256 claimTimeStamp, address customer, address manufacturer);
    event ManufacturerRegistered(address manufacturer, string name, string contact);

    mapping(string => Warranty) public warranties;
    mapping(address => Manufacturer) public manufacturers;
    // mapping(uint256 => CustomerClaims[]) public customerClaims;

    function registerManufacturer(string memory name, string memory contact) public {
        require(bytes(name).length > 0, "Invalid manufacturer name");
        require(bytes(contact).length > 0, "Invalid manufacturer contact");
        manufacturers[msg.sender] =  Manufacturer(name, contact);
        manufacturerCounter++;
        emit ManufacturerRegistered(msg.sender, name, contact);
    }
    
    function createWarranty(string calldata serialNumber, string memory coverageDetails, uint256 durationInMonths) public {
        // require(bytes(manufacturers[msg.sender].name).length > 0, "Invalid Manufacturer address");
        warranties[serialNumber] = Warranty(serialNumber, block.timestamp, 0, coverageDetails, durationInMonths, WarrantyStatus.Active, false, address(0), msg.sender, block.timestamp);
        warrantyCounter++;
    }

    function claimWarranty(string calldata serialNumber) public {
        // require(warranties[serialNumber].status != WarrantyStatus.Active, "Warranty not active");
        // require(warranties[serialNumber].customer != address(0), "Warranty already claimed");
        warranties[serialNumber].customer = msg.sender;
        warranties[serialNumber].status = WarrantyStatus.Claimed;
        warranties[serialNumber].claimTimeStamp = block.timestamp;
        warranties[serialNumber].lastUpdated = block.timestamp;
        warranties[serialNumber].isClaimed = true;
        claimCounter++;
        emit WarrantyClaimed(serialNumber, block.timestamp, msg.sender, msg.sender);
    }

    function voidWarranty(string calldata serialNumber) public {
        require(warranties[serialNumber].status == WarrantyStatus.Active, "Warranty not active");
        warranties[serialNumber].lastUpdated = block.timestamp;
    }

    function getWarrantyStatus(string calldata serialNumber) public view returns (WarrantyStatus) {
        return warranties[serialNumber].status;
    }

    function getWarrantyBySerialNumber(string calldata serialNumber) public view returns (Warranty memory) {
        return warranties[serialNumber];
    } 

    function getManufacturerDetails(address manufacturer) public view returns (Manufacturer memory) {
        return manufacturers[manufacturer];
    }

    function getWarrantyCount() public view returns (uint256) {
        return warrantyCounter;
    }

    function getClaimCount() public view returns (uint256) {
        return claimCounter;
    }

    function getManufacturerCount() public view returns (uint256) {
        return manufacturerCounter;
    }

        
}
