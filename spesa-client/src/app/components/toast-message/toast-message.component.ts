import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast-message',
  imports: [CommonModule],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.css'
})
export class ToastMessageComponent {
  @Input() message = '';
  visible = false;

  show(msg: string) {
    this.message = msg;
    this.visible = true;
    setTimeout(() => this.visible = false, 3000);
  }
}
