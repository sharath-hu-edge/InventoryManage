import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isSuperUser: number | null = null;
  userName: string | null = null;
  datetime: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const superuser = sessionStorage.getItem('isSuperUser');
    this.isSuperUser = superuser ? Number(superuser) : null;

    const user = 'Hello'+' '+ sessionStorage.getItem('userName');
    this.userName = user ? String(user) : null;

    const now = new Date();
    this.datetime = now.toLocaleString();


  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
