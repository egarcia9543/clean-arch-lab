import { inject, Injectable } from "@angular/core";
import { PlanetGateway } from "../gateways/planet-gateway";
import { Observable } from "rxjs";
import { PlanetsMapped } from "../../core/models/mapped-planets";

@Injectable()
export class PlanetUsecae {
  planetGateway = inject(PlanetGateway);

  getPlanets(page: number = 1, limit: number = 10): Observable<PlanetsMapped> {
    return this.planetGateway.getPlanets(page, limit)
  }
}
