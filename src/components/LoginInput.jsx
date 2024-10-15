import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
function LoginInput({ onAuthLogin }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    onAuthLogin({ email, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form px-4">
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="inputEmail"
            value={email}
            onChange={onEmailChange}
            className="form-control"
            placeholder="email@example.com"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            value={password}
            onChange={onPasswordChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-4 text-end">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}
LoginInput.propTypes = {
  onAuthLogin: PropTypes.func.isRequired,
};
export default LoginInput;
