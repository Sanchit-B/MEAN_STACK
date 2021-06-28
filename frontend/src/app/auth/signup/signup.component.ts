import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  authStatusSub: Subscription;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      (res) => {
        if (!res) {
          this.isLoading = false;
        }
      }
    );
  }

  onSignUp(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    this.authService.creatUser(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
