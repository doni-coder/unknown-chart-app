import React from "react";

function Bubble({ isSender, message,sender }) {
  return (
    <div
      className={`flex w-full items-center my-5 ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      {
        isSender?(<p></p>):(<p className="ml-2 mt-[-30px] text-white font-medium">&rarr; {"you"}</p>)
      }
      <div
        className={`max-w-[250px] break-words rounded-md px-3 py-2 mx-4 text-white ${
          isSender ? "bg-gray-700" : "bg-gray-900"
        }`}
      >
        <p className="text-wrap">{message}</p>
      </div>
      {
        isSender?(<p className="font-medium mr-2 mt-[30px] text-white"><span>&larr;</span> {sender}</p>):(<p></p>)
      }
    </div>
  );
}

export default Bubble;
