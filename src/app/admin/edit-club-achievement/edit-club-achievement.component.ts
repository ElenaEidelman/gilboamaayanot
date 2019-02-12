import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-club-achievement',
  templateUrl: './edit-club-achievement.component.html',
  styleUrls: ['./edit-club-achievement.component.css']
})
export class EditClubAchievementComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  editClub = this.fb.group({
    title: ['',Validators.required],
    content: ['', Validators.required]
  });

  ngOnInit() {
  }
  onSubmit(){
    
  }

}
