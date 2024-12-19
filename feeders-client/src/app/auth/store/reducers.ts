import {createFeature, createReducer, on} from "@ngrx/store";
import {AuthStateInterface} from "../types/authState.interface";
import {authAuctions} from "./action";

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
