import { NgModule } from "@angular/core";
import { CanDeactivateService } from "./recipes/new-recipe/canDeactivate.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { interceptRequest } from "./shared/interceptor.service";

@NgModule({
  providers: [
    CanDeactivateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: interceptRequest,
      multi: true
    }
  ]
})
export class coreModule {}
