import { PlanetsMapped } from "../../core/models/mapped-planets";
import { PlanetsResponse } from "../../core/models/planets";

export function planetMapper(response: PlanetsResponse): PlanetsMapped {
  const {items, meta, links} = response;

  const planets = items.map(item => ({
    planetId: item.id,
    planetName: item.name,
    isDestroyed: item.isDestroyed,
    description: item.description,
    image: item.image
  }));

  return {
    planets,
    pagination: meta,
    links
  };
}
