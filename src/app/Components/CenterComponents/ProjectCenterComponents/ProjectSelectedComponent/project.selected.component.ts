// import { Component,OnInit } from '@angular/core';
// import {ActivatedRoute} from "@angular/router";
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// @Component({
//   selector: 'project-selected',
//   templateUrl: './project.selected.component.html'
// })
// export class ProjectSelectedComponent{

// }
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiCommunicationService } from '../../../../Services/api.communication.service'
import { ApiActionList } from '../../../../CommonClasses/api.action.list'
import { ResourceModel } from '../../../../Models/ResourceModel';
import { NewProjectEventModel } from '../../../../Models/NewProjectEventModel';
import { NewProjectDetailModel } from '../../../../Models/NewProjectDetailModel';
import { ResourceDetailsForDisplay } from '../../../../Models/ResourceDetailsForDisplay';
import { SubActivityModel } from '../../../../Models/SubActivityModel';
import { ResourceProjectAllocationDetailModel } from '../../../../Models/ResourceProjectAllocationDetailModel';
import { Subscription } from 'rxjs/Subscription';
import { serviceForRoute } from '../../../../Services/SharedServices.service'
import { Tabs } from '../../../../Directives/Tabs/tabs'
import { ProjectSelectedResourceTab } from './project.selected.resource.tab'
@Component({
  selector: 'project-selected',
  templateUrl: './project.selected.component.html',
  styleUrls: ['project.selected.css']
})
// @Component({
//   selector: 'base-chart-demo',
//   templateUrl: './base-chart-demo.html'
// })
export class ProjectSelectedComponent implements OnInit {
  // lineChart
  constructor(private appcommService: ApiCommunicationService, private messageService: serviceForRoute) {
    this.subscription = this.messageService.getcenterProjectSelectedMessage().subscribe(message => { this.Initalize(message) });
  }
  @Input() NewId;
  @ViewChild(Tabs) 
  private tabComponent: Tabs;
  resourceModelCollection: ResourceModel[];
  activityModelCollection: NewProjectEventModel[]=[];
  subActivityModelCollection: SubActivityModel[];
  resourceModelToDisplayCollection: ResourceDetailsForDisplay[] = [];
  subscription: Subscription;
  projectDetailModel: NewProjectDetailModel;
  lineChartOptions:string;
  IsFromProjectSelected:boolean=true;
  ngOnInit(): void {
    this.Clear();
    this.Load();
  }
  Initalize(val?: string): void {
    this.NewId = val;
    this.Clear();
    this.tabComponent.makeFirstTabActive();
    this.Load();
  }

  Clear(): void {
    this.resourceModelToDisplayCollection.length = 0;
    this.activityModelCollection.length=0;
  }
  Load(): void {
    // debugger
    //   let resourceComponentTab=new ProjectSelectedResourceTab();
    //   resourceComponentTab.Initalize();
    this.GetResources();
    this.GetResourcesAssigned();
    this.GetActivities();
    this.GetProjectDetail();
    this.GetSubActivityDetails();
  }

  GetSubActivityDetails(): void {
    let actionName_Get_SubActivity_List = ApiActionList.Get_SubActivity_List;
    this.appcommService.getAll(actionName_Get_SubActivity_List, false).subscribe(subActivities => { this.FillSubActivitiesDetails(subActivities) });
  }

  GetProjectDetail(): void {
    let actionName_Get_Project_List = ApiActionList.Get_Project_List;
    this.appcommService.getAll(actionName_Get_Project_List, true).subscribe(projects => { this.FillProjectDetails(projects) });
  }

  GetResources(): void {
    let actionName_Get_Resource_List = ApiActionList.Get_Resource_List;
    this.appcommService.getAll(actionName_Get_Resource_List, false).subscribe(resources => { this.FillResources(resources) });
  }

  GetResourcesAssigned(): void {
    let actionName_Get_Project_Resource_Assigned = ApiActionList.Get_Project_Resource_Assigned;
    this.appcommService.getAll(actionName_Get_Project_Resource_Assigned, false).subscribe(projectResources => { this.FillProjectResourceAssigned(projectResources) });
  }

  GetActivities(): void {
    let actionName_Get_Activity_List = ApiActionList.Get_Activity_List;
    this.appcommService.getAll(actionName_Get_Activity_List, false).subscribe(activities => { this.FillActivities(activities) });
  }

  FillProjectDetails(projects: NewProjectDetailModel[]): void {
    this.projectDetailModel = projects.filter(a => a.ProjectCode == this.NewId)[0];
  }

  FillResources(resources: ResourceModel[]): void {
         resources.forEach(a=>{
            a.ResourceSupervisor=resources.filter(b=>b.ResourceId==a.ResourceSupervisor)[0] !=undefined?resources.filter(b=>b.ResourceId==a.ResourceSupervisor)[0].ResourceName:"";
        })
    this.resourceModelCollection = resources;
  }

  FillActivities(activities: NewProjectEventModel[]): void {
    this.activityModelCollection = activities.filter(a => a.ProjectCode == this.NewId);
  }

  FillSubActivitiesDetails(subActivities: SubActivityModel[]): void {
    this.subActivityModelCollection = subActivities;
  }

  UpdateProjectAssignmentList(e):void{
       this.GetResourcesAssigned();
    }

  FillProjectResourceAssigned(projectResources: ResourceProjectAllocationDetailModel[]): void {
    let resourceModelToDisplayCollectionVariable:ResourceDetailsForDisplay[]=[];
    projectResources.forEach(item => {
      if (item.ProjectCode == this.NewId) {
        // this.resourceModelToDisplayCollection.push(this.resourceModelCollection.filter(a => a.ResourceId == item.ResourceId)[0]);
        let resourceModel = this.resourceModelCollection.filter(a => a.ResourceId == item.ResourceId)[0];
        let collection = new ResourceDetailsForDisplay();
        collection.ResourceId = resourceModel.ResourceId;
        collection.ResourceName = resourceModel.ResourceName;
        collection.ResourceSupervisor = resourceModel.ResourceSupervisor;
        collection.ResourceDOJ = resourceModel.ResourceDOJ;
        collection.AllocationPercentage = item.AllocationPercentage;
        collection.StartDate = item.StartDate;
        collection.EndDate = item.EndDate;
        resourceModelToDisplayCollectionVariable.push(collection);
      }
    });
    this.resourceModelToDisplayCollection=resourceModelToDisplayCollectionVariable;
  }

  

  public lineChartData: Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType: string = 'line';
  public pieChartType: string = 'pie';

  // Pie
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];

  public randomizeType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}