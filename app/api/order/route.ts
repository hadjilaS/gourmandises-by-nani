import { NextRequest, NextResponse } from "next/server";
import { orderSchema } from "@/lib/order-schema";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

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

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("orders").insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        event_date: parsed.data.eventDate,
        guest_count: parsed.data.guestCount,
        cake_type: parsed.data.cakeType,
        flavor: parsed.data.flavor,
        colors: parsed.data.colors,
        decoration: parsed.data.decoration,
        custom_text: parsed.data.customText ?? null,
        message: parsed.data.message ?? null,
      });

      if (error) {
        console.error("Supabase insert error:", error.message);
        return NextResponse.json(
          { success: false, error: "Impossible d'enregistrer la commande." },
          { status: 500 }
        );
      }
    } else {
      // Supabase non configuré : on journalise simplement la demande.
      // Branche ici l'envoi d'un email/notification si besoin.
      console.log("Nouvelle demande de commande (Supabase non configuré):", parsed.data);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Order route error:", err);
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
