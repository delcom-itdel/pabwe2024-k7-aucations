import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";
const ActionType = {
  SET_AUTH_LOGIN: "SET_AUTH_LOGIN",
  UNSET_AUTH_LOGIN: "UNSET_AUTH_LOGIN",
};
function setAuthLoginActionCreator(authLogin) {
  return {
    type: ActionType.SET_AUTH_LOGIN,
    payload: {
      authLogin,
    },
  };
}
function unsetAuthLoginActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_LOGIN,
    payload: {
      authLogin: null,
    },
  };
}
function asyncSetAuthLogin({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.postAuthLogin({ email, password });
      api.putAccessToken(token);
      const authLogin = await api.getMe();
      dispatch(setAuthLoginActionCreator(authLogin));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}
function asyncUnsetAuthLogin() {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetAuthLoginActionCreator());
    api.putAccessToken("");
    dispatch(hideLoading());
  };
}
export {
  ActionType,
  setAuthLoginActionCreator,
  unsetAuthLoginActionCreator,
  asyncSetAuthLogin,
  asyncUnsetAuthLogin,
};
