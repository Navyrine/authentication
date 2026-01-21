import React, { useState } from "react";
import InputField from "../../components/InputField";
import useAuth from "../../auth/useAuth";
import "./RegisterPage.css";

function RegisterPage() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const { handleRegister } = useAuth();

  function handleOnChangeUsername(event) {
    setUsername(event.target.value);
  }

  function handleOnChangePassword(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await handleRegister(username, password);
      alert("Success register");
    } catch (err) {
      console.log("failed register");
    }
  }

  return (
    <>
      <div className="register-container">
        <h1 className="register-title">Register Page</h1>
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
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
