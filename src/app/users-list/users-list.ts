import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../services/user-service';
import {ColDef} from 'ag-grid-community';
import {AgGridAngular} from 'ag-grid-angular';
import {User} from '../models/User';
import {RouterLink} from '@angular/router';
import {EditCellRenderer} from './edit-cell-renderer/edit-cell-renderer';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-users-list',
  imports: [
    AgGridAngular,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
  encapsulation: ViewEncapsulation.None
})
export class UsersList implements OnInit {

  context = { componentParent: this };

  protected readonly userService = inject(UserService);
  protected isEditPopupOpen = false;

  protected rowData: User[] = [];

  editForm: FormGroup;
  selectedUser!: User;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      id: [],
      firstName: [''],
      lastName: [''],
      age: [],
      email: [''],
      points: []
    });
  }

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
      cellRenderer: EditCellRenderer,
      maxWidth: 120
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

  openEditPopup(user: User) {
    this.selectedUser = user;
    this.editForm.patchValue(user);
    this.isEditPopupOpen = true; // affiche le popup
  }

  async saveEdit() {
    if (!this.selectedUser) return;

    const updatedUser = this.editForm.value as User;
    const savedUser = await this.userService.updateUser(updatedUser);

    const index = this.rowData.findIndex(u => u.id === savedUser.id);
    this.rowData[index] = savedUser;
    this.rowData = [...this.rowData]; // refresh grid

    this.isEditPopupOpen = false; // ferme le popup
  }

  closeEditPopup() {
    this.isEditPopupOpen = false;
  }
}
