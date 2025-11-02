import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      aria-label="Primary navigation"
      className="fixed top-4 left-1/2 -translate-x-1/2  w-[min(1080px,calc(100%-12px))] rounded-xl p-1 backdrop-blur-md shadow-lg"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-2">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm font-semibold">
            Compressor
          </Link>
        </div>

        {/* desktop links */}
        <div className="flex items-center gap-2">
          <Link
            href="/video"

            className="px-3 py-1 rounded-sm text-sm font-medium bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 text-white shadow-md hover:scale-[1.03] transform-gpu transition duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Compress Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
