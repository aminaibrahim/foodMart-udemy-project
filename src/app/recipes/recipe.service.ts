import { Recipe } from "./recipe.model";
import { Injectable, EventEmitter } from "@angular/core";
import { shoppingService } from "../shopping-list/shopping.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class recipeService {
  constructor(private shoppingservice: shoppingService) {}

  private recipes = [];

  recipeChanged = new Subject<Recipe[]>();
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }

  onAddtoShoppingList(ingrediants) {
    this.shoppingservice.onAddIngredients(ingrediants);
  }
  addNewRecipe(item: Recipe) {
    this.recipes.push(item);
    this.recipeChanged.next(this.recipes);
  }

  editRecipe(index, item) {
    this.recipes[index] = item;
    this.recipeChanged.next(this.recipes);
  }

  deleteRecipe(index) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes);
  }
  setRecipes = data => {
    this.recipes = data;
    this.recipeChanged.next(this.recipes);
    console.log(this.recipes);
    console.log("set");
  };
}
