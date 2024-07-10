import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  apiUrl = 'http://localhost:3000/items';
  users: any[] = [];
  newUser: any = {
    firstname: '',
    lastname: '',
    phoneno: '',
    address: '',
    email: '',
  };

  constructor(private http: HttpClient, private route: Router) {}

  saveUser() {
    this.http.post<any>(this.apiUrl, this.newUser).subscribe(() => {
      console.log(this.newUser);
      this.newUser = {
        firstname: '',
        lastname: '',
        phoneno: '',
        address: '',
        email: '',
      };
      this.route.navigate(['employee-list']);
    });
  }
}
