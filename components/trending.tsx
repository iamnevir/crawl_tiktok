"use client";
import {
  cn,
  getAllUniqueHashtags,
  getTop3UsersByView,
  getTopHashtagsByViews,
  getTopMusicPlayUrl,
} from "@/lib/utils";
import { CircularProgress, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Hastags from "./hastags";
import Musics from "./musics";
import Videos from "./videos";
import Creator from "./creator";
import axios from "axios";
import { evaluate } from "@/lib/evaluate";

const Trending = () => {
  const [selected, setSelected] = useState<any>("hastags");
  const [creator, setcreator] = useState<any[]>([]);
  const [music, setmusic] = useState<any[]>([]);
  const [hastags, sethastags] = useState<any[]>([]);
  const [video, setvideo] = useState<any[]>([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchApi = async () => {
      const videos = await axios.get("/api/video");
      const cr = getTop3UsersByView(videos.data);
      const ms = getTopMusicPlayUrl(videos.data);
      const ht = getTopHashtagsByViews(videos.data, 3);
      const vd = videos.data
        .sort((a: any, b: any) => {
          if (a.value !== b.value) {
            return b.value - a.value;
          }
          return b.view - a.view;
        })
        .slice(0, 4);
      setcreator(cr);
      setmusic(ms);
      sethastags(ht);
      setvideo(vd);
      setloading(false);
    };
    fetchApi();
  }, []);
  return (
    <div className=" w-full sm:px-[10dvw]">
      <Tabs
        color="danger"
        size="lg"
        selectedKey={selected}
        variant="light"
        onSelectionChange={setSelected}
        aria-label="Tabs variants"
        className="mt-14"
        classNames={{ tab: "sm:w-[20dvw] sm:h-[15dvh] sm:overflow-hidden" }}
      >
        <Tab
          key="hastags"
          title={
            <div
              className={cn(
                "flex flex-col justify-center items-center relative sm:w-[20dvw] sm:h-[15dvh] text-white",
                selected === "hastag" && "w-[20dvw] h-[15dvh]"
              )}
            >
              {selected !== "hastags" && (
                <Image
                  src="https://p16-cc-sg.ibyteimg.com/tos-alisg-i-hdprqziq2y/cc/trend_tab_hashtag.png~tplv-hdprqziq2y-origin.image"
                  alt=""
                  fill
                  className=" z-[-1]"
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                />
              )}

              <span className=" sm:text-2xl font-bold">Hastags</span>
              {selected === "hastags" && (
                <span className=" sm:flex hidden w-60 text-sm whitespace-normal">
                  Khám phá xu hướng mới trên TikTok thông qua các hashtag{" "}
                </span>
              )}
            </div>
          }
        >
          {loading ? (
            <CircularProgress size="lg" aria-label="Loading..." />
          ) : (
            <Hastags data={hastags} />
          )}
        </Tab>
        <Tab
          key="music"
          title={
            <div
              className={cn(
                "flex flex-col  justify-center items-center relative sm:w-[20dvw] sm:h-[15dvh] text-white",
                selected === "music" && "w-[20dvw] h-[15dvh]"
              )}
            >
              {selected !== "music" && (
                <Image
                  src="https://p16-cc-sg.ibyteimg.com/tos-alisg-i-hdprqziq2y/cc/trend_tab_song.png~tplv-hdprqziq2y-origin.image"
                  alt=""
                  fill
                  className=" z-[-1]"
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                />
              )}
              <span className=" sm:text-2xl font-bold">Âm nhạc</span>
              {selected === "music" && (
                <span className="sm:flex hidden w-60 text-sm whitespace-normal">
                  Khám phá xu hướng mới trên TikTok thông qua các âm nhạc{" "}
                </span>
              )}
            </div>
          }
        >
          {loading ? (
            <CircularProgress size="lg" aria-label="Loading..." />
          ) : (
            <Musics data={music} />
          )}
        </Tab>
        <Tab
          key="creator"
          title={
            <div
              className={cn(
                "flex flex-col justify-center items-center relative sm:w-[20dvw] sm:h-[15dvh] text-white",
                selected === "creator" && "w-[20dvw] h-[15dvh]"
              )}
            >
              {selected !== "creator" && (
                <Image
                  src="https://p16-cc-sg.ibyteimg.com/tos-alisg-i-hdprqziq2y/cc/trend_tab_creator.png~tplv-hdprqziq2y-origin.image"
                  alt=""
                  fill
                  className=" z-[-1]"
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                />
              )}
              <span className=" sm:text-2xl font-bold">Nhà sáng tạo</span>
              {selected === "creator" && (
                <span className="sm:flex hidden w-60 text-sm whitespace-normal">
                  Khám phá xu hướng mới trên TikTok thông qua các nhà sáng tạo{" "}
                </span>
              )}
            </div>
          }
        >
          {loading ? (
            <CircularProgress size="lg" aria-label="Loading..." />
          ) : (
            <Creator data={creator} />
          )}
        </Tab>
        <Tab
          key="video"
          title={
            <div
              className={cn(
                "flex flex-col justify-center items-center relative sm:w-[20dvw] sm:h-[15dvh] text-white",
                selected === "video" && "w-[20dvw] h-[15dvh]"
              )}
            >
              {selected !== "video" && (
                <Image
                  src="https://p16-cc-sg.ibyteimg.com/tos-alisg-i-hdprqziq2y/cc/trend_tab_tiktok.png~tplv-hdprqziq2y-origin.image"
                  alt=""
                  fill
                  className=" z-[-1]"
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                />
              )}
              <span className=" sm:text-2xl font-bold">Video</span>
              {selected === "video" && (
                <span className="sm:flex hidden w-60 text-sm whitespace-normal">
                  Khám phá xu hướng mới trên TikTok thông qua các Video{" "}
                </span>
              )}
            </div>
          }
        >
          {loading ? (
            <CircularProgress size="lg" aria-label="Loading..." />
          ) : (
            <Videos data={video} />
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Trending;
function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
