import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { recipeService } from "../recipes/recipe.service";
import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { tap, map, exhaustMap, take } from "rxjs/operators";
import { authService } from "../auth/auth.service";
import { Subscription } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class serverInteractService {
  constructor(
    private http: HttpClient,
    private recipeService: recipeService,
    private authService: authService
  ) {}

  saveData() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http
      .put(
        "https://recipe-project-200c8.firebaseio.com/recipes.json",
        recipes,
        {
          headers: new HttpHeaders({ name: "ahmed" }),
          params: new HttpParams().set("id", "5")
        }
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  getData() {
    return this.http
      .get<Recipe[]>("https://recipe-project-200c8.firebaseio.com/recipes.json")
      .pipe(
        map(arraydata => {
          console.log(arraydata);

          return arraydata.map(eachrecipe => {
            return {
              ...eachrecipe,
              ingredients: eachrecipe.ingredients ? eachrecipe.ingredients : []
            };
          });
        }),
        tap(data => {
          return this.recipeService.setRecipes(data);
        })
      );
  }
}
