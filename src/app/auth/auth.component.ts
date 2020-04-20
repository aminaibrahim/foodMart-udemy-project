import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { authService, AuthResponseInterface } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { ErrorComponent } from "../error/error.component";
import { containerREfDirective } from "../shared/directives/containertRef.directive";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoggingMode: boolean = true;
  loading: boolean = false;
  userDetialsForm;
  error = null;
  errorSub: Subscription;

  @ViewChild(containerREfDirective, { static: true })
  containerRef: containerREfDirective;
  constructor(
    private auth: authService,
    private router: Router,
    private dynamicComponentFactory: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.error = null;
    this.userDetialsForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }
  switchMode() {
    this.isLoggingMode = !this.isLoggingMode;
  }
  onsubmitForm() {
    if (!this.userDetialsForm.valid) {
      return;
    }
    this.loading = true;
    let AuthResponse: Observable<AuthResponseInterface>;

    if (this.isLoggingMode) {
      AuthResponse = this.auth.signIn(
        this.userDetialsForm.value.email,
        this.userDetialsForm.value.password
      );
    } else {
      AuthResponse = this.auth.signUpwithEmail(
        this.userDetialsForm.value.email,
        this.userDetialsForm.value.password
      );
    }

    AuthResponse.subscribe(
      data => {
        this.loading = false;

        console.log(data);
        this.router.navigate(["/recipes"]);
      },
      errorResponse => {
        this.error = errorResponse;
        this.onErrorOccured(this.error);
        this.loading = false;
      }
    );

    this.userDetialsForm.reset();
  }

  onHandleError() {
    this.error = null;
  }

  onErrorOccured(error) {
    const componentFactory = this.dynamicComponentFactory.resolveComponentFactory(
      ErrorComponent
    );
    const viewContainerRef = this.containerRef.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);

    componentRef.instance.message = error;
    this.errorSub = componentRef.instance.errorevent.subscribe(data => {
      this.errorSub.unsubscribe();
      viewContainerRef.clear();
      this.error = null;
    });
  }

  ngOnDestroy() {
    if (this.errorSub) this.errorSub.unsubscribe();
  }
}
