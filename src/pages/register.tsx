import { Helmet } from "react-helmet";
import RegisterLayout from "../components/layout/RegisterLayout";

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <RegisterLayout />
    </div>
  );
};

export default Register;
