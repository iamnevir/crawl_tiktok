"use server";

import { createVideo } from "@/lib/appwrite/api";
import { scrapeTiktokVideo } from "@/lib/scraper/scraper";

export default async function getTiktokData(url: string) {
  if (!url) return;

  try {
    const data = await scrapeTiktokVideo(url);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}
