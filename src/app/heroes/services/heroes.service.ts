import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private _url: string = environment.url;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this._url}/heroes`);
  }

  getHeroeById(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this._url}/heroes/${id}`);
  }

  getHeroeByName(query: string, limit: number = 5): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(
      `${this._url}/heroes?q=${query}&_limit=${limit}`
    );
  }
}
