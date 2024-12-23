import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {authAuctions} from "../../store/action";
import {RegisterRequestInterface} from "../../types/registerRequest.interface";
import {RouterLink} from "@angular/router";
// import {selectIsSubmitting} from "../../store/selectors";
import {AuthStateInterface} from "../../types/authState.interface";
import {AsyncPipe, NgIf} from "@angular/common";
import {selectIsSubmitting, selectValidationErrors} from "../../store/reducers";
import {AuthService} from "../../services/auth.service";
import {combineLatest} from "rxjs";
import {
  BackendErrorMessagesComponent
} from "../../../shared/componets/backendErrorMessages/backendErrorMessages.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AsyncPipe,
    NgIf,
    BackendErrorMessagesComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  // backendErrors$ = this.store.select(selectValidationErrors);
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    // private store: Store<{auth: AuthStateInterface}>, if own selector is used
    // private authService: AuthService
  ){
  }

  onSubmit() {
    console.log('Form ', this.form.value);
    const request: RegisterRequestInterface =  {
      user: this.form.getRawValue()
    }
    this.store.dispatch(authAuctions.register({request}))
    // this.authService.register(request).subscribe(res => console.log(res));
  }
}
