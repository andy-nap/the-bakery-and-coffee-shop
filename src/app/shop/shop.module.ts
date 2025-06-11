import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule} from "@angular/platform-browser";
import { ModelModule } from "../model/model.module";
import { ShopComponent } from "./shop.component";
import { CounterDirective } from "./counter.directive";

@NgModule({
  imports: [ModelModule, BrowserModule, FormsModule],
  declarations: [ShopComponent, CounterDirective],
  exports: [ShopComponent]
})
export class ShopModule { }
