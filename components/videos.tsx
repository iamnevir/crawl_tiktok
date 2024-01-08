import { TikTokEmbed } from "react-social-media-embed";
const Videos = ({ data }: { data: any[] }) => {
  return (
    <div className="">
      <div className="w-full">
        {/* <Select
          defaultSelectedKeys={["7day"]}
          size="sm"
          classNames={{
            innerWrapper: "text-black",
            trigger: "rounded-full text-black",
            listboxWrapper: "text-black bg-white",
            popoverContent: "bg-white hover:bg-white",
          }}
          className="max-w-[200px] text-black"
          variant="bordered"
        >
          <SelectItem key="7day" value="">
            7 ngày qua
          </SelectItem>
          <SelectItem key="30day" value="">
            30 ngày qua
          </SelectItem>
          <SelectItem key="60day" value="">
            60 ngày qua
          </SelectItem>
        </Select> */}
        <div className=" grid sm:grid-cols-4 grid-cols-1 gap-3">
          {data.map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TikTokEmbed url={item.url} width={325} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
