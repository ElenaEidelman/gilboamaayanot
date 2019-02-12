import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../../get-data.service';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private dataService: GetDataService) { }

  newMenu = this.fb.group({
    label: ['',Validators.required],
    lebEng: ['',Validators.required],
    url: ['',Validators.required]
  });
  ngOnInit() {
  }

}
