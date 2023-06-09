import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const res = await fetch(
          "https://dierenasiels.com/api3/dier/?z=1&soort=2&asiel=2e3a2b4b-a107-11e7-946f-5616fb2ebb49"
        );
        const data = await res.json();
        setDogs(data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDogData();
  }, []);

  return (
    <>
      {!dogs ? (
        <h1
          className="flex items-center justify-center text-slate-800 
        text-center px-5 text-3xl h-screen font-bold uppercase text"
        >
          Loading...
        </h1>
      ) : (
        <>
          <section className="p-8 max-w-7xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <img
                  src="https://www.dierenasielsinttruiden.be/templates/gk_storebox/images/logo.png"
                  alt="logo"
                  Hondenasiel
                />
                <h1
                  className="flex items-center justify-center 
                    text-center px-5 text-3xl font-bold lg:text-5xl text-slate-800"
                >
                  Dierenasiel Sint-Truiden
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 my-10">
              {dogs.map((dog) => (
                <Link to={`/${dog.uuidkey}`} key={dog.uuidkey}>
                  <article
                    key={dog.uuidkey}
                    className="bg-slate-200 p-4 rounded shadow hover:bg-slate-300 transition-all duration-200"
                  >
                    <img
                      src={`https://dierenasiels.com/${dog.fotourl}`}
                      alt={dog.naam}
                      loading="lazy"
                      className="rounded md:h-72 w-full object-cover"
                    />
                    <h3 className="text-slate-800 text-lg font-bold mt-4">
                      {dog.naam}
                    </h3>
                    <p className="text-slate-800 md:h-10 mb-1">{dog.rasnaam}</p>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
