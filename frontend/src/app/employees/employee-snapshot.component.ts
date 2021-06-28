import { Component, Input, OnInit } from "@angular/core";
import { Employee } from "./employee.model";

@Component({
  selector: 'app-employee-snapshot',
  templateUrl: './employee-snapshot.component.html',
  styleUrls: ['./employee-snapshot.component.css']
})

export class EmployeeSnapshotComponent implements OnInit {

  @Input() employeeDetails: Employee;
  title = "Employee Details";
  constructor() {}

  ngOnInit() {}
}
