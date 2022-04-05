import { SIGN_UP, SIGN_IN, SIGN_OUT, ERROR } from "../constants/actionTypes";
import * as api from "../api";

export const signUp = (userData) => async (dispatch) => {
  try {
    const { data } = await api.signUp(userData);
    console.log(data);
    return dispatch({ type: SIGN_UP, payload: data });
  } catch (error) {
    return dispatch({
      type: ERROR,
      payload: {
        message: "Username already exists",
        redirect: "/auth",
      },
    });
  }
};

export const signIn = (userData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(userData);
    console.log(data);
    return dispatch({ type: SIGN_IN, payload: data });
  } catch (error) {
    return dispatch({
      type: ERROR,
      payload: {
        message: "Username or password is incorrect",
        redirect: "/auth",
      },
    });
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await api.signOut();
    return dispatch({ type: SIGN_OUT });
  } catch (error) {
    console.log(error.message);
  }
};
