import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  apiUrl = 'http://localhost:3000/items';
  users: any[] = [];
  newUser: any = {
    firstname: '',
    lastname: '',
    phoneno: '',
    address: '',
    email: '',
  };
  editing = false;
  constructor(private http: HttpClient, private route: Router) {}
  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers() {
    this.http.get<any[]>(this.apiUrl).subscribe((users) => {
      this.users = users;
      this.newUser = this.users.map(() => false);
    });
  }
  // editUser(user: any) {
  //   const url = `${this.apiUrl}/${user.id}`;
  //   this.http.put<any>(url, user).subscribe(() => {
  //     this.fetchUsers();
  //   });
  // }

  toggleEdit(index: number) {
    this.newUser[index] = true;
  }

  saveUser(index: number) {
    this.http
      .put(`${this.apiUrl}/${this.users[index].id}`, this.users[index])
      .subscribe((response) => {
        this.newUser[index] = false;
        console.log(response);
      });
  }

  deleteUser(user: any) {
    const url = `${this.apiUrl}/${user.id}`;
    this.http.delete<any>(url).subscribe(() => {
      this.fetchUsers();
    });
  }
}
