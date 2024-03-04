//SAMPLE REQUEST START HERE

import { generateOrderId } from "@/utils/helper";
import { NextResponse } from "next/server";

const midtransClient = require("midtrans-client");

export async function POST(req: Request) {
  const body = await req.json();
  const { cartItems, totalPrice, email } = body;
  // Create Snap API instance
  let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
  });
  let parameter = {
    transaction_details: {
      order_id: generateOrderId(),
      gross_amount: totalPrice,
    },
    customer_details: {
      first_name: "budi",
      last_name: "pratama",
      email: email,
      phone: "08111222333",
    },
  };
  let transactionToken = "";
  await snap
    .createTransaction(parameter)
    .then((transaction: { token: string }) => {
      transactionToken = transaction.token;
      return transactionToken;
    });
  return NextResponse.json(transactionToken);
}
