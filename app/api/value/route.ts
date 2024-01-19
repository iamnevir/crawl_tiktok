import { evaluate } from "@/lib/evaluate";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const hashtags = await req.json();
    const data = evaluate(hashtags);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
