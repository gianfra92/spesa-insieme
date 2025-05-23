import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-item-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {

  constructor(private userService: UserService) {}

  @Input() items: Item[] = [];
  @Output() select = new EventEmitter<Item>();

  ngOnInit() {
    const currentUser = this.userService.getCurrent();
    this.items.forEach(item => {
      const found = item.selectedBy.find(s => s.user && s.user._id === currentUser?._id);
      item.selection = found ? found.quantity : 1; // Default to 1 if not selected
    });
  }

  onSelect(item: Item) {
    this.select.emit(item);
  }

}
