import { Component, OnInit } from '@angular/core';
import { DashboardViewModel } from '../views/dashboard/dashboard-view.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Element } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  position = 1;
  dashBoardViewModel: DashboardViewModel = new DashboardViewModel();
  data: Data[] = [];
  dataSource: Data[] = [];
  displayedColumns = ['position', 'project', 'tasks', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'hours', 'delete'];
  firstName: any = "";
  lastName: any = "";
  customStyle = {
    "background-image": "linear-gradient(to right, #8100fc,#a500fc,#b206fc, #ca01fc,#dc01fc )"
  };
  constructor(private _formBuilder: FormBuilder, private router: Router, private activatedRout: ActivatedRoute) { 
    this.firstName = this.activatedRout.snapshot.queryParamMap.get('fName');
    this.lastName = this.activatedRout.snapshot.queryParamMap.get('lName');
  }

  datePickerForm = this._formBuilder.group({
    startDate: '',
    endDate: ''
  })

  btnAddClicked(){
    const newRow = {
      position: this.position++,
      project: '',
      tasks: '',
    };
    this.data.push(newRow);
    this.dataSource = [...this.data];
  }

  btnLogout(){
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    
   // this.dashBoardViewModel.onInitDashboardViewModel();
  }


}

export interface Data {
  project: string;
  position: number;
  tasks: string;
}


