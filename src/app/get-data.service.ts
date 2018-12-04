import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Menu } from './classes/menu';
import { Team } from './classes/team';

const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

@Injectable({
  providedIn: 'root'
})

export class GetDataService {
  baseURL = 'http://localhost/api';
  menu: Menu;
  constructor(private http: HttpClient) { }

  getMenu(): Observable<Menu[]>{
    return this.http.get<Menu[]>(`${this.baseURL}/getMenu.php`).pipe(
      map(request => {
        console.log('menuRequest: ' + request);;
        return request;
      }),
      catchError(error => {
        console.log('error of getting data :' + error.message);
        return throwError(error);
      })
    );
  }

  getTeam():Observable<Team[]>{
    return this.http.get<Team[]>(`${this.baseURL}/getTeam.php`).pipe(
      map(request => {
        console.log('teamRequest: ' + request);
        return request;
      }),
      catchError(error => {
        console.log('error of getting team :' + error.message);
        return throwError(error);
      })
    )
  }

}
