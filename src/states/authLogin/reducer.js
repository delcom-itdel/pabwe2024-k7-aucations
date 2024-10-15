import { ActionType } from "./action";
function authLoginReducer(authLogin = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_AUTH_LOGIN:
      return action.payload.authLogin;
    case ActionType.UNSET_AUTH_LOGIN:
      return null;
    default:
      return authLogin;
  }
}
export default authLoginReducer;
