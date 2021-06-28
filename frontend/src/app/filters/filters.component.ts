import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Input() filterType: string;
  @Input() filterValues: string[];
  @Output() onFilterSelected: EventEmitter<string> = new EventEmitter<string>();
  selectedFilter: string = '';

  ngOnInit() {

  }

  setFilter(value) {
    this.selectedFilter = this.selectedFilter === value ? "" : value;
    this.onFilterSelected.emit(this.selectedFilter);
  }
}
