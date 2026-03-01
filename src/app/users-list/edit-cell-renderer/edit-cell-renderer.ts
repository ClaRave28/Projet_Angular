import { Component } from '@angular/core';
import {AgGridModule, ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-edit-cell-renderer',
  imports: [AgGridModule],
  templateUrl: './edit-cell-renderer.html',
  styleUrl: './edit-cell-renderer.scss',
})
export class EditCellRenderer implements ICellRendererAngularComp {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  edit() {
    this.params.context.componentParent.openEditPopup(this.params.data);
  }

  delete() {
    this.params.context.componentParent.deleteUser(this.params.data);
  }
}
