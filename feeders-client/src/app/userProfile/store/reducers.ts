import {createFeature, createReducer, on} from "@ngrx/store";
import {routerNavigationAction} from "@ngrx/router-store";
import {UserProfileStateInterface} from "../types/userProfileState.interface";
import {userProfileActions} from "./actions";

const initialState: UserProfileStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const userProfileFeature = createFeature({
  name: "userProfile",
  reducer: createReducer(
    initialState,
    on(userProfileActions.getUserProfile, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(userProfileActions.getUserProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })),
    on(userProfileActions.getUserProfileFailure, (state, action) => ({
      ...state,
      isLoading: false
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectIsLoading,
  selectData: selectUserProfileData,
  selectError
} = userProfileFeature;
