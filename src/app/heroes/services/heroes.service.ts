import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/heroes.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private urlBase: string = environment.urlBase;

  constructor(private httpClient: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.httpClient.get<Heroe[]>(`${this.urlBase}/heroes`);
  }

  getHeroeById(id: string): Observable<Heroe> {
    return this.httpClient.get<Heroe>(`${this.urlBase}/heroes/${id}`);
  }

  getSuggestions(term: string): Observable<Heroe[]> {
    return this.httpClient.get<Heroe[]>(
      `${this.urlBase}/heroes?q=${term}&_limit=6`
    );
  }

  addHeroe(heroe: Heroe): Observable<Heroe> {
    return this.httpClient.post<Heroe>(`${this.urlBase}/heroes`, heroe);
  }

  updateHeroe(heroe: Heroe): Observable<Heroe> {
    return this.httpClient.put<Heroe>(
      `${this.urlBase}/heroes/${heroe.id}`,
      heroe
    );
  }

  deleteHeroe(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlBase}/heroes/${id}`);
  }
}
