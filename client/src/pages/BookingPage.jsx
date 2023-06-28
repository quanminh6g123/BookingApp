import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  async function deleteBooking(ev) {
    console.log(123);
    ev.preventDefault();
    if (id) {
      await axios.delete(`/bookings/${id}`, {});
    }
    setRedirect(true);
  }
  if (redirect) {
    return <Navigate to={"/account/bookings"} />;
  }

  return (
    <div className="my-4 lg:mx-80 mx-10">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
      <button
        onClick={deleteBooking}
        className=" mt-10 w-full bg-red-400 text-white mb-4 py-2 border rounded-xl text-xl font-semibold"
      >
        Cancel booking
      </button>
    </div>
  );
}
