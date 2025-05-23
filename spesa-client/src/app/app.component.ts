import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { UserService } from './services/user-service.service';

type User = {
  user: string;
  quantity: number;
};

type ShoppingItem = {
  name: string;
  quantity: number;
  selectedBy: User[];
  selection?: number;
};

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, UserMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  newItemName = '';
  newItemQuantity = 1;

  shoppingItems: ShoppingItem[] = [];

  constructor(public userService: UserService) {}

  addItem() {
    if (!this.newItemName.trim()) return;

    this.shoppingItems.push({
      name: this.newItemName.trim(),
      quantity: this.newItemQuantity,
      selectedBy: [],
    });

    this.newItemName = '';
    this.newItemQuantity = 1;
  }

  selectItem(item: any) {
    const username = this.userService.getCurrent(); // lettura diretta del BehaviorSubject

    if (!username || !item.selection || item.selection < 1) return;

    const existing = item.selectedBy.find((s: User) => s.user === username);
    if (existing) {
      existing.quantity = item.selection;
    } else {
      item.selectedBy.push({ user: username, quantity: item.selection });
    }

    item.selection = 0;
  }

  getSummary(): { user: string; items: { name: string; quantity: number }[]; total: number }[] {
    const summaryMap: Record<string, { [itemName: string]: number }> = {};

    for (const item of this.shoppingItems) {
      for (const sel of item.selectedBy) {
        if (!summaryMap[sel.user]) {
          summaryMap[sel.user] = {};
        }
        summaryMap[sel.user][item.name] = (summaryMap[sel.user][item.name] || 0) + sel.quantity;
      }
    }

    return Object.entries(summaryMap).map(([user, itemsMap]) => ({
      user,
      items: Object.entries(itemsMap).map(([name, quantity]) => ({ name, quantity })),
      total: Object.values(itemsMap).reduce((sum, q) => sum + q, 0),
    }));
  }

  getTotalByItem(): { name: string; total: number }[] {
    const totals: Record<string, number> = {};

    for (const item of this.shoppingItems) {
      for (const sel of item.selectedBy) {
        totals[item.name] = (totals[item.name] || 0) + sel.quantity;
      }
    }

    return Object.entries(totals).map(([name, total]) => ({ name, total }));
  }
}
