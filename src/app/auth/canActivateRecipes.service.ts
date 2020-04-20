import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from "@angular/router";
import { Injectable } from "@angular/core";
import { userModel } from "./user.model";
import { Observable } from "rxjs";
import { authService } from "./auth.service";
import { take, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CanActivateRecipeGuard implements CanActivate {
  constructor(private authservice: authService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authservice.authenticatedUser.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) 
          return true;
         else 
          return this.router.createUrlTree(["/auth"]);
      })
    );
  }
}
