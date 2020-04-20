import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../recipe.model";
import { recipeService } from "../recipe.service";
import { Subscription } from "rxjs";
import { serverInteractService } from "src/app/header/serverinteract.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeChangeSubscription: Subscription;

  constructor(
    private recipeservice: recipeService,
    private serverService: serverInteractService
  ) {}

  ngOnInit(): void {
    this.recipeChangeSubscription = this.recipeservice.recipeChanged.subscribe(
      data => {
        this.recipes = data;
      },
      error => {
        console.log(error);
      }
    );
    this.recipes = this.recipeservice.getRecipes();
  }
  ngOnDestroy() {
    this.recipeChangeSubscription.unsubscribe();
  }
}
