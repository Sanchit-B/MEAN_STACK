import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { KanbanService } from './kanban/kanban.service';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { KanbanComponent } from './kanban/kanban.component';
import { LengthConverterComponent } from './length-converter/length-converter.component';
import { DataformComponent } from './dataform/dataform.component';
import { DataListComponent } from './data-list/data-list.component';
import { UsersBooksListComponent } from './users-books-list/users-books-list.component';
import { FiltersComponent } from './filters/filters.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveyListStartComponent } from './survey-list-start/survey-list-start.component';
import { WeatherFinderComponent } from './weather-finder/weather-finder.component';
import { SharedModule } from './shared/shared.module';
import { HighlightTextDirective } from './directives/highlightText.directive';
import { ShowHideDirective } from './directives/showhide.directive';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    KanbanComponent,
    LengthConverterComponent,
    DataformComponent,
    DataListComponent,
    UsersBooksListComponent,
    FiltersComponent,
    SurveyListComponent,
    SurveyListStartComponent,
    WeatherFinderComponent,
    HighlightTextDirective,
    ShowHideDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    KanbanService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
