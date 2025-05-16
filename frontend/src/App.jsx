import { FaDownload, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LuDownload } from "react-icons/lu";
import { useState } from "react";
// import axios from "axios";
import toast from "react-hot-toast";

const API_URL =
  import.meta.env.VITE_API_URL === "production"
    ? "https://tlip-tube.onrender.com/download"
    : "http://localhost:4000/download";

export default function App() {
  const [url, setUrl] = useState("");

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleDownloads = async (e) => {
    e.preventDefault();

    if (!url || !isValidUrl(url)) {
      toast.error("Please enter a valid video URL");
      return;
    }

    toast.loading("Downloading... The server might be warming up", {
      icon: "⏳",
      duration: 2000,
    });

    try {
      window.location.href = `${API_URL}?url=${encodeURIComponent(url)}`;      
    } catch (error) {
      console.error("Error downloading video:", error);
      toast.error("Failed to download video. Please try again.");
    }
  };

  return (
    <div className="absolute  inset-0 -z-10 w-full items-center px-5 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] overflow-x-hidden">
      {/* Decorative Blobs */}
      <div className="fixed top-[-120px] left-[-120px] w-[300px] h-[300px] bg-pink-500 opacity-30 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-[-100px] right-[-100px] w-[250px] h-[250px] bg-blue-400 opacity-20 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
      <div className="fixed top-[40%] left-[-80px] w-[180px] h-[180px] bg-purple-400 opacity-20 rounded-full blur-2xl pointer-events-none animate-pulse"></div>

      <header className="w-full py-7 px-4 lg:px-8 z-5 bg-transparent flex justify-between items-center border-b border-slate-700/40 fixed backdrop-blur-md">
        <a
          href="/"
          className="font-extrabold font-mono text-4xl text-slate-100 hover:text-pink-400 tracking-tight drop-shadow-lg transition-colors duration-200"
        >
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            TlipTube
          </span>
        </a>
        <div className="flex items-center gap-3 ">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 flex justify-center items-center rounded-full bg-slate-50 border hover:bg-transparent hover:text-slate-50 transition-all duration-200 shadow-md"
            aria-label="GitHub"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 flex justify-center items-center rounded-full bg-slate-50 border hover:bg-transparent hover:text-slate-50 transition-all duration-200 shadow-md"
            aria-label="Twitter"
          >
            <FaXTwitter size={30} />
          </a>
        </div>
      </header>

      <main className="w-full px-4 lg:px-8 mt-24 py-16 flex flex-col items-center">
        <div className="text-center mb-10">
          <h1 className="text-7xl sm:text-9xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg animate-fade-in">
            TlipTube
          </h1>
          <p className="text-2xl text-slate-200 py-10 max-w-2xl mx-auto animate-fade-in">
            Download videos from{" "}
            <span className="text-pink-400 font-semibold">YouTube</span>,{" "}
            <span className="text-blue-400 line-through font-semibold">  Facebook</span>,{" "}
            <span className="text-slate-50 line-through font-semibold">  Twitter</span>,{" "}
            <span className="text-purple-400 line-through font-semibold">Instagram</span>,
            <span className="line-through">and many other websites.</span>
          </p>
        </div>
        <form
          onSubmit={handleDownloads}
          className="flex flex-col items-center gap-5 w-full max-w-xl bg-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-white/10 animate-fade-in"
        >
          <input
            type="text"
            placeholder="Paste video link here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full py-3 px-6 text-lg rounded-3xl bg-slate-50 text-slate-900 outline-none border-2 border-transparent focus:border-pink-400 transition-all duration-200 shadow"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 inline-flex items-center justify-center gap-2 text-slate-50 font-bold py-3 px-10 rounded-full shadow-lg hover:scale-105 hover:from-pink-400 hover:to-blue-400 transition-all duration-300 text-lg"
          >
            <LuDownload size={22} className="animate-bounce" />
            Download
          </button>
        </form>
        <div className="mt-10 flex flex-col items-center gap-2 text-slate-400 text-sm animate-fade-in">
          <span>
            <FaDownload className="inline mr-1 text-pink-400" />
            Fast, free, and unlimited downloads.
          </span>
          <span>
            <span className="text-blue-400 font-semibold">No signup</span>{" "}
            required.
          </span>
        </div>
      </main>
      {/* Animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 1s cubic-bezier(.4,0,.2,1) both;
          }
        `}
      </style>
    </div>
  );
}
