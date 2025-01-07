import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {authAuctions} from "./action";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {PersistenceService} from "../../shared/services/persistence.service";
import {Router} from "@angular/router";

// GET CURRENT USER EFFECT
export const getCurrentUserEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
  persistService = inject(PersistenceService)
) => {
  return actions$.pipe(
    ofType(authAuctions.getCurrentUser),
    switchMap(() => {
      const token = persistService.get('accessToken');

      if (!token) {
        return of(authAuctions.getCurrentUserFailure());
      }
      return authService.getCurrentUser().pipe(
        map(currentUser => {
          return authAuctions.getCurrentUserSuccess({currentUser});
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(authAuctions.getCurrentUserFailure());
        })
      );
    }),
  );
}, {functional: true});

// REGISTER EFFECT
export const registerEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
  persistService = inject(PersistenceService)
) => {
  return actions$.pipe(
    ofType(authAuctions.register),
    switchMap(({request}) => {
      return authService.register(request).pipe(
        map(currentUser => {
          persistService.set('accessToken', currentUser.token);
          return authAuctions.registerSuccess({currentUser});
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(authAuctions.registerFailure({
            errors: errorResponse.error.errors
          }));
        })
      );
    }),
  );
}, {functional: true});

export const redirectAfterRegisterEffect = createEffect((
    actions$ = inject(Actions),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(authAuctions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    )
  },
  {functional: true, dispatch: false}
);


// LOGIN EFFECT
export const loginEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
  persistService = inject(PersistenceService)
) => {
  return actions$.pipe(
    ofType(authAuctions.login),
    switchMap(({request}) => {
      return authService.login(request).pipe(
        map(currentUser => {
          persistService.set('accessToken', currentUser.token);
          return authAuctions.loginSuccess({currentUser});
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(authAuctions.loginFailure({
            errors: errorResponse.error.errors
          }));
        })
      );
    }),
  );
}, {functional: true});

export const redirectAfterLoginEffect = createEffect((
    actions$ = inject(Actions),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(authAuctions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    )
  },
  {functional: true, dispatch: false}
);

export const updateCurrentUserEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService)
) => {
  return actions$.pipe(
    ofType(authAuctions.updateCurrentUser),
    switchMap(({currentUserRequest}) => {
      return authService.updateCurrentUser(currentUserRequest).pipe(
        map(currentUser => {
          return authAuctions.updateCurrentUserSuccess({currentUser});
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(authAuctions.updateCurrentUserFailure({errors: errorResponse.error.errors}));
        })
      );
    }),
  );
}, {functional: true});
