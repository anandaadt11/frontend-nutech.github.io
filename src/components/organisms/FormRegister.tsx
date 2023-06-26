import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../moleculs/Input";
import Button from "../moleculs/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [massage, setMassage] = useState("");
  const navigate = useNavigate();

  const register = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
      });
      navigate("/");
    } catch (e: any) {
      if (e.response) {
        setMassage(e.response.data);
      }
    }
  };

  const handleTogglePassword = (e: SyntheticEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <form onSubmit={register}>
      <Input
        title="Name"
        placeholder="Name"
        type="text"
        value={name}
        onchange={(e) => setName(e.target.value)}
      />
      <Input
        title="Email"
        placeholder="Email address"
        type="email"
        value={email}
        onchange={(e) => setEmail(e.target.value)}
      />
      <div className="mb-6 relative">
        <label
          htmlFor="password"
          className="block mb-2 font-bold text-gray-900"
        >
          Password
        </label>
        <input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5"
        />
        <button
          onClick={handleTogglePassword}
          className="ml-2 p-2 rounded  absolute top-8 right-2 bottom-0"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>

      <div className="w-full my-5">
        <Button
          color="fuchsia"
          type="submit"
          title="Register"
          width="w-full"
        />
      </div>
    </form>
  );
};

export default FormRegister;
