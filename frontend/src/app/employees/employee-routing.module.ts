import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateEmployeeComponent } from "./create-employee.component";
import { EmployeeListComponent } from "./employee-list.component";

const routes: Routes = [
  {path: "", component: EmployeeListComponent},
  {path: "create", component: CreateEmployeeComponent},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule],
  providers: []
})

export class EmployeeRoutingModule {}
