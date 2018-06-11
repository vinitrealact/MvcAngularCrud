import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService, public toster: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
form.reset();
    }
this.employeeService.selectedEmployee = {
  EmployeeID: null,
  EmpCode: '',
  FirstName: '',
  LastName: '',
  Office: '',
  Position: ''

};
  }

  onSubmit(form: NgForm) {
    if (form.value.EmployeeID == null) {
this.employeeService.postEmployee(form.value)
.subscribe(data => {
  this.resetForm(form);
  this.employeeService.getEmployeeList();
  this.toster.success('new record added successfully', 'employee register');
});
  } else {
// update opration
alert('update method');
this.employeeService.putEmployee(form.value.EmployeeID, form.value)
.subscribe(data => {
  this.resetForm(form);
  this.employeeService.getEmployeeList();
  this.toster.info('Record Updated Successfully', 'Employee Register');
});
  }
}

}
