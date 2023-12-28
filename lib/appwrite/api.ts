"use server";
import { Query } from "appwrite";
import { ID, appwriteConfig, databases } from "./config";

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
      [Query.orderDesc("$updatedAt"), Query.limit(100)]
    );

    return videos;
  } catch (error) {
    console.log(error);
  }
}
