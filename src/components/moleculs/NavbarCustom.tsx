import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

type NavbarCustomProps = {
  nameUser: string;
};

const NavbarCustom = ({ nameUser }: NavbarCustomProps) => {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <h1 className="flex-1 text-2xl font-bold text-left text-fuchsia-500">
        Dashboard
      </h1>
      <div className="flex gap-5 justify-center items-center">
        <p>Welcome,{nameUser}</p>
        <Button
          color="fuchsia"
          onclick={Logout}
          type="button"
          title="Logout"
        />
      </div>
    </div>
  );
};

export default NavbarCustom;
