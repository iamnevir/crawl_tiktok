import { musicTrending } from "@/lib/appwrite/api";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const data = await musicTrending();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
