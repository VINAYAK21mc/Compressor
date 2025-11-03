import Link from "next/link";

const Hero = () => (
  <div className="pt-10 md:pt-20 px-6 lg:px-0">
    <div className="text-gray-600 flex items-center gap-x-1.5 text-2xl border border-gray-200 rounded-full px-3 py-1.5 mx-auto w-fit mb-8">
      <p className="text-sm sm:text-base">🎉 Let&apos;s do it folks -&gt; </p>
    </div>
    <h1 className="text-center text-4xl font-bold md:text-5xl lg:text-7xl lg:font-semibold text-gray-900 text-balance">
      Condense Videos
    </h1>
    <h2 className="sm:text-lg max-w-xl mx-auto text-gray-500 text-center mt-9">
      Eliminate oversized files! Reduce video size by <span>90%</span> without
      sacrificing quality, all while working offline.
    </h2>
    <div className="flex gap-4 items-center justify-center mt-10 mb-10">
      <Link
        href="/video"

        className="px-4 py-2 rounded-sm text-sm font-medium bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 text-white shadow-md hover:scale-[1.03] transform-gpu transition duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Compress Now
      </Link>
    </div>
  </div>
);

export default Hero;