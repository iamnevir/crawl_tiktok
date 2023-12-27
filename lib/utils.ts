import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as cheerio from "cheerio";
import { format, parse, addDays, addHours } from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function extractHrefFromHtml(html: string): string | null {
  // Load HTML string into Cheerio
  const $ = cheerio.load(html);

  // Find the 'a' tag and get the 'href' attribute
  const href = $("a").attr("href");

  return `https://www.tiktok.com/${href}` || null;
}
export function convertTextToNumber(text: string): number {
  const multiplierMap: { [key: string]: number } = {
    K: 1e3,
    M: 1e6,
  };

  const match = text.match(/^(\d*\.?\d+)([KM])?$/);

  if (!match) {
    throw new Error(`Invalid input: ${text}`);
  }

  const value = parseFloat(match[1]);
  const multiplier = match[2] ? multiplierMap[match[2]] : 1;

  // Làm tròn số nguyên

  return value * multiplier;
}
export function extractTitleAndHashtags(text: string): {
  title: string;
  hashtags: string[];
} {
  let title = "";
  let hashtags: string[] = [];

  const hashtagsRegex = /#(\w+)/g;
  const matches = text.match(hashtagsRegex);

  if (matches) {
    // Lọc và loại bỏ hashtag từ chuỗi title
    title = text.replace(hashtagsRegex, "").trim();

    // Lấy danh sách các hashtag
    hashtags = matches.map((match) => `#${match.substring(1)}`);
  } else {
    // Nếu không có hashtag, sử dụng toàn bộ chuỗi làm title
    title = text.trim();
  }

  return { title, hashtags };
}

export function extractUsernameAndDate(text: string): {
  nickname: string;
  createdAt: string;
} {
  const [username, dateString] = text.split(" · ");
  const dayAgo = dateString.match(/(\d+)d ago/);
  const hourAgo = dateString.match(/(\d+)h ago/);
  const noYear = dateString.match(/^\d{1,2}-\d{1,2}$/);

  if (dayAgo) {
    const daysAgo = parseInt(dayAgo[1], 10);
    const currentDate = new Date();
    const date = addDays(currentDate, -daysAgo);
    const formatDate = format(date, "dd/MM/yyyy");
    return { nickname: username.trim(), createdAt: formatDate };
  }

  if (hourAgo) {
    const hoursAgo = parseInt(hourAgo[1], 10);
    const currentDate = new Date();
    const date = addHours(currentDate, -hoursAgo);
    const formatDate = format(date, "dd/MM/yyyy");
    return { nickname: username.trim(), createdAt: formatDate };
  }

  if (noYear) {
    const [day, month] = dateString.split("-").map(Number);
    const currentYear = new Date().getFullYear();
    const targetYear = 2024; // Năm cần đặt
    const date = new Date(targetYear, month - 1, day);
    const formatDate = format(date, "dd/MM/yyyy");
    return { nickname: username.trim(), createdAt: formatDate };
  }

  // Chuyển đổi chuỗi ngày thành đối tượng Date
  const date = parse(dateString, "yyyy-M-d", new Date());
  const formatDate = format(date, "dd/MM/yyyy");
  return { nickname: username.trim(), createdAt: formatDate };
}
