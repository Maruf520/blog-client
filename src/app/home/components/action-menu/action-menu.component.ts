import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-action-menu',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './action-menu.component.html',
  styleUrl: './action-menu.component.css',
})
export class ActionMenuComponent {
  onEdit() {
    console.log('Edit action triggered');
    // Add your edit logic here
  }

  onUpdate() {
    console.log('Update action triggered');
    // Add your update logic here
  }

  onDelete() {
    console.log('Delete action triggered');
    // Add your delete logic here
  }
}
