import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {

  constructor(
    public userService: UserService,
    public shoppingService: ShoppingService,
  ) {}

  ngOnInit(): void {
    this.shoppingService.fetchItems();
  }

  addItem(item: Item) {
    this.shoppingService.addItem(item);
  }

  selectItem(item: Item) {
    const user = this.userService.getCurrent();
    if (!user || !item.selection || item.selection < 1) return;

    // Persist the selection to the backend
    this.shoppingService.selectItem(item._id, user._id, item.selection).subscribe(updatedItem => {
      console.log('updatedItem',updatedItem)
      const items = this.shoppingService['shoppingItems$'].value;
      const idx = items.findIndex(i => i._id === updatedItem._id);
      if (idx > -1) {
        items[idx] = updatedItem;
        const idu = items[idx].selectedBy.findIndex(i => i.user._id === user._id)
        items[idx].selection = items[idx].selectedBy[idu].quantity;
        this.shoppingService['shoppingItems$'].next([...items]);
      }
      // item.selection =items[idx].selectedBy[1].quantity;
    });
  } 

}
