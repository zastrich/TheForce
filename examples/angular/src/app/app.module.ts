import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HandTrackerModule } from "@theforce/angular";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HandTrackerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
