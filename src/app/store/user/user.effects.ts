import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/shared/models/User';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[User] Login'),
      mergeMap((action) =>
        this.authService.signIn(action).pipe(
          map((user: User) => ({
            type: '[User] Login Success',
            user,
          })),
          catchError((error) => of({ type: '[User] Login Fail', error }))
        )
      )
    );
  });
}