export default function IndexPage() {
  return (
    <section className="home">
      <div className="secContainer container">
        <div className="homeText px-20">
          <h1 className="title">Plan Your Trip With AirBnb</h1>
          <p className="subTitle">
            Travel to your favorite city with respectful of the environment{" "}
          </p>
        </div>
        <div className="homeCard flex bg-white">
          <div className="locationDiv block px-2">
            <label className="font-semibold">Location</label>
            <input
              className="input-home block w-44"
              type="text"
              placeholder="Where are you going?"
            />
          </div>
          <div className="border-l border-gray-300"></div>
          <div className="check-inDiv px-2">
            <label className="font-semibold">Check-in</label>
            <input className="input-home block w-44" type="date" />
          </div>
          <div className="border-l border-gray-300"></div>
          <div className="check-outDiv px-2">
            <label className="font-semibold">Check-out</label>
            <input
              className="input-home block w-44"
              type="date"
              placeholder="Add date"
            />
          </div>
          <div className="border-l border-gray-300"></div>
          <div className="num-guestDiv px-2">
            <label className="font-semibold">Guests</label>
            <input
              className="input-home block w-44"
              type="number"
              placeholder="Number of guests"
            />
          </div>
          <button>
            <span className="material-symbols-outlined text-5xl">
              arrow_circle_right
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
