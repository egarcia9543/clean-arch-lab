import { inject, Injectable } from "@angular/core";
import { CharacterGateway } from "../gateways/character-gateway";
import { Observable } from "rxjs";
import { CharacterMapped } from "../../core/models/mapped-characters";

@Injectable()
export class CharacterUsecase {
  characterGateway = inject(CharacterGateway);

  getCharacters(page: number, limit: number): Observable<CharacterMapped> {
    return this.characterGateway.getCharacters(page, limit);
  };
}
