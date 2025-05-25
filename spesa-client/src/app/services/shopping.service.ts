import { Injectable } from '@angular/core';
import { Item } from '../models';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Import environment
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}

  private apiUrl = environment.apiBaseUrl;
  
  private shoppingItems$ = new BehaviorSubject<Item[]>([]);

  allItems$ = this.shoppingItems$.asObservable();

  fetchItems() {
    this.http.get<Item[]>(`${this.apiUrl}/items`)
    .pipe(
      switchMap(items =>
      this.userService.current$.pipe(
        take(1),
        map(user => {
          if (!user){
            items.forEach(item => (item.selection = 0))
          } else {
            items.forEach(item => {
              const match = item.selectedBy.find(s => s.user._id === user?._id);
              item.selection = match ? match.quantity : 0;
            });
          }          
          return items;
        })
      )
    )
    )
    .subscribe(items => {
      this.shoppingItems$.next(items);
      this.userService.current$
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
