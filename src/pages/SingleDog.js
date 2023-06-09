import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function SingleDog() {
  const [dog, setDog] = useState([]);
  const { uuidkey } = useParams();

  useEffect(() => {
    const fetchSingleDogData = async () => {
      try {
        const res = await fetch(
          `https://dierenasiels.com/api3/dier/${uuidkey}`
        );
        const data = await res.json();
        setDog(data.items);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSingleDogData();
  }, []);

  return (
    <>
      <section className="max-w-5xl mx-auto">
        {dog.map((dog) => (
          <div key={dog.uuidkey}>
            <Link
              to="/"
              className="inline-block mt-4 bg-slate-200 py-2 px-6 rounded hover:bg-slate-300 transition-all duration-200"
            >
              &larr; Terug
            </Link>
            <article className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
              <div className="bg-slate-100 p-4 rounded">
                <h1 className="text-3xl font-bold text-slate-800 mb-8 lg:text-5xl">
                  {dog.naam}
                </h1>
                <ul className="leading-loose lg:text-base lg:leading-relaxed">
                  <li>
                    <span className="font-bold">Leeftijd: </span>
                    {dog.leeftijd} ({dog.leeftijdnaam})
                  </li>
                  <li>
                    <span className="font-bold">Geslacht: </span>
                    {dog.sexenaam}
                  </li>
                  <li>
                    <span className="font-bold">Ras: </span>
                    {dog.rasnaam} - {dog.rasaanvul}
                  </li>
                  <li>
                    <span className="font-bold">Filmpje: </span>
                    {dog.youtube ? (
                      <a href={`https://youtu.be/${dog.youtubeUrl}`}>Youtube</a>
                    ) : (
                      " - "
                    )}
                  </li>
                  <li></li>
                </ul>
              </div>
              <img
                src={`https://dierenasiels.com/${dog.fotobig}`}
                alt={dog.naam}
                className="rounded h-50 w-50 object-scale-down"
              />
            </article>
            <article>
              <p className="p-8 text-slate-800 mb-8 lg:text-base leading-loose lg:leading-relaxed">
                {dog.omschrijving}
              </p>
            </article>
          </div>
        ))}
      </section>
    </>
  );
}
