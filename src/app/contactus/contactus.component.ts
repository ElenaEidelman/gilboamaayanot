import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GetDataService } from '../get-data.service';
import { Message } from '../classes/message';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(
              private fb: FormBuilder, 
              private serviceData: GetDataService, 
              private breakpointObserver: BreakpointObserver,
              public dialog: MatDialog,
              private deviceDetector: DeviceDetectorService
              ) {
                breakpointObserver.observe([
                  '(orientation: portrait)',
                  '(orientation: landscape)',
                ]).subscribe(result => {
                    this.ifPortrait = result.breakpoints["(orientation: portrait)"];
                    this.ifLandscape = result.breakpoints["(orientation: landscape)"];
                });
                }
  ifMobile: boolean;
  ifTablet:boolean;
  ifDesktop:boolean;
  ifLandscape:boolean;
  ifPortrait:boolean;
  showForm: boolean = true;
  spinner: boolean = false;


  emailForm = this.fb.group({
    firstName: ['',Validators.required],
    lastName: ['',Validators.required],
    email: ['',[Validators.email,Validators.required]],
    title: ['',Validators.required],
    message: ['', Validators.required]
  });
  ngOnInit() {
    this.getDeviceInfo();
  }

  getErrorMessage(control){
    if(control == 'lastName'){
      return this.emailForm.get('lastName').hasError('required') ? 'נא למלא שם משפחה' : '';
    }
    else if(control == 'firstName'){
      return this.emailForm.get('firstName').hasError('required') ? 'נא למלא שם' : '';

    }
    else if (control == 'email'){
      return this.emailForm.get('email').hasError('required') ? 'נא למלא מייל תקין' : this.emailForm.get('email').hasError('email') ? 'מייל לא תקין' : '';
    }
    else if(control == 'title'){
      return this.emailForm.get('title').hasError('required') ? 'נא למלא כותרת' : '';
    }
  }

  onSubmit(){
    //console.warn(this.emailForm.value);
    //debugger
      if(this.emailForm.valid){
        this.spinner = true;
        //console.warn(this.emailForm.value);
      let message: Message = {firstName:'',lastName: '',email: '',title: '',message: ''};
      for(let key of Object.keys(message)){
        message[key] = this.emailForm.get(key).value
      }
      this.serviceData.sendEmail(message).subscribe(result => {
        if(result == 'SUCCESS'){
          this.openDialog(' תודה ' + this.emailForm.get('firstName').value + ' ' + this.emailForm.get('lastName').value + ' ','מייל נשלח בהצלחה');
          this.showForm = false;
          setTimeout(() => {
              this.reset()
              this.showForm = true;
            });
        }
        else if(result == 'ERROR'){
          this.openDialog(this.emailForm.get('firstName') + ' ' + this.emailForm.get('lastName') + ' לציירינו ','קרתה שגיאה, נא לנסות שוב פעם או ליצור קשר בטלפון 046071217');

        }
        this.spinner = false;
      });
    }
  }

  openDialog(title:string, message: string){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: {title: title, message: message}
    });

    /*dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });*/
  }
  reset(){
    this.emailForm.reset();
   /* Object.keys(this.emailForm.controls).forEach(name => {
      this.emailForm.controls[name].setErrors({'incorrect': true});
    })*/
  }
  getDeviceInfo(){
    this.ifMobile = this.deviceDetector.isMobile();
    this.ifTablet = this.deviceDetector.isTablet();
    this.ifDesktop = this.deviceDetector.isDesktop();
  }
}
