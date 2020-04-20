import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from "@angular/common/http";
import { authService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { OnDestroy, Injectable } from "@angular/core";
import { take, exhaustMap } from "rxjs/operators";

@Injectable()
export class interceptRequest implements HttpInterceptor {
  constructor(private authservice: authService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authservice.authenticatedUser.pipe(
      take(1),
      exhaustMap(data => {
        if (data === null) return next.handle(req);
        let modifiedRequest = req.clone({
          params: req.params.append("auth", data.token)
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
