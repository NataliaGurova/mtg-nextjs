
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth";

import Order from "@/db/models/Order";
import { connectDB } from "@/db/db";

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { items, totalAmount } = await req.json();

  await connectDB();

  const order = await Order.create({
    userId: session.user.id,
    items,
    totalAmount,
  });

  return NextResponse.json(order, { status: 201 });
}



export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const orders = await Order.find({ userId: session.user.id })
    .sort({ createdAt: -1 });

  return NextResponse.json(orders);
}


// Order
//  ├── userId → User._id
//  ├── items[]
//  ├── totalAmount
//  └── status

// Что можно добавить позже (не сейчас)

// 🚚 shippingAddress

// 💳 paymentIntentId (Stripe)

// 📦 trackingNumber

// 🧾 invoiceUrl

// 🔄 refunds