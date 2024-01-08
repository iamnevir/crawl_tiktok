"use client";
import { useState } from "react";
import axios from "axios";
import JSONPretty from "react-json-pretty";
import { Button, CircularProgress, Input as InputUi } from "@nextui-org/react";
import "react-json-pretty/themes/monikai.css";
import toast from "react-hot-toast";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import Papa from "papaparse";
const formSchema = z.object({
  topic: z.string().min(2),
});

const CrawlMain = () => {
  const [data, setData] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "motivation",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.topic !== "") {
      setLoading(true);
      try {
        Papa.parse(file!, {
          header: false,
          skipEmptyLines: true,
          complete: async function (results: any) {
            for (const d of results.data) {
              try {
                await axios.post("/api/video", {
                  url: d[0],
                  topic: values.topic,
                });
                setData((prevData) => prevData + 1);
              } catch (error) {
                console.error("Error posting data:", error);
              }
            }
          },
        });
        toast.success("done!");
      } catch (error) {
        console.log(error);
        toast.error("Lỗi rồi!!");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Wtf đã nhập đủ đâu");
    }
  }
  return (
    <div className="absolute z-[99] gap-2 flex flex-col left-[50dvw] justify-center top-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "space-y-3 lg:w-[30dvw] w-[80dvw]",
            loading ? "opacity-50 pointer-events-none" : ""
          )}
        >
          <Input
            id="csv"
            type="file"
            onChange={(v) => setFile(v.target.files![0])}
          />
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chủ đề của video</FormLabel>
                <FormControl>
                  <InputUi
                    placeholder="Motivation..."
                    labelPlacement="outside"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button size="md" variant="shadow" color="primary" type="submit">
            Crawl
          </Button>
        </form>
      </Form>
      <div className=" p-5 w-fit rounded-xl overflow-auto bg-gradient-to-tr from-rose-600 to-purple-600 dark:from-default-200 dark:to-slate-400">
        <span className=" text-center text-3xl w-full flex justify-center p-2 text-white pointer-events-none">
          Kết quả
        </span>
        <CircularProgress
          aria-label="a"
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
          value={data}
          maxValue={1000}
          strokeWidth={4}
          showValueLabel={true}
        />
      </div>
    </div>
  );
};

export default CrawlMain;
