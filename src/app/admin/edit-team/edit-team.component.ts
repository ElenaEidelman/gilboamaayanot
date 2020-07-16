import { Component, OnInit, DebugElement } from '@angular/core';
import { GetDataService } from 'src/app/get-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogComponent } from '../../dialog/dialog.component';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

  constructor(
    private dataService: GetDataService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private ng2imgmax: Ng2ImgMaxService,
  ) { }

  saveButton: boolean = true;
  teams;
  viewForm: boolean = true;
  imgSrcForView = '';
  imgSrcForEditPreview = '';
  imgTypeForView;
  imgPath = '';
  imgUploaded: boolean = false;
  imgData = new FormData();
  spinner: boolean = false;
  editTeamForm = this.fb.group({
    idTeam: [''],
    name: ['', Validators.required],
    position: ['', Validators.required],
    location: ['', Validators.required],
    mobile_num: ['', Validators.required],
    mail: ['', ([Validators.required, Validators.email])],
  });
  ngOnInit() {
    this.getTeam();
  }

  getTeam() {
    this.dataService.getTeam().subscribe(
      result => {
        debugger
        this.teams = result.sort(function(a, b){
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
      });
      }
    );
  }

  deleteTeam(id: number, imgSrc:string) {
    this.openConfirmDelete('Are you sure you want delete this Team? ','team','id_zevet',id,'team'+id,true,imgSrc);
  }
  editTeam(team: any) {
    this.saveButton = false;
    this.editTeamForm.get('idTeam').setValue(team.id_zevet);
    this.editTeamForm.get('name').setValue(team.name);
    this.editTeamForm.get('position').setValue(team.position);
    this.editTeamForm.get('location').setValue(team.location);
    this.editTeamForm.get('mobile_num').setValue(team.mobile_num);
    this.editTeamForm.get('mail').setValue(team.mail);
    this.imgSrcForEditPreview = team.img_src;
    window.scroll(0,0);
  }
  updateTeam() {
    let dataToDb;
    if (this.editTeamForm.valid) {
      this.spinner = true;
      let idTeam = this.editTeamForm.get('idTeam').value;
      let name = this.editTeamForm.get('name').value;
      let position = this.editTeamForm.get('position').value;
      let location = this.editTeamForm.get('location').value;
      let mobile = this.editTeamForm.get('mobile_num').value;
      let mail = this.editTeamForm.get('mail').value;

      dataToDb = {
        idTeam: idTeam,
        name: name,
        position: position,
        location: location,
        mobile: mobile,
        mail: mail,
        imgPath: this.imgPath == '' ? this.imgSrcForEditPreview : this.imgPath
      }
        this.dataService.SendToDb('updateTeam.php',dataToDb).subscribe(
          response => {
            this.spinner = false;
            if (response.includes('SUCCESS')) {
              this.openDialog('', 'התווסף בהצלחה');
              this.resetForm();
            }
            else {
              this.spinner = false;
              this.openDialog('שגיאה', 'קרתה שגיאה, נא לנסות שוב פעם מאוחר יותר');
            }
          }
        );
    }
    else {
      this.openDialog('שגיאה', 'נא למלא את כל השדות');
    }
  }
 onSubmit() {
    let dataToDb;
    if (this.editTeamForm.valid) {
      this.spinner = true;
      let name = this.editTeamForm.get('name').value;
      let position = this.editTeamForm.get('position').value;
      let location = this.editTeamForm.get('location').value;
      let mobile = this.editTeamForm.get('mobile_num').value;
      let mail = this.editTeamForm.get('mail').value;

      dataToDb = {
        name: name,
        position: position,
        location: location,
        mobile: mobile,
        mail: mail,
        imgPath: this.imgPath
      }
      debugger
        this.dataService.SendToDb('saveTeam.php',dataToDb).subscribe(
          response => {
            console.log('get result for saved data to db');
            this.spinner = false;
            if (response.includes('SUCCESS')) {
              this.openDialog('', 'התווסף בהצלחה');
              this.resetForm();
              this.spinner = false;
            }
            else {
              this.spinner = false;
              this.openDialog('שגיאה', 'קרתה שגיאה, נא לנסות שוב פעם מאוחר יותר');
            }
          }
        );

    }
    else {
      this.openDialog('שגיאה', 'נא למלא את כל השדות');
    }
  }
  openDialog(title: string, message: string) {
    this.dialog.open(DialogComponent, {
      width: "350px",
      data: { title: title, message: message }
    });
  }

   onFileChange(event) {
    let reader = new FileReader();
    this.imgSrcForEditPreview = '';
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      let fileType = file.type;
      if (!fileType.includes("image")) {
        this.openDialog('שגיאה', 'נא לעלות רק תמונות');
      }
      else {
        this.ng2imgmax.resizeImage(file, 250, 230).subscribe(
          result => {
            let imgfile = new File([result], result.name, { type: fileType, lastModified: Date.now() })
            this.imgData.append('name', imgfile.name);
            this.imgData.append('Imgfile', imgfile);
              this.dataService.uploadImgs(this.imgData).subscribe(
              uploaded => {
                if (uploaded.includes('Error')) {
                  this.openDialog('', uploaded);
                  this.imgSrcForView = '';
                  this.imgTypeForView = '';
                  this.imgPath = '';
                }
                else{
                  reader.readAsDataURL(result);
                  reader.onload = () => {
                    this.imgSrcForView = reader.result.toString().split(',')[1];
                    this.imgTypeForView = result.type;
                  };
                  this.imgPath = 'api/uploads/imgs/team/' + this.imgData.get('name');
                }
              }
            ); 

          },
          error => {
            console.log('Oh no!', error);
          }
        );
      }
    }
  }

  resetForm() {
    this.viewForm = false;
    setTimeout(() => {
      this.editTeamForm.reset();
      this.viewForm = true;
      this.imgSrcForView = '';
      this.imgTypeForView = '';
    }, 1000);
    this.imgData.delete('name');
    this.imgData.delete('Imgfile');
  }
  openConfirmDelete(title, db,param,id,domId,element,dataFile){
    this.dialog.open(DialogConfirmComponent,{
      width:"350px",
      data:{message:title,db:db,param:param, id:id, domId:domId,element:element, fileName:dataFile}
    })
  }
}
