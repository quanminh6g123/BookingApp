import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      alert("Login successful.");
      setUser(data);
      setRedirect(true);
    } catch (error) {
      alert("Login failed.");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32 border p-5 border-1 border-gray-300 rounded-xl">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Sign in
        </h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <label className="text-m font-medium text-gray-900">
            {"Your email"}
          </label>
          <input
            className="input-log"
            type="email"
            placeholder={"your@email.com"}
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <label className="text-m font-medium text-gray-900">
            {"Your password"}
          </label>
          <input
            className="input-log"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="login-button">Login</button>
          <div className="text-center py-2 text-gray-900">
            {"Don't have an account yet? "}
            <Link className="font-semibold underline" to={"/register"}>
              {"Sign up"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
