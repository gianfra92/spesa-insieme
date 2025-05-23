import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  /** Tutti gli utenti registrati in locale */
  private users$ = new BehaviorSubject<User[]>([]);
  /** Utente attualmente selezionato */
  private currentUser$ = new BehaviorSubject<User | null>(null);

  /* --- Osservabili pubblici --- */
  allUsers$ = this.users$.asObservable();
  current$  = this.currentUser$.asObservable();

  fetchAllUsers() {
    this.http.get<User[]>('/api/user').subscribe(users => {
      this.users$.next(users);
    });
  }

  addUser(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    // POST to server to create user and get the generated _id
    this.http.post<User>('/api/user', { name: trimmed }).subscribe(user => {
      const list = this.users$.value;
      if (!list.find(u => u._id === user._id)) {
        this.users$.next([...list, user]);
      }
      this.currentUser$.next(user);
    });
  }

  selectUser(user: User) {
    if (this.users$.value.find(u => u._id === user._id)) {
      this.currentUser$.next(user);
    }
  }

  getCurrent(): User | null {
    return this.currentUser$.value;
  }
}