import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
export function formatVietnameseDate(timespanInMilliseconds: number): string {
  const months: string[] = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const date = new Date(timespanInMilliseconds * 1000);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = ` ${day}, ${months[month]}, ${year}`;

  return formattedDate;
}
