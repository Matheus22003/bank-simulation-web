import {ApplicationConfig} from '@angular/core';
import {provideRouter, withEnabledBlockingInitialNavigation, withRouterConfig} from '@angular/router';

import {routes} from './app.routes';
import {provideEnvironmentNgxMask} from "ngx-mask";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";
import {jwtInterceptor} from "./core/interceptors/jwt.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideEnvironmentNgxMask(),
    provideToastr(),
    provideAnimations(),
  ]
};
