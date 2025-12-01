import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  dashboardForm!: FormGroup;
  constructor(private auth: AuthenticationService, private router: Router, private usersService: UserService) { }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.dashboardForm = new FormGroup({
      rows: new FormArray([])
    });

    this.loadInitialData();
  }

  // Getter
  get rows(): FormArray {
    return this.dashboardForm.get('rows') as FormArray;
  }

  // Create a new row form group
  createRow(data?: any): FormGroup {
    return new FormGroup({
      id: new FormControl(data?.id || Date.now()),
      name: new FormControl(data?.name || '', Validators.required),
      email: new FormControl(data?.email || '', [Validators.required, Validators.email]),
      mobile: new FormControl(data?.mobile || '', Validators.required),
      editable: new FormControl(data ? false : true)  // server rows: not editable
    });
  }

  // Load existing users from API
  loadInitialData() {
    this.usersService.getUsers().subscribe((users: any) => {
      users.forEach((u: any) => this.rows.push(this.createRow(u)));
    });
  }

  // Add a new row (editable)
  add() {
    this.rows.push(this.createRow());
  }

  // Save all form rows (ADD or UPDATE)
  save() {
    const rowValues = this.rows.value;

    rowValues.forEach((row: any) => {
      if (row.editable) {
        // NEW row → POST
        this.usersService.saveUsers(row).subscribe();
      } else {
        // EXISTING row → PUT
        this.usersService.updateUser(row.id, row).subscribe();
      }
    });

    alert("Saved successfully!");

    // turn all rows into view mode
    this.rows.controls.forEach(r => r.get('editable')?.setValue(false));
  }

  // Enable editing of a row
  edit(i: number) {
    this.rows.at(i).get('editable')?.setValue(true);
  }

  // Delete Row
  delete(i: number) {
    const id = this.rows.at(i).get('id')?.value;

    this.usersService.deleteUser(id).subscribe(() => {
      this.rows.removeAt(i);
    });
  }
}
