import { useDispatch, useSelector } from "react-redux";
import { login, lightsOn } from "../../redux/actions";
function Login() {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);

  function handleClickUserLoginClick() {
    dispatch(login("user"));
    dispatch(lightsOn());
  }

  function handleSupplierLoginClick() {
      dispatch(login("supplier"));
      dispatch(lightsOn());
  }


  return (
    <div
      className="login-container bg-soft-gray rounded-small"
      data-testid="login"
    >
      <div className="title-login">OPEN VENDING MACHINE</div>
      <button
        className="rounded-small text-white"
        onClick={handleClickUserLoginClick}
        data-testid="user-login-button"
      >
        Customer
      </button>
      {loginState.remainingAttempt > 0 && (
        <>
          <button
            className="rounded-small text-white"
            onClick={handleSupplierLoginClick}
            data-testid="supplier-login-button"
          >
            Supplier
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
