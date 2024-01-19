import { DatabaseVideo } from "@/components/table/data-table";
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
export function formatNumberToShortScale(number: number): string {
  const abbreviations = ["", "K", "M", "B", "T"];
  let i = 0;
  let num = number;

  while (num >= 1000 && i < abbreviations.length - 1) {
    num /= 1000;
    i++;
  }

  return num.toFixed(0) + abbreviations[i];
}
//hastags

type VideosGroupedByHashtags = { [hashtag: string]: DatabaseVideo[] };

function groupVideosByHashtags(
  databaseVideos: DatabaseVideo[]
): VideosGroupedByHashtags {
  const videosGroupedByHashtags: VideosGroupedByHashtags = {};

  databaseVideos.forEach((video) => {
    video.hashtags.forEach((hashtag) => {
      if (!videosGroupedByHashtags[hashtag]) {
        videosGroupedByHashtags[hashtag] = [];
      }

      videosGroupedByHashtags[hashtag].push(video);
    });
  });

  return videosGroupedByHashtags;
}

export type TopHashtagsResult = {
  hashtag: string;
  view: number;
  totalVideos: number;
}[];

export function getTopHashtagsByViews(
  databaseVideos: DatabaseVideo[],
  numTopHashtags: number
): TopHashtagsResult {
  const videosGroupedByHashtags = groupVideosByHashtags(databaseVideos);

  // Tính tổng view và số lượng video cho từng hashtag
  const hashtagStats: TopHashtagsResult = Object.keys(
    videosGroupedByHashtags
  ).map((hashtag, i) => {
    const videos = videosGroupedByHashtags[hashtag];
    const view = videos.reduce((sum, video) => sum + video.view, 0);
    const totalVideos = videos.length;

    return {
      hashtag,
      view,
      totalVideos,
    };
  });

  // Sắp xếp mảng theo tổng view giảm dần
  hashtagStats.sort((a, b) => b.view - a.view);

  // Lấy ra danh sách 3 hashtag có tổng view cao nhất
  const topHashtags = hashtagStats.slice(0, numTopHashtags);

  return topHashtags;
}

// lấy trending theo musics
function groupAndSortVideosByMusicPlayUrl(videos: DatabaseVideo[]): {
  [key: string]: DatabaseVideo[];
} {
  const groupedVideos: { [key: string]: DatabaseVideo[] } = {};

  // Nhóm video theo musicPlayUrl
  videos.forEach((video) => {
    const musicTitle = video.musicTitle;

    if (!groupedVideos[musicTitle]) {
      groupedVideos[musicTitle] = [];
    }

    groupedVideos[musicTitle].push(video);
  });
  const sortedGroups = Object.entries(groupedVideos)
    .sort(([, groupA], [, groupB]) => groupB.length - groupA.length)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return sortedGroups;
}
export function getTopMusicPlayUrl(data: DatabaseVideo[]) {
  const groupedVideos = groupAndSortVideosByMusicPlayUrl(data);
  const top3MusicPlayUrl = Object.entries(groupedVideos)
    .slice(0, 3)
    .map(([musicTitle, videos]) => ({ musicTitle, videos: videos.length }));

  return top3MusicPlayUrl;
}

// lấy trending theo creator
const groupByUserName = (
  videos: DatabaseVideo[]
): Record<string, DatabaseVideo[]> => {
  return videos.reduce((result, video) => {
    const username = video.username;

    // Sử dụng type assertion để bảo đảm kiểu cho result[username]
    if (!result[username]) {
      result[username] = [] as DatabaseVideo[];
    }

    result[username].push(video);
    return result;
  }, {} as Record<string, DatabaseVideo[]>);
};
export const getTop3UsersByView = (
  videos: DatabaseVideo[]
): [string, number, number][] => {
  const groupedData = groupByUserName(videos);
  const sortedUsers = Object.entries(groupedData).sort(
    ([, videosA], [, videosB]) => {
      const viewA = videosA.reduce((sum, video) => sum + video.view, 0);
      const viewB = videosB.reduce((sum, video) => sum + video.view, 0);
      return viewB - viewA;
    }
  );

  return sortedUsers
    .slice(0, 3)
    .map(([username, videos]) => [
      username,
      videos.length,
      videos.reduce((sum, video) => sum + video.view, 0),
    ]);
};
//hấtg
export function getAllUniqueHashtags(videos: DatabaseVideo[]): string[] {
  const uniqueHashtags: Set<string> = new Set();
  const addedHashtags: Set<string> = new Set();

  videos.forEach((video) => {
    video.hashtags.forEach((hashtag) => {
      if (!addedHashtags.has(hashtag)) {
        uniqueHashtags.add(hashtag);
        addedHashtags.add(hashtag);
      }
    });
  });

  return Array.from(uniqueHashtags);
}
