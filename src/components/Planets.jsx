import { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async ( page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  if (!res.ok) {
    throw new Error("Problem fetching data");
  }
  const data = await res.json();
  return data;
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { status, data } = useQuery(["planets", page], () =>
    fetchPlanets(page) , { keepPreviousData: true }
  );

  return (
    <div>
      <h2>Planets</h2>

      {status === "loading" && <div>loading data...</div>}
      {status === "error" && <div>errror fetching data</div>}
      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            previous page
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage((old) => (!data || !data.next ? old : old + 1))
            }
            disabled={!data || !data.next}
          >
            next page
          </button>

          <div>
            {data?.results?.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
