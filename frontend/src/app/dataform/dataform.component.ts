import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Item} from "../types/Item";

@Component({
  selector: 'data-form',
  templateUrl: './dataform.component.html',
  styleUrls: ['./dataform.component.css']
})
export class DataformComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<Item> = new EventEmitter<Item>();

  radioForm;
  showTotalTimeField = false;
  constructor(public fb: FormBuilder) {
    this.radioForm = this.fb.group({
      name: "",
      genre: "",
      creator: "",
      type: ["", Validators.required],
      totalTime: null
    })
  }

  //

  item: Item;

  name;
  genre;
  creator;
  type;
  totalTime;

  ngOnInit() {}

  // submit(){
  //   console.log(this.radioForm.value);
  //   this.onItemAdded.emit(this.radioForm.value);
  //   this.radioForm.reset();
  //   this.showTotalTimeField = false;
  // }

  // changeType(e) {
  //   console.log(e.target.value);
  //   if(e.target.value === 'Song') {
  //     this.showTotalTimeField = true;
  //   } else {
  //     this.showTotalTimeField = false;
  //   }
  // }

  save() {
    this.item = {
      name: this.name,
      creator: this.creator,
      genre: this.genre,
      type: this.type,
      totalTime: this.totalTime
    };

    this.onItemAdded.emit(this.item);
    this.name = "";
    this.creator = "";
    this.genre = "";
    this.type = "";
    this.totalTime = null;
    this.showTotalTimeField = false;
  }

  changeType(e) {
      if(e.target.value === 'Song') {
        this.showTotalTimeField = true;
      } else {
        this.totalTime = 0;
        this.showTotalTimeField = false;
      }
    }

}
