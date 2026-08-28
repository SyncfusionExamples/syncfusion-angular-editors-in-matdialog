import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, ViewChild, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "@syncfusion/ej2-angular-buttons";
import { DocumentEditorContainerModule, DocumentEditorContainerComponent, RibbonService } from "@syncfusion/ej2-angular-documenteditor";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { environment } from "../../../environments/environment";


// Type of export to perform from the DOCX editor. 
type DocxExportType = "Docx" | "Sfdt" | "Txt";

/**
 * Modal wrapper around the Syncfusion DocumentEditorContainer providing:
 *  - Built-in toolbar for editing
 *  - Footer actions: Export as DOCX, Export as SFDT, Export as Text, Close
 */
@Component({
  selector: "app-docx-editor-dialog",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RibbonService],
  imports: [CommonModule, ButtonModule, MatDialogModule, DocumentEditorContainerModule],
  templateUrl: "./docx-editor-dialog.component.html",
  styleUrl: "./docx-editor-dialog.component.css",
})
export class DocxEditorDialogComponent implements OnDestroy {


  @ViewChild("docEditor")
  public docEditor!: DocumentEditorContainerComponent;


  // Service URL for the DOCX editor backend. 
  public serviceUrl = environment.documentEditorServiceUrl;

  // Enable the Ribbon UI (with File tab and default tabs/items) for the editor. 
  public toolbarMode: "Ribbon" | "Toolbar" = "Ribbon";

  // Use the classic ribbon layout to surface the full default item set. 
  public ribbonLayout: "Classic" | "Simplified" = "Classic";

  constructor(
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<DocxEditorDialogComponent>
  ) { }

  // Close the dialog and notify the host. 
  public onClose(): void {
    this.dialogRef.close();
  }

  // Dialog close event (covers toolbar close icon and Escape key). 
  public onDialogClose(): void {
    this.dialogRef.close();
  }

  // Default file name for export. 
  private get fileName(): string {
    return "Document";
  }

  // Export the document in the requested format via the editor's built-in save method. 
  public exportAs(format: DocxExportType): void {
    if (!this.docEditor) {
      return;
    }
    try {
      switch (format) {
        case "Docx":
          this.docEditor.documentEditor.save(this.fileName, "Docx");
          break;
        case "Sfdt":
          // SFDT export uses the SfdtExport API on the inner documentEditor
          this.docEditor.documentEditor
            .saveAsBlob("Sfdt")
            .then((blob: Blob) => {
              this.downloadBlob(blob, `${this.fileName}.sfdt`);
            })
            .catch((err: unknown) => this.handleExportError(err));
          break;
        case "Txt":
          this.docEditor.documentEditor
            .saveAsBlob("Txt")
            .then((blob: Blob) => {
              this.downloadBlob(blob, `${this.fileName}.txt`);
            })
            .catch((err: unknown) => this.handleExportError(err));
          break;
      }
    } catch (err) {
      this.handleExportError(err);
    }
  }

  // Manually trigger a save through the built-in toolbar (Save-as-DOCX). 
  public save(): void {
    try {
      this.docEditor?.documentEditor.save(this.fileName, "Docx");
    } catch (err) {
      this.handleExportError(err);
    }
  }

  // Print the active document. 
  public print(): void {
    try {
      this.docEditor?.documentEditor.print();
    } catch (err) {
      this.handleExportError(err);
    }
  }

  // Helper: trigger a browser download for a blob. 
  private downloadBlob(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Surface export errors to the console; customize to surface a toast in your app. 
  private handleExportError(err: unknown): void {
    // eslint-disable-next-line no-console
    console.error("Document export failed:", err);
  }

  // Cleanup the editor on destroy to avoid memory leaks. 
  ngOnDestroy(): void {
    if (this.docEditor) {
      this.docEditor.documentEditor.destroy();
    }
  }

  // When the user presses Escape, close the dialog. 
  @HostListener("document:keydown.escape")
  public onEscape(): void {
    this.dialogRef.close();
  }
}
