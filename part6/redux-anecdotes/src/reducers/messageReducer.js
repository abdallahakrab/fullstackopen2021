const initialState = "default message";

export const setMessage = (text) => ({
  type: "SET_MESSAGE",
  data: text,
});

export const removeMessage = () => ({
  type: "REMOVE_MESSAGE",
});

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE": {
      return action.data;
    }
    case "REMOVE_MESSAGE": {
      return "";
    }
    default:
      return state;
  }
};

export default messageReducer;
