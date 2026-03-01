import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../services/user-service';
import {ColDef} from 'ag-grid-community';
import {AgGridAngular} from 'ag-grid-angular';
import {User} from '../models/User';
import {Router, RouterLink} from '@angular/router';
import {EditCellRenderer} from './edit-cell-renderer/edit-cell-renderer';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

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

  protected readonly toastr = inject(ToastrService);
  protected readonly userService = inject(UserService);
  protected isEditPopupOpen = false;

  protected rowData: User[] = [];

  editForm: FormGroup;
  selectedUser!: User;

  constructor(private router : Router, private fb: FormBuilder) {
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
    { field: 'id', headerName: 'ID', sortable: true, maxWidth: 80 },
    { field: 'firstName', headerName: 'First Name', sortable: true, filter: true },
    { field: 'lastName', headerName: 'Last Name', sortable: true, filter: true },
    { field: 'age', headerName: 'Age', sortable: true, filter: true, maxWidth: 100 },
    { field: 'email', headerName: 'Email', sortable: true, filter: true, flex: 2 },
    { field: 'points', headerName: 'Points', sortable: true, filter: true, maxWidth: 100 },

    {
      sortable: false,
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
      this.rowData = this.rowData.filter(u => u.id !== user.id);
      this.toastr.success('Deleted');
    } catch (err) {
      this.toastr.error("Deleting error");
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
    try {
      const savedUser = await this.userService.updateUser(updatedUser);
      const index = this.rowData.findIndex(u => u.id === savedUser.id);
      this.rowData[index] = savedUser;
      this.rowData = [...this.rowData];

      this.isEditPopupOpen = false;
      this.toastr.success('User saved successfully');
    } catch (err) {
      this.toastr.error("Saving error");
    }
  }

  closeEditPopup() {
    this.isEditPopupOpen = false;
  }

  onRowClicked(event: any) {
    const clickedElement = event.event.target as HTMLElement;
    if (clickedElement.closest('button')) return; // ignore boutons Edit/Delete

    const user: User = event.data;
    this.userService.setUser(user); // ✅ met à jour le signal global

    // navigue vers la page reviews (sans passer l’ID)
    this.router.navigate(['/users/reviews']);
  }
}
