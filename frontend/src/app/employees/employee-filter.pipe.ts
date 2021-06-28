import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "./employee.model";

@Pipe({
  name: 'filterEmployees',
  pure: true
})
export class FilterEmployees implements PipeTransform {
  transform(employees: Employee[], searchstring: string) {
    if(!searchstring) return employees;

    return employees.filter(employee => {
      return (
        employee.firstName.toLowerCase().indexOf(searchstring.toLowerCase()) > -1 ||
        employee.lastName.toLowerCase().indexOf(searchstring.toLowerCase()) > -1
      )
    });
  }
}
