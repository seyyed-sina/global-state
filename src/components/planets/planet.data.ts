import axios from "axios";
import {
  FetchResponse,
  Film,
  Person,
  PlanetWithFilms,
  PlanetWithFilmsString,
  Species,
} from "./planet.types";
import { API } from "../../constants/apis";

export const getSpeciesData = async (
  signal?: AbortSignal
): Promise<Species[]> => {
  const speciesResponse = await fetchData<Species>(API.SPECIES, signal);
  return speciesResponse;
};

/**
 * Fetches all planet data with associated film titles.
 *
 * @returns A Promise that resolves to an array of PlanetWithFilmsString objects.
 * @throws {Error} If there is an error fetching data.
 */
export const getPlanetData = async (
  signal?: AbortSignal
): Promise<PlanetWithFilmsString[]> => {
  const planets = fetchData<PlanetWithFilms>(API.PLANETS, signal);
  const films = fetchData<Film>(API.FILMS, signal);

  const filmsArray: Film[] = await films;
  const filmMap: { [key: string]: string } = filmsArray.reduce(
    (acc: { [key: string]: string }, film: Film) => {
      acc[film.url] = film.title;
      return acc;
    },
    {}
  );

  const planetsArray: PlanetWithFilms[] = await planets;
  return planetsArray.map(
    (planet: PlanetWithFilms): PlanetWithFilmsString => ({
      ...planet,
      films: planet.films.map((filmUrl: string) => filmMap[filmUrl]).join(", "),
    })
  );
};

/**
 * Fetches all planet data that has residents of a given species.
 *
 * @param speciesName The name of the species to filter by. Defaults to "artificial".
 * @returns A Promise that resolves to an array of PlanetWithFilmsString objects.
 * @throws {Error} If there is an error fetching data.
 */
export const getPlanetsBySpecies = async (
  speciesName?: string,
  signal?: AbortSignal
): Promise<PlanetWithFilmsString[]> => {
  try {
    // Fetch all species and identify selected species
    const species = await getSpeciesData(signal);
    const speciesUrls = speciesName
      ? species
          .filter((specie) => specie.classification === speciesName)
          .map((specie) => specie.url)
      : species.map((specie) => specie.url);

    // Fetch all residents of selected species
    const people = await fetchData<Person>(API.PEOPLE, signal);
    const peopleUrls = people
      .filter((person) => speciesUrls.includes(person.species[0]))
      .map((person) => person.url);

    // Fetch desire planets
    const planets = await getPlanetData(signal);
    return planets.filter(
      (planet) =>
        planet.films.length > 0 &&
        planet.residents.some((residentUrl) => peopleUrls.includes(residentUrl))
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

/**
 * Fetches all data from a paginated API endpoint.
 *
 * @param url The initial URL of the API endpoint.
 * @returns An array of data objects from the API endpoint.
 */
const fetchData = async <T>(
  url: string,
  signal?: AbortSignal
): Promise<T[]> => {
  let results: T[] = [];
  let nextUrl: string | null = url;

  while (nextUrl) {
    const response = (await axios.get<FetchResponse<T>>(nextUrl, {
      signal,
    })) as {
      data: FetchResponse<T>;
    };
    results = results.concat(response.data.results);
    nextUrl = response.data.next;
  }

  return results;
};
