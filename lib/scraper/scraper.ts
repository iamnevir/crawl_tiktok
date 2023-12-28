import * as cheerio from "cheerio";
import { extractTitleAndHashtags } from "../utils";
export async function scrapeTiktok(url: string) {
  if (!url) return;
  try {
    const res = await fetch(url);
    const $ = cheerio.load(await res.text());
    const data = $('[id="__UNIVERSAL_DATA_FOR_REHYDRATION__"]').text();
    const jsonData = JSON.parse(data);
    const itemStruct =
      jsonData["__DEFAULT_SCOPE__"]["webapp.video-detail"]["itemInfo"][
        "itemStruct"
      ];
    const author = itemStruct.author;
    const music = itemStruct.music;
    const stats = itemStruct.stats;
    const { title, hashtags } = extractTitleAndHashtags(itemStruct.desc);
    const video = {
      url,
      username: author.uniqueId,
      nickname: author.nickname,
      bio: author.signature,
      createdAt: itemStruct.createTime,
      cover: itemStruct.video.cover,
      dynamicCover: itemStruct.video.dynamicCover,
      title,
      hashtags,
      music: {
        authorName: music.authorName,
        title: music.title,
        cover: music.coverThumb,
        duration: music.duration,
        original: music.original,
        playUrl: music.playUrl,
      },
      forFriend: itemStruct.forFriend,
      view: stats.playCount,
      likes: stats.diggCount,
      share: stats.shareCount,
      comments: stats.commentCount,
      favorite: parseInt(stats.collectCount),
      suggestedWords: itemStruct.suggestedWords,
    };
    return video;
  } catch (error) {
    console.log(error);
  }
}
