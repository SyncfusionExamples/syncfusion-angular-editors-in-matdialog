import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { DocxEditorDialogComponent } from '../docx-editor-dialog/docx-editor-dialog.component';
import { SpreadsheetEditorDialogComponent } from '../spreadsheet-editor-dialog/spreadsheet-editor-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ButtonModule,
    MatDialogModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private dialog: MatDialog) {}

  public openDocxEditor(): void {
    this.dialog.open(DocxEditorDialogComponent, {
      width: '90vw',
      height: '85vh',
      maxWidth: '1200px',
      disableClose: false
    });
  }

  public openSpreadsheetEditor(): void {
    this.dialog.open(SpreadsheetEditorDialogComponent, {
      width: '90vw',
      height: '85vh',
      maxWidth: '1200px',
      disableClose: false
    });
  }
}