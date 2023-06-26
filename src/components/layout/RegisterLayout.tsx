import { Link } from "react-router-dom";
import FormRegister from "../organisms/FormRegister";

const RegisterLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center w-96">
      <div className="w-full p-3">
        <h1 className="text-3xl font-bold text-left text-fuchsia-500">
          Register
        </h1>
        <p className="text-slate-500">Create your account</p>
      </div>
      <div className="w-full p-3">
        <FormRegister />
      </div>
      <p>
        have an account?{" "}
        <Link
          to="/"
          className="text-fuchsia-500 hover:text-fuchsia-700"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterLayout;
