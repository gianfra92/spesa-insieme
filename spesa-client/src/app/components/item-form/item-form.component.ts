import { Component, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  imports: [FormsModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent {
  newItemName = '';
  newItemQuantity = 1;

  @Output() add = new EventEmitter<Item>();

  submit() {
    const name = this.newItemName.trim();
    if (!name) return;

    const item = new Item('', name, this.newItemQuantity);
    this.add.emit(item);

    this.newItemName = '';
    this.newItemQuantity = 1;
  }

}
