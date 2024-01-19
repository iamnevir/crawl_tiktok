import VideoTable from "@/components/table/data-table";
import { getVideo } from "@/lib/appwrite/api";
const DatabasePage = async () => {
  const json = await getVideo();

  return <div>{/* <VideoTable data={json!} /> */}</div>;
};

export default DatabasePage;
