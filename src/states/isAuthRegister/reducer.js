import { ActionType } from "./action";
function isAuthRegisterReducer(isAuthRegister = false, action = {}) {
  switch (action.type) {
    case ActionType.SET_IS_AUTH_REGISTER:
      return action.payload.isAuthRegister;
    default:
      return isAuthRegister;
  }
}
export default isAuthRegisterReducer;
