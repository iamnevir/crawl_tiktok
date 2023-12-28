import { createVideo, getVideo } from "@/lib/appwrite/api";
import { scrapeTiktok } from "@/lib/scraper/scraper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url, topic } = await req.json();

    if (!url && !topic) {
      return new NextResponse("wtf", { status: 401 });
    }
    const data = await scrapeTiktok(url);
    await createVideo(data, topic);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const data = await getVideo();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
