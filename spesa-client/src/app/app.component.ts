import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  username: string = '';
  newItemName: string = '';
  newItemQuantity: number = 1;

  shoppingItems: ShoppingItem[] = [];

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
    if (!this.username || !item.selection || item.selection < 1) return;

    const existing = item.selectedBy.find((s: User ) => s.user === this.username);
    if (existing) {
      existing.quantity = item.selection;
    } else {
      item.selectedBy.push({ user: this.username, quantity: item.selection });
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
