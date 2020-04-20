import { Component, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { shoppingService } from "./shopping.service";
@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit {
  ingredients;
  constructor(private shoppingservice: shoppingService) {}

  ngOnInit(): void {
    console.log("hey");

    this.ingredients = this.shoppingservice.getIngredients();
    this.shoppingservice.ingredientsChanged.subscribe(
      item => (this.ingredients = item)
    );
  }
  onIngredientItemClick(index: number) {
    this.shoppingservice.ingredientClicked.next(index);
  }
}
