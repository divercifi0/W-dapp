import { NextRequest, NextResponse } from "next/server";
import {
  AccountId,
  PrivateKey,
  Client,
  AccountCreateTransaction,
  Hbar,
  TokenCreateTransaction,
  TokenType,
} from "@hashgraph/sdk";

const operatorAccountId = AccountId.fromString(
  process.env.OPERATOR_ACCOUNT_ID as string
);
const operatorPrivateKey = PrivateKey.fromStringDer(
  process.env.OPERATOR_PRIVATE_KEY as string
);

const client = Client.forTestnet().setOperator(
  operatorAccountId,
  operatorPrivateKey
);

const supplyKey = PrivateKey.generateED25519();

const fundgeTokenExample = async (supplyKey: PrivateKey) => {
  const [treasuryAccountId, treasuryAccountPrivateKey] = await createAccount(
    client,
    50
  );

  const tokenId = await createToken(
    client,
    treasuryAccountId as AccountId,
    supplyKey,
    treasuryAccountPrivateKey as PrivateKey
  );
};

// create an account with an initial balance
const createAccount = async (client: Client, initialBalance: number) => {
  const accountPrivateKey = PrivateKey.generateED25519();

  const response = await new AccountCreateTransaction()
    .setInitialBalance(new Hbar(initialBalance))
    .setKey(accountPrivateKey)
    .execute(client);

  const receipt = await response.getReceipt(client);

  return [receipt.accountId, accountPrivateKey];
};

const createToken = async (
  client: Client,
  treasuryAccId: AccountId,
  supplyKey: PrivateKey,
  treasuryAccPvKey: PrivateKey
) => {
  // 1. building a transaction with token type fungible
  const createTokenTxn = new TokenCreateTransaction()
    .setTokenName("Hedera Fungible Token")
    .setTokenSymbol("HFT")
    .setTokenType(TokenType.FungibleCommon)
    .setTreasuryAccountId(treasuryAccId)
    .setInitialSupply(0)
    .setSupplyKey(supplyKey)
    .setMaxTransactionFee(new Hbar(30))
    .freezeWith(client);

  // 2. Sign txn
  const createTokenTxnSigned = await createTokenTxn.sign(treasuryAccPvKey);

  // 3. submit txn to hedera network
  const txnResponse = await createTokenTxnSigned.execute(client);

  // 4. request receipt of txn
  const txnRx = await txnResponse.getReceipt(client);
  const txnStatus = txnRx.status.toString();
  const tokenId = txnRx.tokenId;

  console.log(
    `Token Type Creation was a ${txnStatus} and was created with token id: ${tokenId}`
  );

  return tokenId;
};
