import React from "react";

function Typing({ id }) {
  return (
    <div class="flex space-x-2 mx-3 justify-end items-center">
      <span class="text-sm font-semibold text-gray-200">{id} Typing </span>
      <div class="flex space-x-1">
        <div class="h-2 w-2 bg-gray-300 rounded-full animate-bounce"></div>
        <div class="h-2 w-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
        <div class="h-2 w-2 bg-gray-300 rounded-full animate-bounce delay-400"></div>
      </div>
    </div>
  );
}

export default Typing;
