import React, { useEffect } from "react";
import { createBrowserRouter, Link } from "react-router-dom";
import JoinForm from "./pages/JoinForm";
import OnlineUsers from "./pages/OnlineUsers";
import ChatPage from "./pages/ChatPage";
import { useContextProvider } from "./context/ContextProvider.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/join",
    element: <JoinForm />,
  },
  {
    path: "/active",
    element: <OnlineUsers />,
  },
  {
    path: "/chart/:id",
    element: <ChatPage />,
  },
]);

function App() {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-teal-400 h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Floating animation elements */}
      <div className="absolute top-10 left-10 bg-white rounded-full w-24 h-24 opacity-20 animate-ping"></div>
      <div className="absolute bottom-20 right-10 bg-white rounded-full w-32 h-32 opacity-30 animate-bounce"></div>
      <div className="absolute bottom-40 left-20 bg-white rounded-full w-16 h-16 opacity-20 animate-pulse"></div>

      {/* Hero Content */}
      <div className="text-center space-y-5 px-5">
        <h1 className="text-5xl font-bold tracking-tight">
          Real-Time Conversations at Your Fingertips
        </h1>
        <p className="text-xl max-w-xl mx-auto">
          Experience instant, secure messaging like never before with our
          real-time chat application. Connect with friends and family in a
          seamless and fast environment.
        </p>
        <button className="mt-5 bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-teal-400 hover:text-white transition duration-300 ease-in-out">
          <Link to={"/join"}>start</Link>
        </button>
      </div>

      {/* Animated Chat Illustration */}
      <div className="absolute bottom-10 w-full flex justify-center">
        <div className="relative">
          <div className="absolute w-48 h-48 bg-teal-300 rounded-full opacity-30 blur-xl -bottom-12 -left-16 animate-bounce"></div>
          <div className="relative bg-white p-4 rounded-lg shadow-lg w-80 flex justify-between items-center transform hover:scale-105 transition duration-500 ease-in-out">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-800">
                Chat with John
              </h3>
              <p className="text-gray-600">Hey! Are we meeting today?</p>
            </div>
            <div className="bg-teal-500 text-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 17h8m0 0l-8-8m8 8H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
