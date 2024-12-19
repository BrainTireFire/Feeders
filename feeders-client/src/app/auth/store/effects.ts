import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {authAuctions} from "./action";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {PersistenceService} from "../../shared/services/persistence.service";
import {Router} from "@angular/router";

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
