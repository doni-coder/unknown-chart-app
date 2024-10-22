import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Reducer from "./Reducer.jsx";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";

const globalState = createContext({});

export const ContextProvider = ({ children }) => {
  const initialState = {
    messages: [],
    userId: null,
    recipientId: "",
    onlineUsers: [],
    notification: {
      message: "",
      notify: false,
      shouldNavigate: true,
      userId: "",
    },
    searchUser: "",
    typing: {
      senderId: "",
      typing: false,
      recipientId: "",
    },
  };
  const [socket, setSocket] = useState();
  const [message, setMessage] = useState();

  const [context, reducer] = useReducer(Reducer, initialState);
  useEffect(() => {
    console.log("Effect running: context.userId changed to:", context.userId);
    if (context.userId) {
      const userId = context.userId;
      const newSocket = io(process.env.URL, {
        query: { userId },
      });
      setSocket(newSocket);
      newSocket.on("getOnlineUsers", (users) => {
        reducer({ type: "SET_ONLINE_USERS", payload: users });
      });

      newSocket.on("exist_user", (data) => {
        reducer({ type: "SET_NOTIFICATION", payload: data });
        toast.error(data.message);
      });

      if (context.userId === context.notification.userId) {
        return;
      }

      newSocket.on("user_joined", (data) => {
        reducer({ type: "SET_NOTIFICATION", payload: data });
        toast.success(data.message);
      });

      newSocket.on("typing_msg", (data) => {
        reducer({ type: "SET_TYPING", payload: data });
      });

      newSocket.on("receive_message", ({ senderId, message, receiverId }) => {
        reducer({
          type: "SET_MESSAGES",
          payload: { senderId, message, receiverId },
        });
      });
      return () => newSocket.disconnect();
    }
  }, [context.userId]);

  useEffect(() => {
    console.log(context.typing);
    console.log(context.recipientId);
  }, [context]);

  const sendMessage = () => {
    if (socket && context.recipientId && message) {
      const recipientId = context.recipientId;
      socket.emit("send_message", { recipientId, message });
      reducer({
        type: "SET_MESSAGES",
        payload: {
          senderId: context.userId,
          message,
          receiverId: context.recipientId,
        },
      });
      setMessage("");
    }
  };

  const startTyping = () => {
    if (socket && context.recipientId) {
      const recipientId = context.recipientId;
      socket.emit("typing", { recipientId, typing: true });
    }
  };

  const stopTyping = () => {
    if (socket && context.recipientId) {
      const recipientId = context.recipientId;
      socket.emit("typing", { recipientId, typing: false });
    }
  };

  return (
    <globalState.Provider
      value={{
        context,
        reducer,
        sendMessage,
        setMessage,
        message,
        startTyping,
        stopTyping,
      }}
    >
      <div>
        <ToastContainer
          position="top-center"
          autoClose={4952}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {children}
      </div>
    </globalState.Provider>
  );
};

export const useContextProvider = () => {
  return useContext(globalState);
};
