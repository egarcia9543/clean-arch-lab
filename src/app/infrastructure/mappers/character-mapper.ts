import { CharactersResponse } from "../../core/models/characters";
import { CharacterMapped } from "../../core/models/mapped-characters";


export function characterMapper(response: CharactersResponse): CharacterMapped {
  const { items, meta, links } = response;

  const characters = items.map(character => ({
    characterId: character.id,
    characterName: character.name,
    ki: character.ki,
    maxKi: character.maxKi,
    race: character.race,
    gender: character.gender,
    description: character.description,
    image: character.image,
    affiliation: character.affiliation
  }));

  return {
    characters,
    pagination: meta,
    links
  }
}
