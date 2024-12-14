import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { IUser } from './user.model';
import { ENDPOINTS, Roles, RolesId  } from './shared/endpoints.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  public isLoggedIn$: Observable<boolean> =
    this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body: IUser = { username, password };

    return this.http
      .post<{ token: string }>(`${ENDPOINTS.apiUrl}/Login/login`, body, { headers })
      .pipe(
        tap((response) => {
          localStorage.setItem(ENDPOINTS.TOKEN_KEY, response.token);
          this.isLoggedInSubject.next(true);

          // llamar a la api de profile y guardar el role en el local storage
          this.profile().subscribe((res) => {
            localStorage.setItem(ENDPOINTS.ROLE_KEY, res.role!);
          });
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }

  logout(): void {
    localStorage.removeItem(ENDPOINTS.TOKEN_KEY);
    localStorage.removeItem(ENDPOINTS.ROLE_KEY);
    this.isLoggedInSubject.next(false);
  }

  register(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body: IUser = { username, password, roleId: RolesId.USER };

    return this.http
      .post<{ token: string }>(`${ENDPOINTS.apiUrl}/Login/register`, body, {
        headers,
      })
      .pipe(
        tap((response) => {
          console.log('Respuesta del Register', response);
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }

  profile(): Observable<IUser> {
    return this.http.get<IUser>(`${ENDPOINTS.apiUrl}/Users/profile`).pipe(
      tap((response) => {
        console.log('Respuesta del profile', response);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(ENDPOINTS.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(ENDPOINTS.TOKEN_KEY);
  }

  isAdmin(): boolean {
    return localStorage.getItem(ENDPOINTS.ROLE_KEY) === Roles.ADMIN;
  }
}
