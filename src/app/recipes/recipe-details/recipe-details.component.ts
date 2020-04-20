import { Component, OnInit, Input } from "@angular/core";
import { recipeService } from "../recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-recipe-details",
  templateUrl: "./recipe-details.component.html",
  styleUrls: ["./recipe-details.component.css"]
})
export class RecipeDetailsComponent implements OnInit {
  item;
  requiredId;

  constructor(
    private recipeservice: recipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.item = this.recipeservice.getRecipe(this.route.snapshot.params["id"]);
    this.route.params.subscribe((params: Params) => {
      this.requiredId = +params["id"];
      this.item = this.recipeservice.getRecipe(this.requiredId);
    });
  }
  addToShoppingList() {
    this.recipeservice.onAddtoShoppingList(this.item.ingredients);
  }
  onEditRecipeButtonClick() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteButtonClicked() {
    this.recipeservice.deleteRecipe(this.requiredId);
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
