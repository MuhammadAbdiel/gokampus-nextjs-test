import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const PostLayout = ({ children }: { children: React.ReactNode }) => (
  <div className={`relative min-h-screen ${poppins.className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-50 z-0"></div>
    <div className="container mx-auto p-6 relative z-10">{children}</div>
  </div>
);

export default PostLayout;
