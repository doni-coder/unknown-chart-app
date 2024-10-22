import React, { useState, useEffect } from "react";
import { useContextProvider } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function JoinForm() {
  const [chatId, setChatId] = useState("");
  const { reducer, context } = useContextProvider();
  const navigate = useNavigate();

  const handleJoin = () => {
    reducer({ type: "SET_USERID", payload: chatId });
    navigate("/Active");
  };

  if (
    context.notification.shouldNavigate === true &&
    context.notification.notify === true
  ) {
    navigate("/Active");
  }

  console.log("before:", context.notification);
  return (
    <div className="w-full flex relative bg-gradient-to-r from-blue-500 to-teal-400 justify-center items-center  h-[100vh]">
      {/* Floating animation elements */}
      <div className="absolute top-10 left-10 bg-white rounded-full w-24 h-24 opacity-20 animate-ping"></div>
      <div className="absolute bottom-20 right-10 bg-white rounded-full w-32 h-32 opacity-30 animate-bounce"></div>
      <div className="absolute bottom-40 left-20 bg-white rounded-full w-16 h-16 opacity-20 animate-pulse"></div>

      <div className="w-[300px] items-center flex flex-col justify-center h-[210px] p-3 shadow-2xl rounded-md bg-slate-50">
        <h3 className=" font-medium text-base">Join chart</h3>
        <div className="w-[100%]">
          <label
            name="text"
            className=" text-sm font-medium text-gray-500"
            htmlFor=""
          >
            chat id :
          </label>
          <br />
          <input
            autoFocus={true}
            placeholder="Enter chartId ..."
            style={{ backgroundColor: "#e4e4e799" }}
            className=" w-full outline-teal-600 px-2 py-[6px] text-[12px] rounded-md"
            name="text"
            value={chatId}
            type="text"
            onChange={(e) => setChatId(e.target.value)}
          />
          <button
            onClick={handleJoin}
            className="block border active:scale-x-90 transition active:scale-y-90 mt-3 text-white w-full bg-teal-500 px-3 py-1 rounded-md"
          >
            join
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinForm;
