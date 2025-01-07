import {Route} from "@angular/router";
import {SettingsComponent} from "./components/settings/settings.component";
import {provideState} from "@ngrx/store";
import {settingFeatureKey, settingReducer} from "./store/reducers";

export const routes: Route[] = [
  {
    path: '',
    component: SettingsComponent,
    providers: [
      provideState(settingFeatureKey, settingReducer)
    ],
  }
];
