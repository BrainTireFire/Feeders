import {SettingStateInterface} from "../types/settingState.interface";
import {createFeature, createReducer, on} from "@ngrx/store";
import {authAuctions} from "../../auth/store/action";
import {routerNavigationAction} from "@ngrx/router-store";

const initialState: SettingStateInterface = {
  isSubmitting: false,
  validationErrors: null
};

const settingFeature = createFeature({
  name: "setting",
  reducer: createReducer(
    initialState,
    on(authAuctions.updateCurrentUser, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(authAuctions.updateCurrentUserSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(authAuctions.updateCurrentUserFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: settingFeatureKey,
  reducer: settingReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = settingFeature;

