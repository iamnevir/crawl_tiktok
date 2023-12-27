import { createVideo } from "@/lib/appwrite/api";
import { scrapeTiktokVideoOxyLab } from "@/lib/scraper/scraper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url, topic } = await req.json();

    if (!url && !topic) {
      return new NextResponse("wtf", { status: 401 });
    }
    const data = await scrapeTiktokVideoOxyLab(url);
    await createVideo(data, topic);
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
