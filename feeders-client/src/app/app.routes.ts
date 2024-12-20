import {Route} from "@angular/router";
import {loginRoutes, registerRoutes} from "./auth/auth.routes";


export const appRoutes: Route[] = [
  {
    path: 'register',
    // children: registerRoutes,
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    // children: loginRoutes,
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.loginRoutes),
  }
]
