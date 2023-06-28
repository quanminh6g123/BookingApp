import { useContext, useState, useEffect } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const [userDoc, setUserDoc] = useState(null);

  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[3];
  if (subpage === undefined) {
    subpage = "profile";
  }

  function linkClasses(type = null) {
    let classes = "flex items-center gap-2 pr-3 py-1.5 my-3";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full  pl-3";
    }
    return classes;
  }

  useEffect(() => {
    axios.get("/user").then((response) => {
      setUserDoc(response.data);
    });
  }, []);

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav />
      {userDoc && (
        <div className="flex justify-center pt-10 px-10">
          <div className="border-r-2 px-10">
            <h1 className="font-semibold lg:text-2xl lg:pb-6 md:pb-2 md:text-xl">
              Profile settings
            </h1>
            <Link className={linkClasses("profile")} to={"/account/profile"}>
              <span className="material-symbols-outlined">person</span>
              <h1 className="font-semibold">Details</h1>
            </Link>
            <Link
              className={linkClasses("payment")}
              to={"/account/profile/payment"}
            >
              <span className="material-symbols-outlined">
                account_balance_wallet
              </span>{" "}
              <h1 className="font-semibold ">Payment</h1>
            </Link>
            <Link
              className={linkClasses("safety")}
              to={"/account/profile/safety"}
            >
              <span className="material-symbols-outlined">encrypted</span>
              <h1 className="font-semibold ">Safety</h1>
            </Link>
            <Link
              className={linkClasses("preference")}
              to={"/account/profile/preference"}
            >
              <span className="material-symbols-outlined">settings</span>
              <h1 className="font-semibold ">Preferences</h1>
            </Link>
            <Link
              className={linkClasses("notification")}
              to={"/account/profile/notification"}
            >
              <span className="material-symbols-outlined">notifications</span>
              <h1 className="font-semibold ">Notifications</h1>
            </Link>
          </div>
          <div className="lg:w-2/5 w-2/3">
            {subpage === "profile" && (
              <div className="px-10 md:px-32">
                <h1 className="text-3xl font-semibold">Personal details</h1>
                <h2 className="text-slate-500 pt-1">
                  Edit your personal details
                </h2>
                <img
                  className="h-32 border-2 rounded-full my-8"
                  src="https://i.pinimg.com/originals/39/a4/71/39a47159059f38a954d77e5dcae6f0db.jpg"
                  alt="avatar"
                />
                <table className="table-auto">
                  <tbody>
                    <tr>
                      <td className="font-semibold">First name: </td>
                      <td className="capitalize pl-10 md:pl-20 text-slate-500">
                        {userDoc[0].firstName}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold ">Last name: </td>
                      <td className="capitalize pl-10 md:pl-20 text-slate-500">
                        {userDoc[0].lastName}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Email: </td>
                      <td className="pl-10 md:pl-20 text-slate-500">
                        {userDoc[0].email}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {subpage === "payment" && (
              <div className="px-10 md:px-32">
                <h1 className="text-3xl font-semibold">Payment information</h1>
              </div>
            )}
            {subpage === "safety" && (
              <div className="px-10 md:px-32">
                <h1 className="text-3xl font-semibold">Safety</h1>
              </div>
            )}
            {subpage === "preference" && (
              <div className="px-10 md:px-32">
                <h1 className="text-3xl font-semibold">Preferences</h1>
              </div>
            )}
            {subpage === "notification" && (
              <div className="px-10 md:px-32">
                <h1 className="text-3xl font-semibold">Notification</h1>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex place-content-center mt-20">
        <button
          className="flex items-center gap-3 px-4 py-2 border-2 rounded-full hover:bg-gray-100"
          onClick={logout}
        >
          <span className="material-symbols-outlined">logout</span>
          <h1 className="font-semibold ">Log out</h1>
        </button>
      </div>
    </div>
  );
}
