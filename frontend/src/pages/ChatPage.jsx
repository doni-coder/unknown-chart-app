import React, { useEffect, useState } from "react";
import Bubble from "../component/chat bubble/Bubble";
import { IoIosSend } from "react-icons/io";
import { MdPersonPin } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useContextProvider } from "../context/ContextProvider";
import Typing from "../component/typing bubble/Typing";

function ChatPage() {
  const { id } = useParams();
  const [personalMessage, setPersonalMessage] = useState([]);
  const {
    message,
    setMessage,
    sendMessage,
    context,
    reducer,
    startTyping,
    stopTyping,
  } = useContextProvider();

  useEffect(() => {
    if (id) {
      reducer({ type: "SET_RECEIVERID", payload: id });
    }
  }, [id, reducer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    stopTyping();
  };

  useEffect(() => {
    setPersonalMessage(
      context.messages.filter((message) => {
        return (
          (message.senderId === context.userId && message.receiverId === id) ||
          (message.senderId === id && message.receiverId === context.userId)
        );
      })
    );
    console.log(context.messages);
  }, [context.messages]);

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-teal-400  h-[100vh] overflow-y-scroll">
      <div className="w-full absolute sticky top-[0%] flex items-center px-5 bg-white/30 backdrop-blur-md shadow-lg h-[75px]">
        <MdPersonPin fontSize={45} color="white" />
        <h3 className="text-white ml-2 font-semibold">{id}</h3>
      </div>
      <div>
        {personalMessage.map((message) => {
          return (
            <Bubble
              sender={message.senderId}
              key={Math.random()}
              isSender={message.senderId !== context.userId}
              message={message.message}
            />
          );
        })}
        {context.typing.typing &&
        context.typing.senderId === context.recipientId &&
        context.userId == context.typing.recipientId ? (
          <Typing id={context.recipientId} />
        ) : (
          <></>
        )}
      </div>
      <div className="w-full fixed bottom-0 flex items-center px-5 bg-white h-[60px]">
        <form className="flex w-full" action="">
          <div className="w-[80%]">
            <input
              placeholder="write messages ..."
              className="w-full h-10 outline-none px-3 rounded-l-md"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                startTyping();
              }}
              type="text"
              autoFocus={true}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-[20%] text-white text-center flex justify-center items-center rounded-full bg-teal-500"
          >
            <IoIosSend fontSize={30} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
