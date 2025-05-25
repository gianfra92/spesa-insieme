import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {

  @Input() items: Item[] = [];
  @Output() select = new EventEmitter<Item>();

  onSelect(item: Item) {
    this.select.emit(item);
  }

}
