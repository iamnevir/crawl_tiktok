import { Client, Databases } from "appwrite";

export const appwriteConfig = {
  url: process.env.APPWRITE_URL || "https://cloud.appwrite.io/v1",
  projectId: process.env.APPWRITE_PROJECT_ID || "658a1da2497c789f89b9",
  databaseId: process.env.APPWRITE_DATABASE_ID || "658a1df30a2d5dd41f61",
  videoCollectionId:
    process.env.APPWRITE_VIDEO_COLLECTION_ID || "658a20f1a27c57364c77",
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);
export const databases = new Databases(client);
export { ID } from "appwrite";
