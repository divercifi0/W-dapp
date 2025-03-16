export const CONTRACT_ADDRESS = "0x061fcc93d798e0d7971b709967499e39dcb51874";
export const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "manufacturer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "contact",
        type: "string",
      },
    ],
    name: "ManufacturerRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "serialNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "claimTimeStamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "customer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "manufacturer",
        type: "address",
      },
    ],
    name: "WarrantyClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "serialNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "coverageDetails",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "durationInMonths",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "manufacturer",
        type: "address",
      },
    ],
    name: "WarrantyCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "claimCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "serialNumber",
        type: "uint256",
      },
    ],
    name: "claimWarranty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "serialNumber",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "coverageDetails",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "durationInMonths",
        type: "uint256",
      },
    ],
    name: "createWarranty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getClaimCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getManufacturerCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "manufacturer",
        type: "address",
      },
    ],
    name: "getManufacturerDetails",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "contact",
            type: "string",
          },
        ],
        internalType: "struct WarrantyManager.Manufacturer",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "serialNumber",
        type: "uint256",
      },
    ],
    name: "getWarrantyBySerialNumber",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "serialNumber",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "creationTimeStamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimTimeStamp",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "coverageDetails",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "durationInMonths",
            type: "uint256",
          },
          {
            internalType: "enum WarrantyManager.WarrantyStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "isClaimed",
            type: "bool",
          },
          {
            internalType: "address",
            name: "customer",
            type: "address",
          },
          {
            internalType: "address",
            name: "manufacturer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "lastUpdated",
            type: "uint256",
          },
        ],
        internalType: "struct WarrantyManager.Warranty",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWarrantyCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "serialNumber",
        type: "uint256",
      },
    ],
    name: "getWarrantyStatus",
    outputs: [
      {
        internalType: "enum WarrantyManager.WarrantyStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "manufacturerCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "manufacturers",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "contact",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "contact",
        type: "string",
      },
    ],
    name: "registerManufacturer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "serialNumber",
        type: "uint256",
      },
    ],
    name: "voidWarranty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "warranties",
    outputs: [
      {
        internalType: "uint256",
        name: "serialNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "creationTimeStamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimTimeStamp",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "coverageDetails",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "durationInMonths",
        type: "uint256",
      },
      {
        internalType: "enum WarrantyManager.WarrantyStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "isClaimed",
        type: "bool",
      },
      {
        internalType: "address",
        name: "customer",
        type: "address",
      },
      {
        internalType: "address",
        name: "manufacturer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "lastUpdated",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "warrantyCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
