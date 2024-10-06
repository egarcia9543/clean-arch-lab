import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PlanetsMapped } from '../../core/models/mapped-planets';
import { PlanetsResponse } from '../../core/models/planets';
import { environment } from '../../../environments/environment';
import { planetMapper } from '../mappers/planet-mapper';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private http: HttpClient) { }

  getPlanets(page: number = 1, limit: number = 10): Observable<PlanetsMapped> {
    return this.http.get<PlanetsResponse>(`${environment.baseUrl}planets?page=${page}&limit=${limit}`).pipe(
      map(response => planetMapper(response))
    );
  };
}
