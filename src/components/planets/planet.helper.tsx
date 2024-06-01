import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faCity,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

export function formatPopulation(population: string): {
  formatted: string;
  icon: JSX.Element;
} {
  const pop = parseInt(population, 10);

  let formatted = "";
  let icon = faUser;

  if (isNaN(pop)) {
    return {
      formatted: "N/A",
      icon: <FontAwesomeIcon icon={faGlobe} size="xl" />,
    };
  }

  if (pop >= 1e9) {
    formatted = (pop / 1e9).toFixed(0) + "B";
    icon = faGlobe;
  } else if (pop >= 1e6) {
    formatted = (pop / 1e6).toFixed(0) + "M";
    icon = faCity;
  } else if (pop >= 1e3) {
    formatted = (pop / 1e3).toFixed(0) + "K";
    icon = faUsers;
  } else {
    formatted = pop.toString();
    icon = faUser;
  }

  return { formatted, icon: <FontAwesomeIcon icon={icon} size="xl" /> };
}
