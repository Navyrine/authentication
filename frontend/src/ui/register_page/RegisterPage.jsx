import React, { useState } from "react";
import InputField from "../../components/InputField";
import "./RegisterPage.css";

function RegisterPage() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  function handleOnChangeUsername(event) {
    setUsername(event.target.value);
  }

  function handleOnChangePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <div className="register-container">
        <h1 className="register-title">Register Page</h1>
        <form>
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
