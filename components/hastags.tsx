import { formatNumberToShortScale } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";
const Hastags = ({ data }: { data: any[] }) => {
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
        <Table
          aria-label="client side sorting"
          className=" bg-white text-black border-none"
          classNames={{
            base: "max-h-[520px] bg-white text-black",
            table: "min-h-[420px] bg-white text-black",
          }}
        >
          <TableHeader className=" bg-white text-black">
            <TableColumn className=" bg-white text-black">Top</TableColumn>
            <TableColumn className=" bg-white text-black" key="hashtag">
              Hastag
            </TableColumn>
            <TableColumn className=" bg-white text-black" key="totalVideos">
              Bài đăng
            </TableColumn>
            <TableColumn className=" bg-white text-black" key="view">
              Lượt xem
            </TableColumn>
          </TableHeader>
          <TableBody loadingContent={<Spinner label="Loading..." />}>
            {data.map((item, index) => (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.hashtag}</TableCell>
                <TableCell>{item.totalVideos}</TableCell>
                <TableCell>{formatNumberToShortScale(item.view)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Hastags;
