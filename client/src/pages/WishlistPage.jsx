import AccountNav from "../AccountNav";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function WishlistPage() {
  const [places, setPlaces] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get("/wishlist").then((response) => {
      setPlaces(response.data[0].wishlist);
      setReady(true);
    });
  }, []);

  async function removeWishlist(ev, place) {
    ev.preventDefault();
    await axios.put("/wishlist", {
      place: place._id,
    });
    setPlaces((prevPlaces) =>
      prevPlaces.filter((item) => item.place._id !== place._id)
    );
  }

  if (!ready)
    return (
      <div>
        <AccountNav />
        <h1 className="text-center text-3xl font-semibold my-20">
          Loading...!
        </h1>
      </div>
    );

  return (
    <div>
      <AccountNav />
      {places.length === 0 && (
        <h1 className="text-center text-3xl font-semibold my-20">
          Let's add hotels to your wishlist !!!
        </h1>
      )}
      <div className="lg:mx-20 mx-10 my-10 mt-6 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.length > 0 &&
          places.map((doc) => (
            <div key={doc.place._id}>
              <div className="border-2 p-4 rounded-xl shadow-lg">
                <Link to={"/place/" + doc.place._id}>
                  <div className="bg-gray-500 mb-2 rounded-2xl flex">
                    {doc.place.photos?.[0] && (
                      <img
                        className="rounded-2xl object-cover aspect-square"
                        src={doc.place.photos?.[0]}
                        alt=""
                      />
                    )}
                    {!doc.place.photos?.[0] && (
                      <img
                        className="rounded-2xl object-cover aspect-square"
                        src="https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                        alt=""
                      />
                    )}
                  </div>
                  <div className="h-24">
                    <h2 className="font-bold">{doc.place.title}</h2>
                    <h3 className="text-sm text-gray-500">
                      {doc.place.address}
                    </h3>
                  </div>
                </Link>
                <div className="mt-1 flex justify-between items-end">
                  <div>
                    <span className="font-bold">${doc.place.price}</span>
                    /night
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-8 h-8 text-red-500 fill-current"
                    onClick={(ev) => removeWishlist(ev, doc.place)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
