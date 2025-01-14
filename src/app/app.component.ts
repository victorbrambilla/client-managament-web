import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ClienteModule } from './features/clientes/client.module';
import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet,ClienteModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[]
})
export class AppComponent {
  title = 'client-management';

  constructor(authService: AuthService) {
    authService.checkAuth()
  }
}
