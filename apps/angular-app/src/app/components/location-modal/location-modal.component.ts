import { Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { Location } from '../../models/location';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mfee-project-location-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './location-modal.component.html',
  styleUrl: './location-modal.component.scss'
})
export class LocationModalComponent implements OnInit{

  readonly dialogRef = inject(MatDialogRef<LocationModalComponent>);
  readonly data =  inject(MAT_DIALOG_DATA);
  location: Location = {id: null, title: '', description: '', category: '', url: ''};
  categories: string[];
  
  ngOnInit(): void {
    this.categories = this.data.categories;
    this.categories.splice(0,1);
    if(this.data.location){
      this.location = this.data.location;
    }
  }

  onSave(): void {
    this.dialogRef.close(this.location);
  }

}
