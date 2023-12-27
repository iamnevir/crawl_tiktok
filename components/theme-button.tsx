"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Switch
      isSelected={theme === "light"}
      onValueChange={(v) => setTheme(v ? "light" : "dark")}
      defaultSelected
      size="md"
      color="primary"
      startContent={<Sun />}
      endContent={<Moon />}
    ></Switch>
  );
}
