import CrawlMain from "@/components/crawl-main";
import GotoDatabase from "@/components/goto-database";
import ImportMain from "@/components/import-main";
import ModeToggle from "@/components/theme-button";
export default async function CrawlPage() {
  return (
    <div className=" w-full h-full overflow-hidden bg-gradient-to-br from-rose-300 to-purple-300 dark:from-default-200 dark:to-black">
      <div className=" w-[100vw] h-[100vh] px-40 relative flex sm:flex-row flex-col">
        <ImportMain />
        <CrawlMain />
        <div className=" absolute right-10 top-5">
          <ModeToggle />
        </div>
        <div className=" absolute right-28 top-5">
          <GotoDatabase />
        </div>
      </div>
    </div>
  );
}
