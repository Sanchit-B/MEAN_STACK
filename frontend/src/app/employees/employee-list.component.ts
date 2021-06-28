import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { EmployeeSnapshotComponent } from './employee-snapshot.component';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  @ViewChild('searchbar', {static: false}) searchbar: ElementRef;
  @ViewChild(EmployeeSnapshotComponent, {static: false}) EmployeeSnapshotComponent: EmployeeSnapshotComponent;

  employees$: Observable<Employee[]>;
  employees: Employee[];
  searchTerm = "";
  isVisible = true;
  constructor(
    private _employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employees$ = this._employeeService.getEmployeesAsObservable();
    this.employees = this._employeeService.getEmployees();
    // console.log(this.EmployeeSnapshotComponent.title);
  }

  ngAfterViewInit() {
    console.log(this.EmployeeSnapshotComponent.title);

    fromEvent(this.searchbar.nativeElement, 'keyup')
    .pipe(
      debounceTime(100),
      distinctUntilChanged(),
      tap(() => {
        this.searchTerm = this.searchbar.nativeElement.value;
      })
    )
    .subscribe()
  }

  updateName() {
    this.employees[0].firstName = "jordan";
    // let newEmployeesList = Object.assign([], this.employees);
    // newEmployeesList[0].firstName = 'jordan';
    // this.employees = newEmployeesList;
  }

  showHide() {
    this.isVisible = !this.isVisible;
  }

}
