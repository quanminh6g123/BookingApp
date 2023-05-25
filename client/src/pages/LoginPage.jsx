import { Link } from "react-router-dom";
export default function LoginPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32 border p-5 border-1 border-gray-300 rounded-xl">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Sign in
        </h1>
        <form className="max-w-md mx-auto">
          <label className="text-m font-medium text-gray-900">
            {"Your email"}
          </label>
          <input type="email" placeholder={"your@email.com"} />
          <label className="text-m font-medium text-gray-900">
            {"Your password"}
          </label>
          <input type="password" placeholder="••••••••" />
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
