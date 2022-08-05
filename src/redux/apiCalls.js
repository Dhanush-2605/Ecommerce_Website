import { loginStart, loginSuccess, loginFailure } from "./userRedux";
import axios from "axios";
import { publicRequest } from "../requestMethod";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post(
      "http://localhost:5000/api/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
    console.log("form login");

    console.log(res.data);
  } catch (err) {
    dispatch(loginFailure());
  }
};
