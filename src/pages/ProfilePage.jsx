import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserDetail from "../components/UserDetail";
import {
  asyncSetIsUserChangePhoto,
  setIsUserChangePhotoActionCreator,
} from "../states/isUserChangePhoto/action";
function ProfilePage() {
  const dispatch = useDispatch();
  const { authLogin, isUserChangePhoto = false } = useSelector(
    (states) => states
  );
  useEffect(() => {
    if (isUserChangePhoto) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Berhasil mengubah photo profile!",
        showConfirmButton: false,
        timer: 1200,
      });
      dispatch(setIsUserChangePhotoActionCreator(false));
    }
  }, [isUserChangePhoto, dispatch]);
  const onUserChangePhoto = ({ photoFile }) => {
    dispatch(asyncSetIsUserChangePhoto({ photoFile }));
  };
  return (
    <section>
      <div className="container pt-1">
        <UserDetail
          authLogin={authLogin}
          onUserChangePhoto={onUserChangePhoto}
        ></UserDetail>
      </div>
    </section>
  );
}
export default ProfilePage;
