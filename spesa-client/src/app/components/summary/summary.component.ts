import { Component, Input } from '@angular/core';
import { Item, SelectedItem } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {

  @Input() items: Item[] = [];

  getSummary(): { user: string; items: { name: string; quantity: number }[]; total: number }[] {
    const summaryMap: Record<string, { [itemName: string]: number }> = {};

    for (const item of this.items) {
      for (const sel of item.selectedBy) {
        if (!sel.user || !sel.user.name) continue; 
        if (!summaryMap[sel.user.name]) {
          summaryMap[sel.user.name] = {};
        }
        summaryMap[sel.user.name][item.name] = (summaryMap[sel.user.name][item.name] || 0) + sel.quantity;
      }
    }

    return Object.entries(summaryMap).map(([user, itemsMap]) => ({
      user,
      items: Object.entries(itemsMap).map(([name, quantity]) => ({ name, quantity })),
      total: Object.values(itemsMap).reduce((sum, q) => sum + q, 0),
    }));
  }

  getTotalByItem(): { key: string; value: number }[] {
    const total: { [itemName: string]: number } = {};
    this.items.forEach(item => {
      const sum = item.selectedBy.reduce((acc, s) => acc + s.quantity, 0);
      total[item.name] = sum;
    });
    return Object.entries(total)
      .map(([key, value]) => ({ key, value }))
      .filter(item => item.value >0 )
      .sort((a, b) => a.key.localeCompare(b.key));
  }

}
