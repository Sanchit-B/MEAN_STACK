import { Component, Input, OnInit } from '@angular/core';
import { Survey } from 'src/types/Survey';

@Component({
  selector: 'survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
  @Input() surveyList: Survey[];
  constructor() { }

  ngOnInit() {
  }

}
