import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { headerComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "./shared/shared.module";
import { coreModule } from "./core-modules.module";

@NgModule({
  declarations: [AppComponent, headerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    coreModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
