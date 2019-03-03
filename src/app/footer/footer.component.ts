import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../get-data.service';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private dataService: GetDataService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  adminForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(){
    let username = this.adminForm.get('userName').value;
    let password = this.adminForm.get('password').value;
    localStorage.setItem('username',username);
    localStorage.setItem('password',password);
    this.router.navigate(['admin']);
  }

openDialog(title: string, text: string){
    this.dialog.open(DialogComponent,{
      width: '50%',
      data: {title: title, message: text}
    });
  }
}
