import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';


// Type of export to perform from the Spreadsheet editor. 
type SpreadsheetExportType = 'Xlsx' | 'Xls' | 'Csv' | 'Pdf';


/**
 * Modal wrapper around the Syncfusion Spreadsheet providing:
 *  - Built-in ribbon for editing
 *  - Footer actions: Export as XLSX, XLS, CSV, PDF, Close
 */
@Component({
  selector: 'app-spreadsheet-editor-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonModule, MatDialogModule, SpreadsheetAllModule],
  templateUrl: './spreadsheet-editor-dialog.component.html',
  styleUrl: './spreadsheet-editor-dialog.component.css'
})
export class SpreadsheetEditorDialogComponent implements OnDestroy {


  @ViewChild('spreadsheet')
  public spreadsheet!: SpreadsheetComponent;


  public openUrl = environment.spreadsheetOpenUrl;
  public saveUrl = environment.spreadsheetSaveUrl;

  constructor(
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<SpreadsheetEditorDialogComponent>
  ) { }

  // Close the dialog and notify the host. 
  public onClose(): void {
    this.dialogRef.close();
  }

  // Dialog close event. 
  public onDialogClose(): void {
    this.dialogRef.close();
  }

  public created(): void{
    this.spreadsheet.resize();
  }  
  // Spreadsheet action begin event
  public onActionBegin(args: any): void {
    if (args.action == "resizeToFit") {
      args.args.eventArgs.cancel = true;
      let activeSheet: any = this.spreadsheet.getActiveSheet();
      let selectedRange: any = activeSheet.selectedRange;
      this.spreadsheet.autoFit(selectedRange);
    }
  }

  // Spreadsheet beforeSave begin event
  public beforeSave(args: any): void {
    args.isFullPost = true;
  }
  // Default file name for export. 
  private get fileName(): string {
    return 'Workbook';
  }

  // Export the spreadsheet in the requested format via the built-in save API. 
  public exportAs(format: SpreadsheetExportType): void {
    if (!this.spreadsheet) {
      return;
    }
    try {
      this.spreadsheet.save({
        saveType: format,
        fileName: this.fileName
      });
    } catch (err) {
      this.handleExportError(err);
    }
  }

  // Surface export errors to the console; customize to surface a toast in your app. 
  private handleExportError(err: unknown): void {
    // eslint-disable-next-line no-console
    console.error('Spreadsheet export failed:', err);
  }

  // Lifecycle: cleanup the editor on destroy to avoid memory leaks. 
  ngOnDestroy(): void {
    if (this.spreadsheet) {
      this.spreadsheet.destroy();
    }
  }

  // When the user presses Escape, close the dialog. 
  @HostListener('document:keydown.escape')
  public onEscape(): void {
    this.dialogRef.close();
  }
}