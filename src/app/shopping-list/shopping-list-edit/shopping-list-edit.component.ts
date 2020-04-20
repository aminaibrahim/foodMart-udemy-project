import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { shoppingService } from "../shopping.service";
import { NgForm } from "@angular/forms";
import { identifierName } from "@angular/compiler";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-list-edit",
  templateUrl: "./shopping-list-edit.component.html",
  styleUrls: ["./shopping-list-edit.component.css"]
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingservice: shoppingService) {}

  @ViewChild("shoppingForm") shoppingListForm: NgForm;

  editSubscription: Subscription;
  editedMode: boolean = false;
  ingredientToEdit: Ingredient;
  indexToEdit: number;

  ngOnInit(): void {
    this.editSubscription = this.shoppingservice.ingredientClicked.subscribe(
      (itemNumber: number) => {
        this.editedMode = true;
        this.indexToEdit = itemNumber;
        this.ingredientToEdit = this.shoppingservice.getIngredient(itemNumber);
        this.shoppingListForm.setValue({
          name: this.ingredientToEdit.name,
          amount: this.ingredientToEdit.amount
        });
      }
    );
  }

  onSubmit() {
    if (this.editedMode) {
      this.shoppingservice.onEditIngredient(this.indexToEdit, {
        name: this.shoppingListForm.value.name,
        amount: this.shoppingListForm.value.amount
      });
    } else {
      this.shoppingservice.onAddButton({
        name: this.shoppingListForm.value.name,
        amount: this.shoppingListForm.value.amount
      });
    }
    this.resettingForm();
  }

  onClear() {
    this.resettingForm();
  }

  onDelete() {
    this.shoppingservice.onDeleteIngredient(this.indexToEdit);
    this.resettingForm();
  }
  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }
  resettingForm() {
    this.shoppingListForm.reset();
    this.editedMode = false;
  }
}
