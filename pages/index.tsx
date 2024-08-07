import { Poppins } from "next/font/google";
import Link from "next/link";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>My Amazing Blog</title>
      </Head>

      <main
        className={`flex min-h-screen flex-col items-center justify-center p-6 ${poppins.className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-50 z-0"></div>
        <div className="relative z-10 mb-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to My Amazing Blog!
          </h1>
          <p className="text-xl text-white mb-8">
            Discover insightful posts and articles. Click the button below to
            explore.
          </p>
          <Link
            href="/posts"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Go to Posts
          </Link>
        </div>
      </main>
    </>
  );
}
