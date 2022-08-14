import { loginStart, loginSuccess, loginFailure } from "./userRedux";
import { publicRequest } from "../requestMethod";
import { notifySuccess, notifyFailure } from "../Components/alert";
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post(
      "http://localhost:5000/api/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
    console.log(res);
   
    console.log(res.data);
  } catch (err) {
    console.log(err);
    dispatch(loginFailure());
    notifyFailure(err);
  }
};
