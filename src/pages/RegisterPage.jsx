import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RegisterInput from "../components/RegisterInput";
import { asyncSetIsAuthRegister } from "../states/isAuthRegister/action";
function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthRegister = false } = useSelector((states) => states);
  if (isAuthRegister) navigate("/");
  const onAuthRegister = ({ name, email, password }) => {
    dispatch(asyncSetIsAuthRegister({ name, email, password }));
  };
  return (
    <div className="container pt-2">
      <RegisterInput onAuthRegister={onAuthRegister} />
    </div>
  );
}
export default RegisterPage;
