import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/User';

export const fetchUserInfor = createAction(
  '[User] Fetch User Information',
  props<{user: User}>()
);
