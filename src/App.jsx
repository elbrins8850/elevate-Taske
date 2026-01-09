
import { useState } from "react";
import { Link, Route, Routes } from 'react-router-dom';
import Posts from "@/pages/Posts";
import PostDetails from "@/pages/PostDetails";
import CreatePost from "@/pages/CreatePost";
import { Navigate } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";


const App = () => {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark", !dark);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">


      <div className="all">
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/posts/create" element={<CreatePost/>} />
          </Routes>
        </main>
        <button
          className="mb-4 px-4 py-2 rounded bg-primary text-white btn"
          onClick={toggleDark}
        >
          {dark ? <CiLight size={24} /> : <MdDarkMode size={24} />}
        </button>
      </div>
    </div>
  )
}

export default App
