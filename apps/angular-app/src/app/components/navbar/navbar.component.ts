import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'mfee-project-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    RouterLink, 
    NgFor
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  authService: AuthService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
