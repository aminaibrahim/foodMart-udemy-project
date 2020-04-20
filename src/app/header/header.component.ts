import { Component, OnDestroy, OnInit } from "@angular/core";
import { serverInteractService } from "./serverinteract.service";
import { Subscription } from "rxjs";
import { recipeService } from "../recipes/recipe.service";
import { authService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { userModel } from "../auth/user.model";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class headerComponent implements OnInit, OnDestroy {
  constructor(
    private serverService: serverInteractService,
    private authService: authService
  ) {}
  saveData() {
    this.serverService.saveData();
  }

  fetchData() {
    this.serverService.getData().subscribe();
  }

  logged: boolean = false;
  currentUser: userModel;

  private whetherLogged: Subscription;
  ngOnInit() {
    this.whetherLogged = this.authService.authenticatedUser.subscribe(
      userData => {
        this.currentUser = userData;

        this.logged = !!userData;
      }
    );
  }

  onLogOut() {
    this.authService.logOut();
  }
  ngOnDestroy() {
    this.whetherLogged.unsubscribe();
  }
}
