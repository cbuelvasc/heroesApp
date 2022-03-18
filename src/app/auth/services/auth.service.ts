import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBase: string = environment.urlBase;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor(private httpClient: HttpClient) {}

  checkAuth(): Observable<boolean> {
    return localStorage.getItem('token')
      ? of(true)
      : this.httpClient.get<Auth>(`${this.urlBase}/usuarios/1`).pipe(
          map((auth) => {
            this._auth = auth;
            return true;
          })
        );
  }

  signin(): Observable<Auth> {
    return this.httpClient.get<Auth>(`${this.urlBase}/usuarios/1`).pipe(
      tap((auth) => (this._auth = auth)),
      tap((auth) => localStorage.setItem('token', auth.id))
    );
  }

  logout() {
    this._auth = undefined;
  }
}
