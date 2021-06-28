import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { Employee } from "./employee.model";

@Injectable()
export class EmployeeService {

  employees: Employee[] = [
    {
      firstName: 'mark',
      lastName: 'mark',
      age: 24,
      dob: new Date(1996, 11, 15),
      phoneNumber: 8178323690,
      company: 'siemens',
      workExperience: 2.5,
      annualSalary: 410000,
      monthlySalary: 30000,
      emailId: 'mark@gmail.com',
      alternateEmailId: 'mark@gmail.com',
      imageUrl: '../assets/images/admin.svg'
    },
    {
      firstName: 'mary',
      lastName: 'mary',
      age: 28,
      dob: new Date(1996, 11, 15),
      phoneNumber: 8178323690,
      company: 'siemens-energy',
      workExperience: 5,
      annualSalary: 1000000,
      monthlySalary: 80000,
      emailId: 'mary@gmail.com',
      imageUrl: '../assets/images/executive.svg'
    },
    {
      firstName: 'Jenny',
      lastName: 'winget',
      age: 35,
      dob: new Date(1996, 11, 15),
      phoneNumber: 8178323690,
      company: 'siemens-energy',
      workExperience: 5,
      annualSalary: 1000000,
      monthlySalary: 80000,
      emailId: 'Jenny@gmail.com',
      imageUrl: '../assets/images/admin.svg'
    },
  ];
  constructor() {}

  getEmployeesAsObservable(): Observable<Employee[]> {
    let observable = new Observable<Employee[]>(subscriber => {
      subscriber.next(this.employees);
    });

    return observable;
  }

  getEmployees(): Employee[] {
    return this.employees;
  }
}
