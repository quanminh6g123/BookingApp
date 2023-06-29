import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div className="lg:mx-60 mx-10">
      <AccountNav />
      <div className="mb-8">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              key={booking._id}
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4 bg-gray-100 rounded-2xl overflow-hidden mb-5 drop-shadow-lg"
            >
              <div className="p-3 w-48">
                {booking.place.photos[0] && (
                  <img className="object-cover" src={booking.place.photos[0]} />
                )}
                {!booking.place.photos[0] && (
                  <img
                    className="h-28 object-cover"
                    src="https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                  />
                )}
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.place.title}</h2>
                <div className="text-xl">
                  <BookingDates
                    booking={booking}
                    className="mb-2 mt-4 text-gray-500"
                  />
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    <span className="text-2xl">
                      Total price: ${booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
