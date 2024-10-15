import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";
const ActionType = {
  SET_IS_AUTH_REGISTER: "SET_IS_AUTH_REGISTER",
};
function setIsAuthRegisterActionCreator(isAuthRegister) {
  return {
    type: ActionType.SET_IS_AUTH_REGISTER,
    payload: {
      isAuthRegister,
    },
  };
}
function asyncSetIsAuthRegister({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.postAuthRegister({ name, email, password });
      dispatch(setIsAuthRegisterActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
      dispatch(setIsAuthRegisterActionCreator(false));
    }
    dispatch(hideLoading());
  };
}
export { ActionType, setIsAuthRegisterActionCreator, asyncSetIsAuthRegister };
