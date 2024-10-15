import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { asyncPreloadProcess } from "../isPreload/action";
import { showErrorDialog } from "../../utils/tools";
const ActionType = {
  SET_IS_USER_CHANGE_PHOTO: "SET_IS_USER_CHANGE_PHOTO",
};
function setIsUserChangePhotoActionCreator(isUserChangePhoto) {
  return {
    type: ActionType.SET_IS_USER_CHANGE_PHOTO,
    payload: {
      isUserChangePhoto,
    },
  };
}
function asyncSetIsUserChangePhoto({ photoFile }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.postChangePhotoProfile({ photoFile });
      dispatch(setIsUserChangePhotoActionCreator(true));
      dispatch(asyncPreloadProcess());
    } catch (error) {
      showErrorDialog(error.message);
      dispatch(setIsUserChangePhotoActionCreator(false));
    }
    dispatch(hideLoading());
  };
}
export {
  ActionType,
  setIsUserChangePhotoActionCreator,
  asyncSetIsUserChangePhoto,
};
