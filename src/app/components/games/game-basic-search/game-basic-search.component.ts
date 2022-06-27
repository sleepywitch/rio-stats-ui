import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-game-basic-search',
  templateUrl: './game-basic-search.component.html',
  styleUrls: ['./game-basic-search.component.css']
})
export class GameBasicSearchComponent implements OnInit {

  gameSearchFormGroup: FormGroup;
  usernameParam: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.gameSearchFormGroup = this.formBuilder.group({
      'username': ['', Validators.maxLength(64)]
    });
  }

  search() {
    if (this.gameSearchFormGroup.valid) {
      const control = this.gameSearchFormGroup.value;
      this.usernameParam = control.username;
    }
  }

}
