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
const Creator = ({ data }: { data: any[] }) => {
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
            <TableColumn className=" bg-white text-black" key="username">
              Nhà sáng tạo
            </TableColumn>
            <TableColumn className=" bg-white text-black" key="video">
              Videos
            </TableColumn>
            <TableColumn className=" bg-white text-black" key="view">
              View
            </TableColumn>
          </TableHeader>
          <TableBody loadingContent={<Spinner label="Loading..." />}>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item[0]}</TableCell>
                <TableCell>{item[1]}</TableCell>
                <TableCell>{formatNumberToShortScale(item[2])}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Creator;
