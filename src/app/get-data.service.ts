import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { Menu } from './classes/menu';
import { Team } from './classes/team';
import { Post } from './classes/post';
import { Image } from './classes/image';
import { Message } from './classes/message';
import { News } from './classes/news';
import { Tur } from './classes/tur';
import { Birthday }  from './classes/birthday';
import { Survey } from './classes/survey';
import { Diary } from './classes/diary';
import { Blank } from './classes/blank';
import { Hug } from './classes/hug';
import { ClubAchievement } from './classes/clubachievement';
import { User } from './classes/user';
import { MenuAdmin } from './classes/MenuAdmin';
import { addMenu } from './classes/addMenu';

const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');


@Injectable({
  providedIn: 'root'
})

export class GetDataService {
  baseURL = 'http://localhost/api';
  //baseURL = '/api';
  menu: Menu;
  posts: Post[];

  constructor(private http: HttpClient) { 

  }

  getMenu(): Observable<Menu[]>{
    return this.http.get<Menu[]>(`${this.baseURL}/getMenu.php`).pipe(
      map(request => {
        //debugger
        request.forEach(item => {
          //first level of menu
          Object.keys(item).forEach(key => {
             //second level of menu
            if(key == 'items' && Array.isArray(item[key])){
              Object.keys(item[key]).forEach( index => {
                Object.keys(item[key][+index]).forEach(index2 => {
                  //set function to link of object if have property command
                  if(index2 == 'command'){
                    let id = item[key][+index][index2];
                    item[key][+index][index2] = () => {
                      setTimeout(function(){
                        let el = document.getElementById(id);
                        el.scrollIntoView(true);
                      },0); 
                    }
                  }
                })
              })
            }
            if(key == 'command'){
              let id = item[key];
              item[key] = () => {
                setTimeout(function(){
                  let el = document.getElementById(id);
                  //debugger
                  el.scrollIntoView(true);
                },0);
              };
              //item[key] = (e) => e.preventDefault();
            }
          });
        })
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
        return request;
      }),
      catchError(error => {
        console.log('error of getting team :' + error.message);
        return throwError(error);
      })
    )
  }

  getPost():Observable<Post[]>{
    return this.http.get<Post[]>(`${this.baseURL}/getPosts.php`).pipe(
      map(request => {
        this.posts = request;
        return request;
      }),
      catchError(error => {
        console.log('error get posts: ' + error.message);
        return throwError(error);
      })
    );
  }
  getPostById(id:number):Observable<Post>{
    return this.http.post<Post>(`${this.baseURL}/getPostById.php`,id).pipe(
      map(request => {
        return request;
      }),
      catchError(error => {
        return throwError(error.message);
      })
    );
  }

  getGalleryById(id:string):Observable<any>{
    return this.http.post<any>(`${this.baseURL}/getGalleryById.php`,id).pipe(
      map(request => {
        return request;
      }),
      catchError(error => {
        return throwError(error.message);
      })
    );
  }

  sendEmail(message: Message){
    return this.http.post(`${this.baseURL}/sendEmail.php`,message,{responseType: 'text'}).pipe(
      map(request => {
        return request;
      }),
      catchError(error => {
        return throwError(error.message);
      })
    );
  }

  getNews():Observable<News[]>{
    return this.http.get<News[]>(`${this.baseURL}/getNews.php`).pipe(
      map(request => {
        return request;
      }),
      catchError(error => {
        return throwError(error.message);
      })
    );
  }
  getTur(): Observable<Tur>{
    return this.http.get<Tur>(`${this.baseURL}/getTur.php`).pipe(
      map(result => {
        //debugger
        return result;
      }),
      catchError(error => {
        return throwError(error.message);
      })
    );
  }

  getBirthday(): Observable<Birthday[]>{
    return this.http.get<Birthday[]>(`${this.baseURL}/getBirthdays.php`).pipe(
      map(result => {
        //debugger
        return result;
      }),
      catchError(error => {
        return throwError(error.message);
      })
    );
  }


  getSurvey(): Observable<Survey[]>{
    return this.http.get<Survey[]>(`${this.baseURL}/getSurvey.php`).pipe(
      map(result => {
        return result;
      }),
      catchError(error => {
        return throwError('getSurvey ' + error.message);
      })
    );
  }

  setSurvey(data:any){
    return this.http.post(`${this.baseURL}/updateSurvay.php`,data,{responseType: 'text'}).pipe(
      map(result => {
        return result;
      }),
      catchError(error => {
        return throwError('set Survey ' + error.message);
      })
    );
  }

  getDiary(diaryId:string): Observable<Diary>{
    return this.http.post<Diary>(`${this.baseURL}/getDiary.php`,diaryId).pipe(
      map(result => {
        return result;
      }),
      catchError(error => {
        return throwError('getSurvey ' + error.message);
      })
    );
  }

  getBlanks():Observable<Blank[]>{
    return this.http.get<Blank[]>(`${this.baseURL}/getBlanks.php`).pipe(
      map(result => {
        return result;
      }),
      catchError(error => {
        return throwError(error.message);
      })
    );
  }
  getHug(groupName: string):Observable<Hug[]>{
    return this.http.post<Hug[]>(`${this.baseURL}/getHug.php`,groupName).pipe(
      map(result => {
        //debugger
        return result;
      }),
      catchError(error => {
        return throwError(error.message);
      })
    );
  }

  getClubAchievement():Observable<ClubAchievement[]>{
    return this.http.get<ClubAchievement[]>(`${this.baseURL}/getClubAchievements.php`).pipe(
      map(result => {
        return result;
      }),
      catchError(error => {
        return throwError(error.message);
      })
    );
  }
  userAuthentication(user: User){
    return this.http.post(`${this.baseURL}/getUser.php`,user,{responseType: 'text'}).pipe(
      map(result => {
        return result;
      }),
      catchError(error => {
        return throwError(error.message);
      })
    );
  }
  getMenuForAdmin():Observable<MenuAdmin[]>{
    return this.http.get<MenuAdmin[]>(`${this.baseURL}/getMenuForAdmin.php`).pipe(
      map(result => {
        return result;
      }),
      catchError(error => {
        return throwError(error.message);
      })
    );
  }

  //admin
  addMenu(data: addMenu){
    //debugger
    return this.http.post(`${this.baseURL}/addNewMenu.php`,data,{responseType:'text'}).pipe(
      map(result => {
        return result;
      }),
      catchError(error => {
        return throwError(error.message);
      })
    );;
  }
}
