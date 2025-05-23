import { Injectable } from '@angular/core';
import { Item } from '../models';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiBaseUrl;
  
  private shoppingItems$ = new BehaviorSubject<Item[]>([]);

  allItems$ = this.shoppingItems$.asObservable();

  fetchItems() {
    this.http.get<Item[]>(`${this.apiUrl}/items`).subscribe(items => {
      this.shoppingItems$.next(items);
    });
  }

  addItem(item: Item) {
    const itemName = item.name.trim();
    if (!itemName || item.quantity <= 0) return
    if (!itemName) return;
    const payload = { name: item.name, quantity: item.quantity };
    this.http.post<Item>(`${this.apiUrl}/items`, payload).subscribe(() => {
      this.fetchItems();
    });
  }

  selectItem(itemId: string, userId: string, quantity: number) {
    return this.http.put<Item>(
      `${this.apiUrl}/items/${itemId}/select`,
      { userId, quantity }
    );
  }
}
