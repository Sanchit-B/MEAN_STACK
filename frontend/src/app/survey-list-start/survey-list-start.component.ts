import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/types/Survey';

@Component({
  selector: 'app-survey-list-start',
  templateUrl: './survey-list-start.component.html',
  styleUrls: ['./survey-list-start.component.css']
})
export class SurveyListStartComponent implements OnInit {

  statuses: string[] = ['All', 'Active', 'Completed'];
  categories: string[] = ['Development', 'Workplace', 'Hardware'];
  filteredList: Survey[];

  status = 'status';
  category = "category";
  f1;
  f2;

  surveyList: Survey[] = [
    {
      title: "Designer Survey",
      category: "Workplace",
      status: "Active",
      label: "New Framework",
    },
    {
      title: "Developer Survey",
      category: "Development",
      status: "Active",
      label: "Education",
    },
    {
      title: "Backend Survey",
      category: "Hardware",
      status: "Completed",
      label: "Personal",
    }
  ]

  ngOnInit() {
    this.filteredList = [];
  }

  onFilterSelected(filter: string, type: string) {

    console.log(filter);
    if(type==='status') {
        this.f1 = filter;
    } else {
        this.f2 = filter;
    }

    if(this.f1 && this.f2 && this.f1 !== 'All') {
      this.filteredList = this.surveyList.filter((survey) => {
        return survey.status === this.f1 && survey.category === this.f2
      });
    } else if(this.f1 && !this.f2 && this.f1 !== 'All') {
      this.filteredList = this.surveyList.filter((survey) => {
        return survey.status === this.f1
      });
    } else if((!this.f1 || this.f1 == 'All') && this.f2) {
      this.filteredList = this.surveyList.filter((survey) => {
        return survey.category === this.f2
      });
    } else if(this.f1 == 'All') {
      this.filteredList = this.surveyList;
    } else {
      this.filteredList = [];
    }
  }

}
