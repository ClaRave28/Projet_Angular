import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Review} from '../models/review';
import {RouterLink} from '@angular/router';
import {UserService} from '../services/user-service';
import {ColDef} from 'ag-grid-community';
import {AgGridAngular} from 'ag-grid-angular';

@Component({
  selector: 'app-user-reviews',
  imports: [
    AgGridAngular,
    RouterLink
  ],
  templateUrl: './user-reviews.html',
  styleUrl: './user-reviews.scss',
  encapsulation: ViewEncapsulation.None
})
export class UserReviews implements OnInit {

  protected reviews: Review[] = [];
  private userService= inject(UserService);
  protected readonly user = this.userService.selectedUser;

  columnDefs: ColDef[] = [
    { field: 'movie.title', headerName: 'Film', sortable: true, filter: true, flex: 2 },
    { field: 'rate', headerName: 'Note User', sortable: true, filter: true, maxWidth: 120 },
    { field: 'movie.rate', headerName: 'Note Film', sortable: true, filter: true, maxWidth: 120 },
    { field: 'text', headerName: 'Commentaire', sortable: false, filter: true, flex: 3 }
  ];

  defaultColDef: ColDef = {
    resizable: true,
    minWidth: 100,
  };

  rowData: any[] = [];
  ngOnInit() {
    if (this.user()) {
      this.loadReviews(this.user()!.id);
    }
  }

  async loadReviews(id: number) {
    try {
      this.reviews = await this.userService.getUserReviews(id);

      // AG Grid ne gère pas les champs imbriqués automatiquement pour rowData
      this.rowData = this.reviews.map(r => ({
        ...r,
        'movie.title': r.movie.title,
        'movie.rate': r.movie.rate
      }));
    } catch (err) {
      console.error('Erreur chargement reviews', err);
    }
  }

}
