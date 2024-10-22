import React, { useEffect, useState } from "react";
import Box from "../component/userBox/Box";
import { MdPersonPin } from "react-icons/md";
import { useContextProvider } from "../context/ContextProvider.jsx";
import { Link, useNavigate } from "react-router-dom";
import JoinForm from "./JoinForm.jsx";

function OnlineUsers() {
  const { context, reducer } = useContextProvider();
  const navigate = useNavigate();

  const handleOnchange = (e) => {
    reducer({ type: "SET_SEARCH_VALUE", payload: e.target.value });
  };

  if (!context.onlineUsers) {
    return (
      <div className="py-8 h-screen overflow-y-scroll text-white bg-gradient-to-r from-blue-500 to-teal-400">
        Loading...
      </div>
    ); // Optional fallback during initial load
  }

  console.log("afte:", context.notification);

  if (context.notification.shouldNavigate === false) {
    navigate("/join");
    console.log("join page");
    console.log("after fff:", context.notification);
    return (
      <div className="py-8 h-screen overflow-y-scroll bg-gradient-to-r from-blue-500 to-teal-400">
        <h3>First join with your chart Id</h3>
        <Link to={"/join"}>
          <h3>join</h3>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 h-screen overflow-y-scroll bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="px-5 py-3">
        <div className="flex gap-3 items-center">
          <MdPersonPin fontSize={55} color="white" />
          <div>
            <h2 className="text-white font-bold text-xl">Active Users</h2>
            <p className="font-semibold text-white">
              your chart Id :{" "}
              <span className="text-slate-900">{context.userId}</span>
            </p>
          </div>
        </div>
        <input
          autoFocus={true}
          type="text"
          className="border-slate-400 outline-slate-400 border py-1 mt-2 px-2 rounded-md"
          placeholder="search"
          value={context.searchUser}
          onChange={handleOnchange}
        />
      </div>
      <div>
        {context.onlineUsers.length > 1 ? (
          context.onlineUsers.map((user, index) => {
            if (context.userId === user) {
              return;
            }
            return <Box user={user} key={index} />;
          })
        ) : (
          <div>
            <p className="text-center text-white font-bold mt-5">
              no users available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default OnlineUsers;
