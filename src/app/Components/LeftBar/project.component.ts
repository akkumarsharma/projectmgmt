import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { CenterIdentifier } from '../../../enums/center.identifier'
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { serviceForRoute } from '../../Services/SharedServices.service'
import { CenterComm } from '../../CommonClasses/centerComm'
import { ElementRef, Renderer } from '@angular/core';
import { NewProjectDetailModel } from '../../Models/NewProjectDetailModel';
import { ApiCommunicationService } from '../../Services/api.communication.service'
import { ApiActionList } from '../../CommonClasses/api.action.list'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'left-bar-project',
  templateUrl: './left.bar.projectcomponent.html',
  styleUrls: ['./LeftBar.css'],

})
export class ProjectComponent {
  projectCtrl: FormControl;
  filteredProjects: any;
  fullImagePath: string;
  projectNames = [];
  subscription: Subscription;
  projectCollection:NewProjectDetailModel[];
  project:string;
  //   @ViewChild("abc") el:ElementRef;
  // ngAfterViewInit() {
  //       let part=this.el.nativeElement.children[0].children[0].querySelector('.mat-input-underline');
  //       this.renderer.setElementStyle(part, 'display', 'none');
  // }

  ngOnInit(): void {
    this.LoadProjects(true);
  }

  LoadProjects(val: boolean): void {
    if (val == true) {
      this.projectNames.length = 0;
      let actionName = ApiActionList.Get_Project_List;
      this.appcommService.getAll(actionName,false).subscribe(projects => { this.FillProjectName(projects) });
    }
  }

  FillProjectName(projects: any): void {
    //var obj: NewProjectDetailModel[] = JSON.parse(projects);
    this.projectCollection=projects;
    projects.forEach(item => {
      this.projectNames.push(item.ProjectName);
    });

  }

  constructor(private router: Router, private sharedService: serviceForRoute, private renderer: Renderer, private appcommService: ApiCommunicationService) {
    this.projectCtrl = new FormControl();
    this.subscription = this.sharedService.checkIfUpdateProjectsList().subscribe(message => { this.LoadProjects(message) });
    this.filteredProjects = this.projectCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterProjects(name));
    this.fullImagePath = '/assets/Images/Search_Image.jpg'
  }

  filterProjects(val: string) {
    return val ? this.projectNames.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.projectNames;
  }
  centerCommObj: CenterComm;
  onChange(newValue): void {
    if (newValue != undefined && newValue != null && this.projectNames.filter(s =>s==newValue).length>0) {
      this.centerCommObj = new CenterComm;
      this.centerCommObj.CommType = CenterIdentifier.selectProject;
      this.centerCommObj.Id = this.projectCollection.filter(a=>a.ProjectName==newValue)[0].ProjectCode;
      this.sharedService.sendMessage(this.centerCommObj);
    }

  }
  newProjectClick() {
    this.centerCommObj = new CenterComm;
    this.centerCommObj.CommType = CenterIdentifier.createNewProject;
    this.centerCommObj.Id = null;
    this.sharedService.sendMessage(this.centerCommObj);
  }

  newProjectEventClick() {
    this.centerCommObj = new CenterComm;
    this.centerCommObj.CommType = CenterIdentifier.createNewProjectActivity;
    this.centerCommObj.Id = null;
    this.sharedService.sendMessage(this.centerCommObj);
  }
}

