import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };
  constructor(private route: Router, private http: HttpClient) {}

  onSubmit() {
    this.http
      .post('http://localhost:3000/users', this.loginData)
      .subscribe((response) => {
        console.log('User saved', response);
      });
    this.route.navigate(['/dashboard']);
  }
}
