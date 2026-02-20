import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("SERVICE_KEY set:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  try {
    const { email, source } = await request.json();
    console.log("Received:", { email, source });

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from("subscribers")
      .upsert({ email, source }, { onConflict: "email" });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: `Supabase error: ${error.message} (${error.code})` },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
