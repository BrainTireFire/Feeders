import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {RegisterRequestInterface} from "../../../../auth/types/registerRequest.interface";
import {CurrentUserInterface} from "../../../types/currentUser.interface";
import {BackendErrorsInterface} from "../../../types/backendErrors.interface";
import {LoginRequestInterface} from "../../../../auth/types/loginRequest.interface";
import {GetFeedResponseInterface} from "../types/getFeedResponse.interface";

export const feedActions = createActionGroup({
  source: "feed",
  events: {
    'Get feed': props<{url: string}>(),
    'Get feed success': props<{feed: GetFeedResponseInterface}>(),
    'Get feed failure': emptyProps(),
  },
});
