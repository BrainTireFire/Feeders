import {createFeature, createReducer, on} from "@ngrx/store";
import {AuthStateInterface} from "../types/authState.interface";
import {authAuctions} from "./action";
import {routerNavigatedAction, routerNavigationAction} from "@ngrx/router-store";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
  validationErrors: null
}

const authFeature = createFeature({
  name: "auth",
  reducer: createReducer(
    initialState,

    // REGISTER
    on(authAuctions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authAuctions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser
    })),
    on(authAuctions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    // LOGIN
    on(authAuctions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authAuctions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser
    })),
    on(authAuctions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    // After navigation to another page we clean validation errors
    on(routerNavigationAction, (state) => ({
      ...state,
      validationErrors: null,
    })),

    // GET CURRENT USER
    on(authAuctions.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authAuctions.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser
    })),
    on(authAuctions.getCurrentUserFailure, (state) => ({
      ...state,
      isLoading: false,
      currentUser: null
    })),

    on(authAuctions.updateCurrentUserSuccess, (state, action) => ({
      ...state,
      currentUser: action.currentUser
    })),

    on(authAuctions.logout, (state) => ({
      ...state,
      ...initialState,
      currentUser: null
    })),
  )
});

export const {
  name: authFeatureKey,
  reducer: authReduce,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature;
