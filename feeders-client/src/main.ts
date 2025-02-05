import { bootstrapApplication } from '@angular/platform-browser';
import {AppComponent} from "./app/app.component";
import {provideRouter} from "@angular/router";
import {appRoutes} from "./app/app.routes";
import {provideState, provideStore} from "@ngrx/store";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {isDevMode} from "@angular/core";
import {authFeatureKey, authReduce} from "./app/auth/store/reducers";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideEffects} from "@ngrx/effects";
import {provideRouterStore, routerReducer} from "@ngrx/router-store";
import {authInterceptor} from "./app/shared/services/authInterceptor";
import {feedFeatureKey, feedReducer} from "./app/shared/componets/feed/store/reducers";
import {popularTagsFeatureKey, popularTagsReducer} from "./app/shared/componets/popularTags/store/reducers";

import * as authEffects from "./app/auth/store/effects";
import * as feedEffects from "./app/shared/componets/feed/store/effects";
import * as popularTagsEffects from "./app/shared/componets/popularTags/store/effects";
import * as addToFavoritesEffects from "./app/shared/componets/addToFavorites/store/effects";
import {AddToFavoritesService} from "./app/shared/componets/addToFavorites/services/addToFavorites.service";

bootstrapApplication(AppComponent,
  {
    providers: [
      provideHttpClient(withInterceptors([
        authInterceptor
      ])),
      provideRouter(appRoutes),
      provideStore({
        router: routerReducer,
      }),
      provideRouterStore(),
      provideState(authFeatureKey, authReduce),
      provideState(feedFeatureKey, feedReducer),
      provideState(popularTagsFeatureKey, popularTagsReducer),
      provideEffects(authEffects, feedEffects, popularTagsEffects, addToFavoritesEffects),
      provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit: 75
      }),
      AddToFavoritesService
    ]
  }).catch((err) => console.error(err));
