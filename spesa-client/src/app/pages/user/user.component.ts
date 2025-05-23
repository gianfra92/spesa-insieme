import { Component } from '@angular/core';
import { UserMenuComponent } from './user-menu/user-menu.component';

@Component({
  selector: 'app-user',
  imports: [UserMenuComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
