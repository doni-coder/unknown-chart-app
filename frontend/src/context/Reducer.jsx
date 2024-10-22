const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_ONLINE_USERS":
      return {
        ...state,
        onlineUsers: action.payload,
      };

    case "SET_MESSAGES":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case "SET_USERID":
      return {
        ...state,
        userId: action.payload,
      };

    case "SET_RECEIVERID":
      return {
        ...state,
        recipientId: action.payload,
      };

    case "SET_NOTIFICATION":
      return {
        ...state,
        notification: action.payload,
      };

    case "SET_SEARCH_VALUE":
      const value = action.payload;
      const newUserList = state.onlineUsers.filter((user) =>
        user.includes(value)
      );
      const remainingUsers = state.onlineUsers.filter(
        (user) => !user.includes(value)
      );
      console.log("newUserList:", newUserList);
      return {
        ...state,
        searchUser: value,
        onlineUsers: [...newUserList, ...remainingUsers],
      };

    case "SET_TYPING":
      return{
        ...state,
        typing: action.payload,
      }

    case "SET_LOADING":
      return{
        ...state,
        loading: false,
      }

    default:
      return {
        state,
      };
  }
};

export default Reducer;
