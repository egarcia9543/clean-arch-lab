import { Observable } from "rxjs";
import { CharacterMapped } from "../../core/models/mapped-characters";

export abstract class CharacterGateway {
  abstract getCharacters(): Observable<CharacterMapped>;
}
