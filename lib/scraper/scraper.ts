import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import {
  convertTextToNumber,
  extractHrefFromHtml,
  extractTitleAndHashtags,
  extractUsernameAndDate,
} from "../utils";
export async function scrapeTiktokVideo(url: string) {
  if (!url) return;
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: "public/example.png" });
    const selector = '[id="main-content-video_detail"]';
    const textSelector = await page.waitForSelector(selector);
    const html = await textSelector?.evaluate((el) => el.innerHTML);
    const $ = cheerio.load(html!);
    const username = $('[data-e2e="browse-username"]').text();
    const nicknameAndDate = $('[data-e2e="browser-nickname"]').text();
    const desc = $('[data-e2e="browse-video-desc"]').text();
    const music = $('[data-e2e="browse-music"]').html()?.toString();
    const likes = $('[data-e2e="like-count"]').text();
    const comments = $('[data-e2e="comment-count"]').text();
    const favorite = $('[data-e2e="undefined-count"]').text();
    const { title, hashtags } = extractTitleAndHashtags(desc);
    const { nickname, createdAt } = extractUsernameAndDate(nicknameAndDate);
    const data = {
      url,
      username,
      nickname,
      createdAt,
      title,
      hashtags,
      musicUrl: extractHrefFromHtml(music!),
      likes: convertTextToNumber(likes),
      comments: convertTextToNumber(comments),
      favorite: convertTextToNumber(favorite),
    };

    return data;
  } catch (error) {
    console.log(error);
  }
}
