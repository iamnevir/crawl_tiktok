import VideoTable from "@/components/table/data-table";
import { getVideo } from "@/lib/appwrite/api";
const DatabasePage = async () => {
  const json = await getVideo();

  const data = json?.documents.map((item) => ({
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
    share: item.share,
    comments: item.comments,
    favorite: item.favorite,
    suggestedWords: item.suggestedWords,
  }));
  return (
    <div>
      <VideoTable data={data!} />
    </div>
  );
};

export default DatabasePage;
