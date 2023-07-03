import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";
export default function BookingManager() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get(`/booking-manager`).then((response) => {
      setBookings(response.data);
    });
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // JavaScript months are 0-based.
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="">
      <AccountNav />
      {bookings.length === 0 && (
        <h1 className="text-center text-3xl font-semibold my-20">
          You don&apos;t have any booking !!!
        </h1>
      )}
      {bookings.length !== 0 && (
        <div className="flex place-content-center mt-8">
          <table className="py-10 w-3/4">
            <thead>
              <tr>
                <th className="border-b border-gray-300 py-2 w-64">Hotel</th>
                <th className="border-b border-gray-300 py-2 w-1/4">Contact</th>
                <th className="border-b border-gray-300 py-2">Phone</th>
                <th className="border-b border-gray-300 py-2">Check-in</th>
                <th className="border-b border-gray-300 py-2">Check-out</th>
                <th className="border-b border-gray-300 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.length > 0 &&
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="border-b border-gray-300 py-2 text-center px-2">
                      {booking.place.title}
                    </td>
                    <td className="border-b border-gray-300 py-2 text-center text-clip overflow-hidden px-2">
                      {booking.user.email}
                    </td>
                    <td className="border-b border-gray-300 py-2 text-center  px-2">
                      {booking.phone}
                    </td>
                    <td className="border-b border-gray-300 py-2 text-center px-2">
                      {formatDate(booking.checkIn)}
                    </td>
                    <td className="border-b border-gray-300 py-2 text-center px-2">
                      {formatDate(booking.checkOut)}
                    </td>
                    <td className="border-b border-gray-300 py-2 text-center px-2">
                      {booking.price}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
