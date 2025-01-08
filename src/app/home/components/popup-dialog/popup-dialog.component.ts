import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
@Component({
  selector: 'app-popup-dialog',
  styleUrl: 'popup-dialog.component.css',
  templateUrl: 'popup-dialog.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupDialogComponent {
  readonly dialogRef = inject(MatDialogRef<PopupDialogComponent>);
  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
