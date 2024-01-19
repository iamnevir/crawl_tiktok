"use server";
import { Query } from "appwrite";
import { ID, appwriteConfig, databases } from "./config";
import { DatabaseVideo } from "@/components/table/data-table";
import { evaluate } from "../evaluate";

type Video = {
  url: string;
  username: string;
  nickname: string;
  bio: string;
  createdAt: string;
  cover: string;
  dynamicCover: string;
  title: string;
  hashtags: string[];
  music: {
    authorName: string;
    title: string;
    cover: string;
    duration: number;
    original: boolean;
    playUrl: string;
  };
  forFriend: boolean;
  view: number;
  likes: number;
  share: number;
  comments: number;
  favorite: number;
  suggestedWords: string;
};
export async function createVideo(video?: Video, topic?: string) {
  if (!video) return;
  try {
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        url: video.url,
        username: video.username,
        nickname: video.nickname,
        bio: video.bio,
        createdAt: video.createdAt,
        cover: video.cover,
        dynamicCover: video.dynamicCover,
        title: video.title,
        hashtags: video.hashtags,
        musicAuthorName: video.music.authorName,
        musicTitle: video.music.title,
        musicDuration: video.music.duration,
        musicOriginal: video.music.original,
        musicUrl: video.music.playUrl,
        forFriend: video.forFriend,
        view: video.view,
        likes: video.likes,
        shares: video.share,
        comments: video.comments,
        favorite: video.favorite,
        suggestedWords: video.suggestedWords,
        topic,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
export async function getVideo() {
  try {
    const videos = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$updatedAt"), Query.limit(5000)]
    );
    const data = videos?.documents.map((item) => ({
      url: item.url,
      username: item.username,
      nickname: item.nickname,
      bio: item.bio,
      createdAt: item.createdAt,
      cover: item.cover,
      dynamicCover: item.dynamicCover,
      title: item.title,
      hashtags: item.hashtags,
      musicAuthorName: item.musicAuthorName,
      musicTitle: item.musicTitle,
      musicDuration: item.musicDuration,
      musicOriginal: item.musicOriginal,
      musicPlayUrl: item.musicPlayUrl,
      forFriend: item.forFriend,
      view: item.view,
      likes: item.likes,
      shares: item.shares,
      comments: item.comments,
      favorite: item.favorite,
      suggestedWords: item.suggestedWords,
      value: evaluate(item.hashtags),
    }));

    return data;
  } catch (error) {
    console.log(error);
  }
}
