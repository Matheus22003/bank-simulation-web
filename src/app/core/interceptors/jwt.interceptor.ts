import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const currentUser = authService.currentUserValue;
  if (currentUser && currentUser.accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.accessToken}`
      }
    });
  }

  return next(req);
};
