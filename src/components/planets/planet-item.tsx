import { FC, memo } from "react";
import { PlanetWithFilmsString } from "./planet.types";
import { formatDate } from "../../utils/dates";
import { formatPopulation } from "./planet.helper";

interface Props {
  planet: PlanetWithFilmsString;
}

export const PlanetItem: FC<Props> = memo(({ planet }) => {
  const { formatted, icon } = formatPopulation(planet.population);

  return (
    <li className="h-full">
      <div className="flex h-full flex-col gap-3 bg-gray-800 p-5 rounded-xl shadow-md transition transform hover:-translate-y-1 hover:shadow-xl">
        <div className="flex items-center text-yellow-600">
          <time dateTime={formatDate(planet.created)}>
            {formatDate(planet.created)}
          </time>
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-4 grow">
            <div
              className="text-gray-50 shrink-0 size-10 flex items-center justify-center"
              title={`${formatted} population`}
            >
              {icon}
            </div>
            <div className="flex flex-col grow">
              <h3 className="text-xl font-semibold text-white">
                {planet.name}
              </h3>
              <div className="text-gray-400 flex items-center grow flex-wrap gap-x-2 gap-y-1 max-w-[80%]">
                Films: {planet.films}
              </div>
            </div>
          </div>
          <div className="ml-auto text-gray-50 shrink-0">{planet.climate}</div>
        </div>
      </div>
    </li>
  );
});

PlanetItem.displayName = "PlanetItem";
