import { SIGN_UP, SIGN_IN, SIGN_OUT } from "../constants/actionTypes";
export default (user = null, action) => {
  switch (action.type) {
    case SIGN_UP:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return (user = action.payload);
    case SIGN_IN:
      console.log("test");
      localStorage.setItem("user", JSON.stringify(action.payload));
      return (user = action.payload);
    case SIGN_OUT:
      console.log("test");
      localStorage.removeItem("user");
      return (user = null);
    default:
      return user;
  }
};
