import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployee(+id).subscribe((data: any) => {
        this.employee = data;
      });
    } else {
      // this.employee = new Employee();
    }
  }

  save() {
    if (this.employee?.id) {
      this.employeeService
        .updateEmployee(this.employee.id, this.employee)
        .subscribe(() => {
          this.router.navigate(['/employees']);
        });
    } else {
      this.employeeService
        .createEmployee(this.employee || ({} as Employee))
        .subscribe(() => {
          this.router.navigate(['/employees']);
        });
    }
  }
}
