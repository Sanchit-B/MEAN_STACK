import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { KanbanComponent } from './kanban/kanban.component';
import { LengthConverterComponent } from './length-converter/length-converter.component';
import { UsersBooksListComponent } from './users-books-list/users-books-list.component';
import { SurveyListStartComponent } from './survey-list-start/survey-list-start.component';
import { WeatherFinderComponent } from './weather-finder/weather-finder.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignupComponent},
  { path: 'post-list', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'kanban', component: KanbanComponent, canActivate: [AuthGuard]},
  { path: 'length-convertor', component: LengthConverterComponent, canActivate: [AuthGuard]},
  { path: 'user-book-list', component: UsersBooksListComponent, canActivate: [AuthGuard]},
  { path: 'survey-list-start', component: SurveyListStartComponent, canActivate: [AuthGuard]},
  { path: 'weather-finder', component: WeatherFinderComponent, canActivate: [AuthGuard]},
  { path: 'employees', loadChildren: './employees/employee.module#EmployeeModule'},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [AuthGuard]
})


export class AppRoutingModule {}
