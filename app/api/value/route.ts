import { evaluate } from "@/lib/evaluate";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const data = evaluate(
      [
        "#motivation",
        "#motivationspeech",
        "#motivational",
        "#mindsetquotes",
        "#motivationalquotes",
        "#motivationalvideo",
        "#lifetips",
        "#mindset",
        "#hustlehard",
        "#inspiration",
      ],
      1000000,
      800000
    );
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
