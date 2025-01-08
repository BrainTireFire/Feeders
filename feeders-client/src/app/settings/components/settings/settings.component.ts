import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {selectCurrentUser} from "../../../auth/store/reducers";
import {filter, Subscription} from "rxjs";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {combineLatest} from "rxjs";
import {selectIsSubmitting, selectValidationErrors} from "../../store/reducers";
import {
  BackendErrorMessagesComponent
} from "../../../shared/componets/backendErrorMessages/backendErrorMessages.component";
import {authAuctions} from "../../../auth/store/action";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  imports: [
    CommonModule,
    BackendErrorMessagesComponent,
    ReactiveFormsModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, OnDestroy {
  form = this.fb.nonNullable.group({
    image: "",
    username: "",
    bio: "",
    email: "",
    password: "",
  });

  currentUser?: CurrentUserInterface;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });
  currentUserSubscription?: Subscription;

  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.store.pipe(
      select(selectCurrentUser),
      filter(Boolean)
    ).subscribe((currentUser) => {
      this.currentUser = currentUser;
      this.initializeForm();
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }

  logout(): void {
    this.store.dispatch(authAuctions.logout());
  }

  submit(): void {
    if (!this.currentUser) {
      throw new Error("currentUser is not defined");
    }

    const currentUserRequest = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue()
      }
    };

    this.store.dispatch(authAuctions.updateCurrentUser({currentUserRequest}));
  }

  private initializeForm() {
    if (!this.currentUser) {
      throw new Error("currentUser is not defined");
    }

    this.form.patchValue({
      image: this.currentUser.image ?? "",
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? "",
      email: this.currentUser.email,
      password: "",
    });
  }
}
