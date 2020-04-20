// import {
//   Resolve,
//   ActivatedRoute,
//   RouterStateSnapshot,
//   ActivatedRouteSnapshot
// } from "@angular/router";
// import { Observable } from "rxjs";
// import { Recipe } from "./recipe.model";
// import { serverInteractService } from "../header/serverinteract.service";
// import { Injectable } from "@angular/core";
// import { recipeService } from "./recipe.service";
// import { promise } from "protractor";

// @Injectable({
//   providedIn: "root"
// })
// export class injectRecipes implements Resolve<Recipe[]> {
//   constructor(
//     private serverservice: serverInteractService,
//     private recipeService: recipeService
//   ) {}
//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
//     const recipes: Recipe[] = this.recipeService.getRecipes();
//     console.log("we wre in resolver");

//     // if (recipes.length) {
//     //   console.log(recipes.length);
//     //   console.log(recipes);

//     //   return recipes;
//     // } else {
//     console.log("no recipes.so fetching from sserveer");

//     return this.serverservice.getData();
//     // }
//   }
// }
import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Recipe } from "./recipe.model";
import { serverInteractService } from "../header/serverinteract.service";
import { recipeService } from "./recipe.service";

@Injectable({ providedIn: "root" })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: serverInteractService,
    private recipesService: recipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.getData();
    } else {
      return recipes;
    }
  }
}
