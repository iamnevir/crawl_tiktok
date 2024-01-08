import Trending from "@/components/trending";

export default async function Home() {
  return (
    <div className=" w-full h-full overflow-x-hidden">
      <div className=" w-[100vw] h-[65vh] relative sm:flex hidden items-center justify-start">
        <span className=" text-7xl font-bold w-[40dvw] ml-40 leading-[100px] mt-10">
          Tìm nội dung thịnh hành tại{" "}
          <span className=" text-red-500">Việt Nam</span>
        </span>
        <span className=" text-xl font-bold w-[30dvw] ml-40 mt-60">
          Tìm kiếm nội dung đạt hiệu quả trên TikTok và tương tác tốt hơn với
          đối tượng của bạn.{" "}
        </span>
      </div>
      <div className=" w-[100vw] sm:h-[150dvh] h-full bg-white overflow-hidden">
        <Trending />
      </div>
    </div>
  );
}
