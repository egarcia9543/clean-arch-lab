import { Links, Gender, Affiliation, Meta } from "./characters";

export interface CharacterMapped {
  characters: Character[];
  pagination: Pagination;
  links: Links;
}

export interface Character {
  characterId: number;
  characterName: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: Gender;
  description: string;
  image: string;
  affiliation: Affiliation;
}

export interface Pagination extends Meta {}
