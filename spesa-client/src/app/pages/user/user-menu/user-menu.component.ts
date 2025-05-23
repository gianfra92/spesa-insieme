import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  imports: [CommonModule, FormsModule],
})
export class UserMenuComponent implements OnInit {
  newUser = '';

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.userService.fetchAllUsers();
  }

  add() {
    this.userService.addUser(this.newUser);
    this.newUser = '';
  }

  select(user: User) {
    this.userService.selectUser(user);
  }
}