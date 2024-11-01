import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LocationService } from '../../services/locations.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { Location } from '../../models/location';

@Component({
  selector: 'mfee-project-list-category',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    NavbarComponent
  ],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent implements OnInit, AfterViewInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  locationService: LocationService = inject(LocationService);
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];
  dataSource = new MatTableDataSource<Location>();
  categories: string[];

  ngOnInit(): void {
   this.loadLocations();
    this.getCategories();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe(resp => {
      this.dataSource.data = resp; 
    });
  }

  getCategories(): void {
    this.locationService.getCategories().subscribe(resp => {
      this.categories = resp;
      this.categories.unshift("All")
    });
  }

  deleteLocation(id: number): void {
    this.locationService.deleteLocation(id).subscribe(resp => {
      console.log("Location" + resp.title + " deleted");
      this.loadLocations();
    });
  }

  updateLocation(location: Location): void {
    const dialogRef = this.dialog.open(LocationModalComponent,{
       data: {categories: this.categories, location: location}, height: '50%', width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const location: Location = result;
        this.locationService.updateLocation(location.id, location).subscribe(resp => {
          console.log("updated " + resp.title + " location");
          this.loadLocations();
        });
      }
    });
  }
 
}
