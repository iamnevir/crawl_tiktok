"use client";
import { useState } from "react";
import axios from "axios";
import JSONPretty from "react-json-pretty";
import { Button, CircularProgress, Input } from "@nextui-org/react";
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
const formSchema = z.object({
  url: z.string().min(2),
  topic: z.string().min(2),
});

const CrawlMain = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      topic: "random",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.url !== "" && values.topic !== "") {
      setLoading(true);
      try {
        const data = await axios.post("/api/oxylab", values, {
          timeout: 60000,
        });
        setData(JSON.stringify(data.data));
        setLoading(false);
        toast.success("Cào thành công!!!");
        form.reset();
      } catch (error) {
        toast.error("Lỗi rồi!!");
        setLoading(false);
      }
    } else {
      toast.error("Wtf đã nhập đủ đâu");
    }
  }
  return (
    <div className="absolute z-[99] gap-2 mt- flex flex-col left-10 justify-center top-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "space-y-3 w-[30dvw]",
            loading ? "opacity-50 pointer-events-none" : ""
          )}
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link video</FormLabel>
                <FormControl>
                  <Input
                    placeholder="tiktok url"
                    {...field}
                    labelPlacement="outside"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chủ đề của video</FormLabel>
                <FormControl>
                  <Input
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

      {loading ? <CircularProgress aria-label="Loading..." /> : null}
      {data !== "" && (
        <div className=" p-5 rounded-xl w-[45dvw] h-[60dvh] overflow-auto bg-gradient-to-tr from-rose-600 to-purple-600 dark:from-default-200 dark:to-slate-400">
          <span className=" text-center text-3xl w-full flex justify-center p-2 text-white pointer-events-none">
            Kết quả
          </span>
          <JSONPretty id="json-pretty" mainStyle="overflow:auto" data={data} />
        </div>
      )}
    </div>
  );
};

export default CrawlMain;
