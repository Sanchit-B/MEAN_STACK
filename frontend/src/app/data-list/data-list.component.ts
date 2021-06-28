import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../types/Item';

@Component({
  selector: 'data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  @Output() onItemDelete: EventEmitter<Item> = new EventEmitter<Item>();
  @Input() dataList;
  @Input() dataType;

  constructor() { }

  ngOnInit() {
  }

  deletItem($event) {
    this.onItemDelete.emit($event);
  }

}
