import { Links, Meta } from "./planets";

export interface PlanetsMapped {
  planets: Planets[];
  pagination: Meta;
  links: Links
}

export interface Planets {
  planetId: number;
  planetName: string;
  isDestroyed: boolean;
  description: string;
  image: string;
}
