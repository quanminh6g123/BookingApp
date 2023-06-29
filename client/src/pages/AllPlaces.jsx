import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function AllPlaces() {
  const [places, setPlaces] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
    axios.get("/wishlist").then((response) => {
      if (response.data)
        setWishlist(response.data[0].wishlist.map((obj) => obj.place._id));
    });
  }, []);

  async function addWishlist(ev, place) {
    const res = await axios.post("/wishlist", {
      place: place._id,
    });
    // console.log(res);
    if (res.data) {
      setWishlist((prevWishlist) => [...prevWishlist, place._id]);
    } else alert("You must login to favorite places!!");
  }

  async function removeWishlist(ev, place) {
    ev.preventDefault();
    await axios.put("/wishlist", {
      place: place._id,
    });
    setWishlist((prevWishlist) =>
      prevWishlist.filter((id) => id !== place._id)
    );
  }

  return (
    <div className="lg:mx-20 mx-10 my-10 mt-6 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <div key={place._id}>
            <div className="border-2 p-4 rounded-xl shadow-lg">
              <Link to={"/place/" + place._id}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                  {place.photos?.[0] && (
                    <img
                      className="rounded-2xl object-cover aspect-square"
                      src={place.photos?.[0]}
                      alt=""
                    />
                  )}
                  {!place.photos?.[0] && (
                    <img
                      className="rounded-2xl object-cover aspect-square"
                      src="https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                      alt=""
                    />
                  )}
                </div>
                <div className="h-24">
                  <h2 className="font-bold">{place.title}</h2>
                  <h3 className="text-sm text-gray-500">{place.address}</h3>
                </div>
              </Link>
              <div className="mt-1 flex justify-between items-end">
                <div>
                  <span className="font-bold">${place.price}</span>
                  /night
                </div>
                {!wishlist.includes(place._id) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-8 h-8 text-red-500 hover:fill-current cursor-pointer"
                    onClick={(ev) => addWishlist(ev, place)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                )}
                {wishlist.includes(place._id) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-8 h-8 text-red-500 fill-current cursor-pointer"
                    onClick={(ev) => removeWishlist(ev, place)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
