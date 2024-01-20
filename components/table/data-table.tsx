"use client";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  createMRTColumnHelper,
} from "material-react-table";
import { Box, Button, Stack } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useMemo } from "react";
import { formatVietnameseDate } from "@/lib/utils";
export type DatabaseVideo = {
  url: string;
  username: string;
  nickname: string;
  bio: string;
  createdAt: string;
  cover: string;
  dynamicCover: string;
  title: string;
  hashtags: string[];
  musicAuthorName: string;
  musicTitle: string;
  musicDuration: number;
  musicOriginal: boolean;
  musicPlayUrl: string;
  forFriend: boolean;
  view: number;
  likes: number;
  shares: number;
  comments: number;
  favorite: number;
  suggestedWords: string;
  value?: number;
};
const columnHelper = createMRTColumnHelper<DatabaseVideo>();

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const VideoTable = ({ data }: { data: DatabaseVideo[] }) => {
  const handleExportRows = (rows: MRT_Row<DatabaseVideo>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };
  const maxView = useMemo(
    () => data.reduce((acc, curr) => Math.max(acc, curr.view), 0),
    []
  );
  const maxTym = useMemo(
    () => data.reduce((acc, curr) => Math.max(acc, curr.likes), 0),
    []
  );
  const maxShare = useMemo(
    () => data.reduce((acc, curr) => Math.max(acc, curr.shares), 0),
    []
  );
  const maxComment = useMemo(
    () => data.reduce((acc, curr) => Math.max(acc, curr.comments), 0),
    []
  );
  const maxFavorite = useMemo(
    () => data.reduce((acc, curr) => Math.max(acc, curr.favorite), 0),
    []
  );
  const columns = [
    columnHelper.accessor("nickname", {
      header: "Tên",
      size: 120,
    }),
    columnHelper.accessor("createdAt", {
      header: "Ngày đăng",
      size: 50,
      //@ts-ignore
      Cell: ({ cell }) => <>{formatVietnameseDate(cell.getValue())}</>,
    }),
    // columnHelper.accessor("cover", {
    //   header: "Bìa",
    // }),
    columnHelper.accessor("title", {
      header: "Caption",
      size: 500,
    }),

    columnHelper.accessor("view", {
      header: "View",
      size: 50,
      aggregationFn: "max", //show the max age in the group (lots of pre-built aggregationFns to choose from)
      //required to render an aggregated cell
      AggregatedCell: ({ cell, table }) => (
        <>
          Max by{" "}
          {table.getColumn(cell.row.groupingColumnId ?? "").columnDef.header}:{" "}
          <Box
            //@ts-ignore
            sx={{ color: "info.main", display: "inline", fontWeight: "bold" }}
          >
            {cell.getValue<number>()}
          </Box>
        </>
      ),
      Footer: () => (
        <Stack>
          Max View:
          <Box color="warning.main">{Math.round(maxView)}</Box>
        </Stack>
      ),
    }),
    columnHelper.accessor("likes", {
      header: "likes",
      size: 50,
      aggregationFn: "max", //show the max age in the group (lots of pre-built aggregationFns to choose from)
      //required to render an aggregated cell
      AggregatedCell: ({ cell, table }) => (
        <>
          Max by{" "}
          {table.getColumn(cell.row.groupingColumnId ?? "").columnDef.header}:{" "}
          <Box
            sx={{ color: "info.main", display: "inline", fontWeight: "bold" }}
          >
            {cell.getValue<number>()}
          </Box>
        </>
      ),
      Footer: () => (
        <Stack>
          Max Tym:
          <Box color="warning.main">{Math.round(maxTym)}</Box>
        </Stack>
      ),
    }),
    columnHelper.accessor("shares", {
      header: "shares",
      size: 50,
      aggregationFn: "max", //show the max age in the group (lots of pre-built aggregationFns to choose from)
      //required to render an aggregated cell
      AggregatedCell: ({ cell, table }) => (
        <>
          Max by{" "}
          {table.getColumn(cell.row.groupingColumnId ?? "").columnDef.header}:{" "}
          <Box
            sx={{ color: "info.main", display: "inline", fontWeight: "bold" }}
          >
            {cell.getValue<number>()}
          </Box>
        </>
      ),
      Footer: () => (
        <Stack>
          Max Share:
          <Box color="warning.main">{Math.round(maxShare)}</Box>
        </Stack>
      ),
    }),
    columnHelper.accessor("comments", {
      header: "comments",
      size: 50,
      aggregationFn: "max", //show the max age in the group (lots of pre-built aggregationFns to choose from)
      //required to render an aggregated cell
      AggregatedCell: ({ cell, table }) => (
        <>
          Max by{" "}
          {table.getColumn(cell.row.groupingColumnId ?? "").columnDef.header}:{" "}
          <Box
            sx={{ color: "info.main", display: "inline", fontWeight: "bold" }}
          >
            {cell.getValue<number>()}
          </Box>
        </>
      ),
      Footer: () => (
        <Stack>
          Max comments:
          <Box color="warning.main">{Math.round(maxComment)}</Box>
        </Stack>
      ),
    }),
    columnHelper.accessor("favorite", {
      header: "favorite",
      size: 50,
      aggregationFn: "max", //show the max age in the group (lots of pre-built aggregationFns to choose from)
      //required to render an aggregated cell
      AggregatedCell: ({ cell, table }) => (
        <>
          Max by{" "}
          {table.getColumn(cell.row.groupingColumnId ?? "").columnDef.header}:{" "}
          <Box
            sx={{ color: "info.main", display: "inline", fontWeight: "bold" }}
          >
            {cell.getValue<number>()}
          </Box>
        </>
      ),
      Footer: () => (
        <Stack>
          Max Favorite:
          <Box color="warning.main">{Math.round(maxFavorite)}</Box>
        </Stack>
      ),
    }),
  ];
  const table = useMaterialReactTable({
    columns,
    data,
    enableGrouping: true,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button onClick={handleExportData} startIcon={<FileDownloadIcon />}>
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default VideoTable;
