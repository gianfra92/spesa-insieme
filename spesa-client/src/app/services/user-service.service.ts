import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  /** Tutti gli utenti registrati in locale */
  private users$ = new BehaviorSubject<string[]>([]);
  /** Utente attualmente selezionato */
  private currentUser$ = new BehaviorSubject<string | null>(null);

  /* --- Osservabili pubblici --- */
  allUsers$ = this.users$.asObservable();
  current$  = this.currentUser$.asObservable();

  addUser(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    const list = this.users$.value;
    if (!list.includes(trimmed)) {
      this.users$.next([...list, trimmed]);
    }
    this.currentUser$.next(trimmed);
  }

  selectUser(name: string) {
    if (this.users$.value.includes(name)) {
      this.currentUser$.next(name);
    }
  }

  getCurrent(): string | null {
    return this.currentUser$.value;
  }
}