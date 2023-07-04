import LoginLayout from "../components/layout/LoginLayout";
import { Helmet } from "react-helmet";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Helmet>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/Union.svg"
        />
        <title>Login</title>
      </Helmet>
      <LoginLayout />
    </div>
  );
};

export default Login;
