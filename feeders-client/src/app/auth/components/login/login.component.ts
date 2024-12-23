import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {authAuctions} from "../../store/action";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {selectIsSubmitting, selectValidationErrors} from "../../store/reducers";
import {combineLatest} from "rxjs";
import {
  BackendErrorMessagesComponent
} from "../../../shared/componets/backendErrorMessages/backendErrorMessages.component";
import {LoginRequestInterface} from "../../types/loginRequest.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessagesComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ){
  }

  onSubmit() {
    console.log('Form ', this.form.value);
    const request: LoginRequestInterface =  {
      user: this.form.getRawValue()
    }
    this.store.dispatch(authAuctions.login({request}))
  }
}
