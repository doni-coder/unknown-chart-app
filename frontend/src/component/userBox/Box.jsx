import React from "react";
import { MdPersonPin } from "react-icons/md";
import { Link } from "react-router-dom";

function Box({ user }) {
  return (
    <Link to={`/chart/${user}`}>
      <div className="md:w-[400px] active:scale-x-90 flex items-center transition active:scale-y-90 ml-[50%] translate-x-[-50%] px-3 py-[17px] mt-2 w-[90%] bg-white/30 backdrop-blur-md rounded-lg shadow-lg">
        <MdPersonPin fontSize={40} color="white" />
        <h3 className="ml-2 font-bold text-gray-100">{user}</h3>
      </div>
    </Link>
  );
}

export default Box;
