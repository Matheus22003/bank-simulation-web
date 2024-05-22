import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.currentUserValue;

  if (currentUser && currentUser.token) {
    return true;
  }
  router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
  return false;
};
