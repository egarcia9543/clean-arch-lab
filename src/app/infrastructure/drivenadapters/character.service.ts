import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { CharacterMapped } from '../../core/models/mapped-characters';
import { CharactersResponse } from '../../core/models/characters';
import { characterMapper } from '../mappers/character-mapper';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  getCharacters(page: number = 1, limit: number = 10): Observable<CharacterMapped> {
    return this.http.get<CharactersResponse>(`${environment.baseUrl}?page=${page}&limit=${limit}`).pipe(
      map(response => characterMapper(response))
    );
  };
}
