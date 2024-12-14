import { Component, OnDestroy, OnInit } from '@angular/core';
import {faRightFromBracket,faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarritoIconComponent } from '../../carrito/carrito-icon/carrito-icon.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    CarritoIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  faSignIn = faRightToBracket;
  faSignOut = faRightFromBracket;
  isAdmin = false;

  private authSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
        this.isAdmin = this.authService.isAdmin();
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
