import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div className="mx-10 lg:mx-60">
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new place
        </Link>
        <div className="mt-4 mb-8">
          {places.length > 0 &&
            places.map((place) => (
              <Link
                to={"/account/places/" + place._id}
                key={place._id}
                className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl mb-3 drop-shadow-lg"
              >
                <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                  {place.photos.length > 0 && <img src={place.photos[0]} />}
                  {!place.photos[0] && (
                    <img src="https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg" />
                  )}
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl text-left">{place.title}</h2>
                  <p className="text-sm mt-2 text-left">{place.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
