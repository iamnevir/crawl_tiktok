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
export async function scrapeTiktokVideoOxyLab(url: string) {
  if (!url) return;
  try {
    const res = await fetchData(url);
    const $ = cheerio.load(res);
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
async function fetchData(link: string) {
  const url = "https://realtime.oxylabs.io/v1/queries";
  const username = "iamnevir";
  const password = "Dtc2054802010083";
  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    source: "universal",
    url: link,
    "geo-location": "Viet Nam",
    render: "html",
  };

  const options = {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
        "base64"
      )}`,
    },

    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.results[0].content;
  } catch (error) {
    console.log(error);
  }
}
