"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const GotoDatabase = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/database")}
      color="primary"
      variant="shadow"
    >
      Database
    </Button>
  );
};

export default GotoDatabase;
