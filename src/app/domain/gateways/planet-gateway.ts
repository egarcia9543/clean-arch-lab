import { Observable } from "rxjs";
import { PlanetsMapped } from "../../core/models/mapped-planets";

export abstract class PlanetGateway {
  abstract getPlanets(page: number, limit: number): Observable<PlanetsMapped>;
}
