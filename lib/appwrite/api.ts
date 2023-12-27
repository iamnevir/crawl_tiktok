"use server";
import { ID, appwriteConfig, databases } from "./config";

type Video = {
  url: string;
  username: string;
  nickname: string;
  createdAt: string;
  title: string;
  hashtags: string[];
  musicUrl: string | null;
  likes: number;
  comments: number;
  favorite: number;
};
export async function createVideo(video?: Video, topic?: string) {
  if (!video) return;
  try {
    const newVideo = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        url: video.url,
        username: video.username,
        nickname: video.nickname,
        createdAt: video.createdAt,
        title: video.title,
        hashtags: video.hashtags,
        musicUrl: video.musicUrl,
        likes: video.likes,
        comments: video.comments,
        favorite: video.favorite,
        topic,
      }
    );

    return newVideo;
  } catch (error) {
    console.log(error);
  }
}
export async function getVideo() {
  try {
    const videos = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return videos;
  } catch (error) {
    console.log(error);
  }
}
