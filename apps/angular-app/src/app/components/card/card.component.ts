import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { Location } from '../../models/location'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { LocationService } from '../../services/locations.service';

@Component({
  selector: 'mfee-project-card',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() location: Location
  @Input() categories: string[];
  @Output() updatedEvent = new EventEmitter<boolean>();

  locationService: LocationService = inject(LocationService);
  readonly dialog = inject(MatDialog);
  updatedLocation: Location;

  openDialog(): void {
    const dialogRef = this.dialog.open(LocationModalComponent, {
      data: {categories: this.categories, location: this.location}, height: '50%', width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.updatedLocation = result;
        this.locationService.updateLocation(this.updatedLocation.id, this.updatedLocation) .subscribe(result => {
          if(result) {
            this.updatedEvent.emit(true);
          }
        });
      }
    });
  }

  deletePost(id: number): void {
    this.locationService.deleteLocation(id).subscribe(post => {
      console.log("post " + post.title + " deleted");
      this.updatedEvent.emit(true);
    });
  }

}
