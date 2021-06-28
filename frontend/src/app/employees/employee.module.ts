import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { FilterEmployees } from "./employee-filter.pipe";
import { EmployeeListComponent } from "./employee-list.component";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { EmployeeSnapshotComponent } from "./employee-snapshot.component";
import { EmployeeService } from "./employee.service";
import { CreateEmployeeComponent } from './create-employee.component';

@NgModule({
  imports: [
    EmployeeRoutingModule,
    SharedModule
  ],
  declarations: [
    EmployeeListComponent,
    EmployeeSnapshotComponent,
    FilterEmployees,
    CreateEmployeeComponent
  ],
  exports: [],
  providers: [
    EmployeeService
  ]
})

export class EmployeeModule {}
