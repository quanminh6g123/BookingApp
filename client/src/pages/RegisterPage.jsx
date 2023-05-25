import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");

  function registerUser(ev) {
    ev.preventDefault();
    axios.post("/register", {
      firstName,
      lastName,
      email,
      password,
    });
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32 border p-5 border-1 border-gray-300 rounded-xl">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Sign up
        </h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <label className="text-m font-medium text-gray-900">
            {"Your name"}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={"First name"}
              value={firstName}
              onChange={(ev) => setFirstName(ev.target.value)}
            />
            <input
              type="text"
              placeholder={"Last name"}
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
            />
          </div>
          <label className="text-m font-medium text-gray-900"></label>
          <label className="text-m font-medium text-gray-900">
            {"Your email"}
          </label>
          <input
            type="email"
            placeholder={"your@email.com"}
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <label className="text-m font-medium text-gray-900">
            {"Your password"}
          </label>
          <input
            type="password"
            placeholder="••••••••••••••••"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <label className="text-m font-medium text-gray-900">
            {"Confirm password"}
          </label>
          <input
            type="password"
            placeholder="••••••••••••••••"
            value={cfPassword}
            onChange={(ev) => setCfPassword(ev.target.value)}
          />
          <button className="login-button">Register</button>
          <div className="text-center py-2 text-gray-900">
            {"Already a member? "}
            <Link className="font-semibold underline" to={"/login"}>
              {"Sign in"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
