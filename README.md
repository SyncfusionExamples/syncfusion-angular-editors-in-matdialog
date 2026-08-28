# DOCX & Spreadsheet Editor Sample

Angular 19 standalone application demonstrating two Syncfusion editors opened from a
home page through modal dialogs:

- **Edit Word** — opens `DocumentEditorContainerComponent` (built-in toolbar, DOCX/SFDT/TXT export).
- **Edit Excel** — opens `SpreadsheetComponent` (full ribbon, XLSX/XLS/CSV/PDF export).

The design system follows **Material Design 3** tokens paired with the
`@syncfusion/ej2-material3-theme` CSS bundle.

---

## Prerequisites

- Node.js 18+ and npm
- Angular CLI 19+: `npm install -g @angular/cli`
- (Optional) A Syncfusion license key. The project works with Syncfusion's Community
  License without a key; to register a paid license, set the value at
  `src/environments/environment.ts`.

---

## Install dependencies

```bash
cd docx-spreadsheet-app
npm install
```

This installs the following Syncfusion packages at their latest available major version:

| Package | Purpose |
|--------|---------|
| `@syncfusion/ej2-angular-documenteditor` | DOCX editor UI |
| `@syncfusion/ej2-angular-spreadsheet` | Spreadsheet editor UI |
| `@angular/material/dialog` | Material Dialog Model |
| `@syncfusion/ej2-angular-buttons` | Material-styled `ButtonComponent` |
| `@syncfusion/ej2-material3-theme` | Material 3 theme CSS |

---

## Run the application

```bash
npm start
# or
ng serve
```

Open <http://localhost:4200>.

---

## Project layout

```
src/
  app/
    app.component.ts              # Root shell + license registration
    material-tokens.ts            # Material 3 design tokens (TypeScript)
    components/
      home/                       # Landing page with two buttons
      docx-editor-dialog/         # DOCX editor modal + export footer
      spreadsheet-editor-dialog/  # Spreadsheet editor modal + export footer
  environments/                   # Service URLs + license key
  styles.css                      # Material 3 design tokens (CSS variables)
  main.ts                         # bootstrapApplication + theme imports
```

---

## Configuring a back-end for Save/Open

The demo uses Syncfusion's hosted demo endpoints (read-only public). For production:

1. Host your own `docx-server` and `spreadsheet-server` services.
2. Override `documentEditorServiceUrl`, `spreadsheetOpenUrl`, and `spreadsheetSaveUrl`
   in `src/environments/environment.prod.ts`.
3. For self-contained save flows, swap the WebSocket save for
   `saveAsBlob` + custom upload (DOCX) or `needBlobData: true` + `saveComplete`
   (Spreadsheet). References are available in the component skills.

---

> **Note:** When running the application with Angular 21+, some Spreadsheet dropdowns and other overlay-based controls may not render correctly inside Material Dialogs due to Angular Material's native popover behavior. To ensure these controls display properly above the active dialog, the application configures Angular CDK overlays using `OVERLAY_DEFAULT_CONFIG` with `usePopover: false` in the root application configuration.

## Export Summary

| Editor | Footer actions |
|--------|----------------|
| Word   | `Export DOCX`, `Export SFDT`, `Export TXT`, `Print`, `Close` |
| Excel  | `Export XLSX`, `Export XLS`, `Export CSV`, `Export PDF`, `Close` |