"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import ToastProvider from "@/components/ToastProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastProvider>
        <NextUIProvider>
          <SessionProvider>{children}</SessionProvider>
        </NextUIProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default Providers;
