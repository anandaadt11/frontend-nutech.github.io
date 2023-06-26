import { Link } from "react-router-dom";
import FormLogin from "../organisms/FormLogin";

const LoginLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center w-96">
      <div className="w-full p-3">
        <h1 className="text-3xl font-bold text-left text-fuchsia-500">Login</h1>
        <p className="text-slate-500">Login with your account</p>
      </div>
      <div className="w-full p-3">
        <FormLogin />
      </div>
      <p>
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-fuchsia-500 hover:text-fuchsia-700"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginLayout;
