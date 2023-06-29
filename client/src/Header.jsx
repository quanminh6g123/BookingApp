import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const [find, setFind] = useState("");
  const userInfo = useContext(UserContext);

  return (
    <header className="flex justify-between px-10 mb-7">
      <Link
        to={"/"}
        className="flex items-center gap-1 text-primary md:pl-2 lg:pl-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>
        <span className="font-bold text-2xl text-primary hidden md:flex">
          StayEasy
        </span>
      </Link>
      <form
        className="flex items-center w-2/5 mx-10"
        action={find.trim() !== "" ? "/find/" + find : "#"}
      >
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            value={find}
            onChange={(ev) => setFind(ev.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900  rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search your destination..."
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
        >
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
      <div>
        {!userInfo.user ? (
          <div>
            <Link
              to="/register"
              type="button"
              className="text-primary bg-white hover:bg-gray-100 border-primary border-2 rounded-full px-5 py-2.5 text-center mr-2 mb-2 font-semibold"
            >
              Register
            </Link>
            <Link
              to="/login"
              type="button"
              className="text-white bg-primary hover:bg-blue-800 border-primary border-2 rounded-full px-5 py-2.5 text-center mr-2 mb-2 font-semibold "
            >
              Log in
            </Link>
          </div>
        ) : (
          <div className="md:pr-2 lg:pr-5">
            <Link to={"/account/profile"} className="flex gap-2 items-center">
              <h1 className="font-semibold text-primary text-lg hidden md:flex">
                {userInfo.user["email"]}
              </h1>
              <img
                className="h-12 border-2 rounded-full"
                src="https://i.pinimg.com/originals/39/a4/71/39a47159059f38a954d77e5dcae6f0db.jpg"
                alt="avatar"
              />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
