import { ERROR } from "../constants/actionTypes";
export default (error = {}, action) => {
  switch (action.type) {
    case ERROR:
      console.log("WTF");
      return (error = action.payload);
    default:
      return error;
  }
};
