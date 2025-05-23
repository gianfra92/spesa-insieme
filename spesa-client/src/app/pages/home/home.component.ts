import { Component } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { ItemListComponent } from '../../components/item-list/item-list.component';
import { ItemFormComponent } from '../../components/item-form/item-form.component';
import { SummaryComponent } from '../../components/summary/summary.component';
import { CommonModule } from '@angular/common';
import { Item, SelectedItem } from '../../models';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-home',
  imports: [ItemListComponent, ItemFormComponent, SummaryComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    public userService: UserService,
    public shoppingService: ShoppingService,
  ) {}

  addItem(item: Item) {
    this.shoppingService.addItem(item);
  }

  selectItem(item: Item) {
    const user = this.userService.getCurrent();
    if (!user || !item.selection || item.selection < 1) return;

    const existing = item.selectedBy.find(s => s.user === user._id);
    if (existing) {
      existing.quantity = item.selection;
    } else {
      item.selectedBy.push(new SelectedItem(user._id, item.selection));
    }

    item.selection = 0;
  } 

}
