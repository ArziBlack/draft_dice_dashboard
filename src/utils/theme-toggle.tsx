"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import capitalize from "lodash/capitalize";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ThemeToggleProps = { isCollapsed?: boolean };

export function ThemeToggle({ isCollapsed = false }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`flex pl-0 ${isCollapsed ? "ml-1 px-0" : "ml-2"} gap-3 mb-4`}
        >
          <Card
            className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Card>

          {!isCollapsed && (
            <p className="font-semibold text-sm">{capitalize(theme)} mode</p>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}