import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './pages/user/user-menu/user-menu.component';
import { UserService } from './services/user-service.service';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  menuOpen = false;

  constructor(public userService: UserService) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  get currentUser(): string | null {
    const user = this.userService.getCurrent();
    return user ? user.name : null; // Replace 'username' with the actual string property you want
  }
}
