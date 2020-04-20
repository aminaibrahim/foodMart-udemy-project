import { Observable } from "rxjs";
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

export interface componentInterface {
  whetherDeactivateOrNot: () =>
    | Observable<boolean>
    | Promise<boolean>
    | boolean;
}
export class CanDeactivateService implements CanDeactivate<componentInterface> {
  canDeactivate(
    component: componentInterface,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextComponent?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.whetherDeactivateOrNot();
  }
}
// export interface CanComponentDeactivate {
//   canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
// }

// export class CanDeactivateGuard
//   implements CanDeactivate<CanComponentDeactivate> {
//   canDeactivate(
//     component: CanComponentDeactivate,
//     currentRoute: ActivatedRouteSnapshot,
//     currentState: RouterStateSnapshot,
//     nextState?: RouterStateSnapshot
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     return component.canDeactivate();
//   }
// }
