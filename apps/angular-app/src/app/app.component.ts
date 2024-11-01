import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HomeComponent,
    ListCategoryComponent
  ],
  selector: 'mfee-project-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
