import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090b0e] px-6 text-[#f4efe7]">
      <div className="w-full max-w-lg rounded-[1.6rem] border border-white/12 bg-white/[0.04] p-8 text-center backdrop-blur-xl">
        <p className="text-[0.7rem] tracking-[0.26em] text-[#d6c8af]/75 uppercase">
          Hi Hotel
        </p>
        <h1 className="mt-4 text-4xl leading-tight font-semibold text-[#f8f1e5]">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[#e4d8c5]/72">
          The page you requested is not available. Continue to the city
          selection experience.
        </p>
        <Link
          href="/en"
          className="mt-7 inline-flex rounded-full bg-[#c2a976] px-5 py-2.5 text-sm font-medium text-[#111318] transition hover:bg-[#d1b98d]"
        >
          Go to homepage
        </Link>
      </div>
    </main>
  );
}
