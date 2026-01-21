import React, { useState } from "react";
import InputField from "../../components/InputField";
import useAuth from "../../auth/useAuth";
import "./LoginPage.css";

function LoginPage() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const { handleLogin } = useAuth();

  function handleOnChangeUsername(event) {
    setUsername(event.target.value);
  }

  function handleOnChangePassword(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await handleLogin(username, password);
      alert("Success login");
    } catch (err) {
      console.log("failed login");
    }
  }

  return (
    <>
      <div className="register-container">
        <h1 className="register-title">Login Page</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            id="username"
            className="username-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleOnChangeUsername}
          />
          <InputField
            id="password"
            className="password-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleOnChangePassword}
          />

          <button className="register-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
