import { Injectable } from '@angular/core';
import { Item } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private shoppingItems$ = new BehaviorSubject<Item[]>([]);

  allItems$ = this.shoppingItems$.asObservable();

  shoppingItems: Item[] = [];

  addItem(item: Item) {
    const itemName = item.name.trim().toLowerCase();
    if (!itemName) return;
    const list = this.shoppingItems$.value;
    if (!list.find(item => item.name.trim().toLowerCase() == itemName)) {
      this.shoppingItems$.next([...list, item]);
    }
  }
}
