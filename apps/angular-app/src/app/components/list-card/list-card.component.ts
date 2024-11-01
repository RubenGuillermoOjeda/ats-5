import { Component, inject, OnInit  } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { CardComponent } from "../card/card.component";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { LocationService } from '../../services/locations.service';
import { Location } from '../../models/location';
import { MatDialog } from '@angular/material/dialog';
import { LocationModalComponent } from '../location-modal/location-modal.component';

@Component({
  selector: 'mfee-project-list-card',
  standalone: true,
  imports: [
    CommonModule, 
    CardComponent, 
    MatButtonToggleModule, 
    MatButtonModule, 
    MatIconModule,
    NgFor,
    LocationModalComponent
  ],
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.scss',
  
})
export class ListCardComponent implements OnInit{
  categories: string[] = []
  locations: Location[] = []
  originalList: Location[] =[]
  post: Location = {id: null, title: '', description: '', category: '', url: ''};

  locationService: LocationService = inject(LocationService);
  readonly dialog = inject(MatDialog);
 
  ngOnInit(): void {
    this.loadCategories()
    this.loadLocations();
  }

  selectCategory(cat: string): void { 
    this.locations = this.originalList;
    if(cat != ALL) {
      this.locations = this.locations.filter(loc => loc.category == cat);
    }
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe(resp => {
      this.locations = resp
      this.originalList = resp
    });
  }

  loadCategories(): void {
    this.locationService.getCategories().subscribe(resp => {
      this.categories = resp
      this.categories.unshift(ALL)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LocationModalComponent, {
      data: {categories: this.categories}, height: '50%', width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
     if (result) {
      this.post = result
      this.locationService.getHighestId().subscribe(id => {
        this.post = result;
        this.post.id = id + 1;
        this.newPost(result);
        this.loadLocations();
      });
     }
    });
  }

  newPost(newLocation: Location): void {
    this.locationService.createLocation(newLocation).subscribe(location => {
      console.log(location)
    });
  }

  updatedPost(flag:boolean):void {
    if(flag){
      this.loadCategories();
      this.loadLocations();
    }
  }

}

const ALL = "ALL"



