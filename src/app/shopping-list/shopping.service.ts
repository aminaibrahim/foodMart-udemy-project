import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class shoppingService {
  private ingredients: Ingredient[] = [
    new Ingredient("apple", 10),
    new Ingredient("orange", 5)
  ];

  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientClicked = new Subject<number>();

  getIngredients = () => this.ingredients.slice();
  getIngredient = (index: number) => this.ingredients[index];

  onAddButton(item) {
    this.ingredients.push(item);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  onAddIngredients(data) {
    this.ingredients.push(...data);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  onEditIngredient(index: number, item: Ingredient) {
    this.ingredients[index] = item;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  onDeleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
