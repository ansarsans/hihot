"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.replace("./en/");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090b0e] px-6 text-[#f4efe7]">
      <a
        href="./en/"
        className="rounded-full border border-white/20 bg-white/[0.05] px-5 py-2 text-sm tracking-[0.14em] uppercase transition hover:bg-white/[0.1]"
      >
        Open Hi Hotel
      </a>
    </main>
  );
}
