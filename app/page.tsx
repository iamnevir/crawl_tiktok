import ChrismasCanvas from "@/components/chrismas/chrismas";
import CrawlMain from "@/components/crawl-main";
import ModeToggle from "@/components/theme-button";
export default function Home() {
  return (
    <div className=" w-full h-full overflow-hidden bg-gradient-to-br from-rose-300 to-purple-300 dark:from-default-200 dark:to-black">
      <div className=" w-[100vw] h-[100vh] px-40 relative flex sm:flex-row flex-col">
        <div className="absolute lg:block hidden right-[10dvw] top-[5dvh] w-[40%] h-full">
          <ChrismasCanvas />
        </div>
        <CrawlMain />
        <div className=" absolute right-10 top-5">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
