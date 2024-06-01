import { ChangeEvent, FC, useEffect, useState } from "react";
import { PlanetItem } from "../components/planets/planet-item";
import {
  PlanetWithFilmsString,
  Species,
} from "../components/planets/planet.types";
import {
  getSpeciesData,
  getPlanetsBySpecies,
} from "../components/planets/planet.data";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingMask } from "../components/LoadingMask";

const Planets: FC = () => {
  const [planets, setPlanets] = useState<PlanetWithFilmsString[]>([]);
  const [species, setSpecies] = useState<Species[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSpecies, setLoadingSpecies] = useState<boolean>(true);

  const handleSelectSpecies = (species: ChangeEvent<HTMLSelectElement>) => {
    const value = species.target.value;
    setLoading(true);
    setSelectedSpecies(value);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchSpecies = async () => {
      try {
        const species = await getSpeciesData(signal);
        const uniqueSpeciesMap: Map<string, Species> = new Map();
        species.forEach((specie) => {
          uniqueSpeciesMap.set(specie.classification, specie);
        });

        const uniqueAnimalList: Species[] = Array.from(
          uniqueSpeciesMap.values()
        );
        setLoadingSpecies(false);
        setSpecies(uniqueAnimalList);
        // if (species.length > 0) {
        //   setSelectedSpecies(species[0].url);
        // }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching species data:", error);
        }
      }
    };

    fetchSpecies();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getPlanetsBySpecies(selectedSpecies, signal)
      .then((fetchedPlanets) => {
        setPlanets(fetchedPlanets);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [selectedSpecies]);

  return (
    <div className="p-4">
      <h2 className="mb-8 flex items-center">
        Planets with
        {loadingSpecies && <LoadingMask className="mx-2 w-24 h-6" />}
        {!loadingSpecies && (
          <select className="mx-2" onChange={handleSelectSpecies}>
            <option value="">All Species</option>
            {species.map((specie) => (
              <option key={specie.classification}>
                {specie.classification}
              </option>
            ))}
          </select>
        )}
        Residents ({planets?.length || 0} planets)
      </h2>
      {!loading && planets.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {planets.map((planet, index) => (
            <PlanetItem key={index} planet={planet} />
          ))}
        </ul>
      )}
      {loading && (
        <div className="text-center py-10">
          <FontAwesomeIcon icon={faSpinner} spin />
          <p>Loading...</p>
        </div>
      )}
      {!loading && planets.length === 0 && <p>No planets found</p>}
    </div>
  );
};

export default Planets;
