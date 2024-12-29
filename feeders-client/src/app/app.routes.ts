import {Route} from "@angular/router";

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
  },
  {
    path: '',
    loadChildren: () =>
      import('src/app/globalFeed/globalFeed.routes').then((m) => m.routes),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('src/app/yourFeed/yourFeed.routes').then((m) => m.routes),
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('src/app/tagFeed/tagFeed.routes').then((m) => m.routes),
  },
  {
    path: 'articles/new',
    loadChildren: () =>
      import('src/app/createArticle/createArticle.route').then((m) => m.routes),
  },
  {
    path: 'article/:slug',
    loadChildren: () =>
      import('src/app/article/article.route').then((m) => m.routes),
  }
];
