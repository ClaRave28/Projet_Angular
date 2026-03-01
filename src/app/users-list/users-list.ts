import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../services/user-service';
import {ColDef} from 'ag-grid-community';
import {AgGridAngular} from 'ag-grid-angular';
import {User} from '../models/User';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [
    AgGridAngular,
    RouterLink
  ],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
  encapsulation: ViewEncapsulation.None
})
export class UsersList implements OnInit {

  protected readonly userService = inject(UserService);

  protected rowData: User[] = [];

  async ngOnInit(): Promise<void> {
    try {
      this.rowData = await this.userService.listUsers();
    } catch (err) {
      console.error('Erreur lors du chargement des utilisateurs', err);
    }
  }

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true, maxWidth: 80 },
    { field: 'firstName', headerName: 'First Name', sortable: true, filter: true },
    { field: 'lastName', headerName: 'Last Name', sortable: true, filter: true },
    { field: 'age', headerName: 'Age', sortable: true, filter: true, maxWidth: 100 },
    { field: 'email', headerName: 'Email', sortable: true, filter: true, flex: 2 },
    { field: 'points', headerName: 'Points', sortable: true, filter: true, maxWidth: 100 },
    {
      headerName: 'Actions',
      maxWidth: 120,
      cellRenderer: () => {
        return `
        <button class="btn btn-sm btn-danger rounded-pill">
          <i class="bi bi-trash"></i>
        </button>
      `;
      },
      onCellClicked: (params: any) => {
        this.deleteUser(params.data);
      }
    }
  ];

  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    floatingFilter: true,
    flex: 1,
    minWidth: 100,
  };

  async deleteUser(user: User) {
    const confirmDelete = confirm(`Delete ${user.firstName} ${user.lastName} ?`);

    if (!confirmDelete) return;

    try {
      await this.userService.deleteUser(user.id);

      // Retirer la ligne du tableau
      this.rowData = this.rowData.filter(u => u.id !== user.id);

    } catch (err) {
      console.error('Erreur suppression', err);
    }
  }
}
