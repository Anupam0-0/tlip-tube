import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LuDownload } from "react-icons/lu";
import { useState } from "react";
import axios from "axios";


export default function App() {

  const [url, setUrl] = useState("");


  const handleDownloads = async(e) => {
    e.preventDefault();
    try {
      if (!url) {
        alert("Please enter a valid YouTube URL");
        return;
      }
      try {
        // Redirect to backend download endpoint
        window.location.href = `http://localhost:3000/download?url=${encodeURIComponent(
          url
        )}`;
      } catch (err) {
        console.error(err);
        alert("Error downloading the video");
      }
      
    } catch (error) {
      console.error("Error downloading video:", error);
      alert("Failed to download video. Please try again.");
    }
    
  }

  const checkBackend = async() => {
    try {
      const response = await axios.get("http://localhost:3000/");
      alert(response.data);
    } catch (error) {
      console.error("Error checking backend:", error);
      alert("Failed to connect to backend. Please try again.");
    }
  }

  return (
    <div className="bg-gray-950 h-screen flex ">
      <header className="w-full py-7 px-4 lg:px-8 z-5 bg-transparent flex justify-between items-center border-b fixed">
        <a href="/" className="font-bold text-4xl text-slate-200 hover:text-blue-500 "> TlipTube </a>
        <div className="flex items-center gap-3 ">
          <button className="h-9 w-9 sm:w-fit sm:scale-100 sm:py-4 sm:px-4 flex justify-center items-center rounded-3xl bg-slate-50 border hover:bg-transparent hover:text-slate-50 "> <FaGithub /> &nbsp; <span className="hidden sm:block">Star me on Github</span> </button>
          <button className="h-9 w-9 sm:w-fit sm:scale-100 sm:py-4 sm:px-4 flex justify-center items-center rounded-3xl bg-slate-50 border hover:bg-transparent hover:text-slate-50"> <FaXTwitter /> &nbsp; <span className="hidden sm:block">Follow me on Twitter</span></button>
        </div>
      </header>

      <main className="w-full px-4 lg:px-8 mt-20 py-16">
        <div className="text-center mb-8 ">
        <h1 className="text-8xl sm:text-9xl font-bold text-pink-500 ">TlipTube</h1>
        <p className="text-2xl text-slate-200 py-10">
          Download videos from YouTube, Facebook, Twitter, Instagram, and many other websites.
        </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <input type="text" placeholder="Paste video link here" value={url} onChange={(e) => setUrl(e.target.value)}
            className="w-[85vw] lg:w-[50vw] py-2.5 px-5 text-lg rounded-lg bg-slate-50 text-slate-900 outline-none" />
          <button onClick={handleDownloads}
          className="w-52 py-3 px-4 rounded-lg shadow shadow-slate-50 text-slate-50 my-5 font-bold flex items-center justify-center active:scale-95"> <LuDownload /> &nbsp;  Download</button>
        </div>
        {/* <button className="bg-rose-500 p-10" onClick={checkBackend}>
            Check
        </button> */}
      </main>    

    </div>
  )
}