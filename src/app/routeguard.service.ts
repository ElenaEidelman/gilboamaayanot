import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { GetDataService } from './get-data.service';
import { User } from './classes/user';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class RouteguardService implements CanActivate {

  constructor(private router: Router, private dataService: GetDataService, private dialog: MatDialog) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('password');
    let user = new User(username, password);
    let userAuthentication: boolean = false;
    await this.userAuthentication(user).then(result => {
      if(result == 'USER EXIST'){
        userAuthentication = true;
      }
      else if(result == 'NO USER'){
        this.openDialog('שגיאה','היוסר לא קיים');
      }
      else if(result == 'DATA BASE PROBLEM'){
        this.openDialog('שגיאה','בעיה עם בסיס נתונים');
      }
    });
    if(userAuthentication){
      return true;
    }
    //this.router.navigate(['/login'],{queryParams: {returnUrl: state.url}});
    return false;
  }

  userAuthentication(user: User){
      return this.dataService.userAuthentication(user);
  }

  openDialog(title, text){
    this.dialog.open(DialogComponent,{
      width: '350px',
      data: {title: title, message: text}
    })
  }
}