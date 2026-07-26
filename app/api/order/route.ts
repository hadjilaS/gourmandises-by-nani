import { NextRequest, NextResponse } from "next/server";
import { orderSchema } from "@/lib/order-schema";
import { addOrder } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const record = await addOrder(parsed.data);
    return NextResponse.json({ success: true, id: record.id });
  } catch (err) {
    console.error("Order route error:", err);
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
