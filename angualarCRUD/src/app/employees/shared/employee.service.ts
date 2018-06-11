
import { Injectable} from '@angular/core';
import {Employee} from './employee.model';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';

import { Observable, Subject, ReplaySubject, observable } from 'rxjs';
// import { from, of, range } from 'rxjs/create';
import { map, filter, switchMap } from 'rxjs/operators';

// import 'rxjs/add/operator/map';
 // import 'rxjs/add/operator/toPromise';

// import 'rxjs/add/operator/map';
// import { request } from 'http';

import {HttpClient} from '@angular/common/http';
// import 'rxjx/add/operator/filter';
import {throwError} from 'rxjs';
// import {catch } from 'rxjs';


@Injectable(/*{
  providedIn: 'root'
}*/)
export class EmployeeService {
selectedEmployee: Employee;
employeeList: Employee[];
friends: any = null;
emp: Employee;
constructor(private http: Http) { }

  postEmployee(emp: Employee) { // to update
   // alert('post method called');
    const body = JSON.stringify(emp);
    const headerOptions = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method : RequestMethod.Post, headers : headerOptions});
    return this.http.post('http://localhost:9567/api/Employee', body, requestOptions).pipe(map(x => x.json()));
  }
  handleError(error: Response) {
console.error(error);
alert('Server Error Plese try after Some Time');
// return observable.throw(error.message || "server Error");
 // (error.message || 'Server Error');

  }


  getEmployeeList() { // to get all records
this.http.get('http://localhost:9567/api/Employee')
.pipe(map((data: Response) => {
  return data.json() as Employee[];
})).toPromise().then(x => {
  this.employeeList = x;
}).catch(this.handleError);
  }

  putEmployee(id, emp) { // to insert the records
    const body = JSON.stringify(emp);
    const headerOptions = new Headers({'Content-Type' : 'application/json'});
    const requestOptions = new RequestOptions({method : RequestMethod.Put, headers : headerOptions});
    return this.http.put('http://localhost:9567/api/Employee/' + id, body, requestOptions).pipe(map(x => x.json()));
  }

  public deleteEmployee(id: number) {
return this.http.delete('http://localhost:9567/api/Employee/' + id).pipe(map(res => res.json()
    ));
  }

  // tslint:disable-next-line:no-trailing-whitespace
// other code not from video
// public getEmployee(): void {
  // this.http.request('http://localhost:9567/api/Employee').subscribe(response => {
 // console.log(response.text());
// alert(response.text());
// this.friends = response.text();
// alert(this.friends + '<= friends');
  // });
// }
// end other code not from video
}
