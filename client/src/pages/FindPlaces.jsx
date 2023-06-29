import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function FindPlacePage() {
  const { query } = useParams();
  const [places, setPlaces] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    axios.get(`/places/find/${query}`).then((response) => {
      setPlaces(response.data);
      setReady(true);
    });
  }, [query]);

  if (!ready)
    return (
      <h1 className="px-10 sm:px-20 pt-3 font-semibold text-xl">Loading...</h1>
    );

  return (
    <div>
      <h1 className="px-10 sm:px-20 pt-3 font-semibold text-xl">
        There are {places.length} places &quot;{query}&quot; find
      </h1>
      <div className="px-10 sm:px-20 my-6 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/place/" + place._id} key={place._id}>
              <div className="border-2 p-4 rounded-xl shadow-lg">
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
                <div className="mt-1 flex justify-between">
                  <div>
                    <span className="font-bold">${place.price}</span>
                    /night
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {places.length === 0 && (
        <div className="">
          <img
            className="mx-auto"
            src="https://cdni.iconscout.com/illustration/premium/thumb/no-address-found-4344458-3613886.png?f=webp"
            alt=""
          />
          <h1 className="text-center text-4xl font-semibold">Not found!</h1>
        </div>
      )}
    </div>
  );
}
