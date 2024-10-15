import { ActionType } from "./action";
function isUserChangePhotoReducer(isUserChangePhoto = false, action = {}) {
  switch (action.type) {
    case ActionType.SET_IS_USER_CHANGE_PHOTO:
      return action.payload.isUserChangePhoto;
    default:
      return isUserChangePhoto;
  }
}
export default isUserChangePhotoReducer;
