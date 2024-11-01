import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = "http://localhost:3002/users";

  constructor(private http: HttpClient) { }

  login(email:string, password:string): Observable<User> {
    return this.http.get<User>(this.url + `?email=${email}&password=${password}`).pipe(
      first(),
      tap(value => {
        if(Object.values(value).length > 0){
          localStorage.setItem('authUser', JSON.stringify(value)) 
        }
      })
    );
  }

  logout():void{
    localStorage.removeItem('authUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('authUser') != null;
  }

}
