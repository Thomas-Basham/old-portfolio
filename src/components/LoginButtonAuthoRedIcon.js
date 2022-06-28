import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButtonAuthoRedIcon = () => {
  const { loginWithRedirect } = useAuth0();
  
  return (
    <button
      onClick={() => loginWithRedirect()}
      style={{
        padding: 0,
        border: "none",
        background: "none",
      }}
    >
      <span
        className="iconify slider-iconfiy"
        data-icon="twemoji:green-circle"
        data-inline="false"
      ></span>
    </button>
  );
};

export default LoginButtonAuthoRedIcon;
