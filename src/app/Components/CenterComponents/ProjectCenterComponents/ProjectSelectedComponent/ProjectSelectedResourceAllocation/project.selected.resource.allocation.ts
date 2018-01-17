import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { SearchCriteriaTypeResource } from '../../../../../../enums/SearchCriteriaTypeResource';
import { ApiCommunicationService } from 'C:/Users/106313/Documents/Angular4/Major/projectMgmt/src/app/Services/api.communication.service';
import { ApiActionList } from 'C:/Users/106313/Documents/Angular4/Major/projectMgmt/src/app/CommonClasses/api.action.list';
import { NewProjectDetailModel } from 'C:/Users/106313/Documents/Angular4/Major/projectMgmt/src/app/Models/NewProjectDetailModel';
import { ResourceProjectAllocationDetailModel } from 'C:/Users/106313/Documents/Angular4/Major/projectMgmt/src/app/Models/ResourceProjectAllocationDetailModel';
import { ResourceModel } from 'C:/Users/106313/Documents/Angular4/Major/projectMgmt/src/app/Models/ResourceModel';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'project-selected-resource-allocation',
    templateUrl: './project.selected.resource.allocation.html',
    styleUrls: ['project.selected.resource.allocation.css']
})

export class ProjectSelectedResourceAllocation implements OnInit {
    @Input() ProjectCode: string;
    resourceModelCollection: ResourceModel[];
    projectDetailModelCollection: NewProjectDetailModel[] = [];
    resourceProjectAssignment: ResourceProjectAllocationDetailModel[] = [];
    resourceFilteredModelCollection: ResourceModel[] = [];
    IsAddorEdit: boolean;
    constructor(private appcommService: ApiCommunicationService) { }

    ngOnInit(): void {
        this.Load();
    }

    Load(): void {
        this.GetResources();
        this.GetResourcesAssigned();
        this.GetProjectDetail();
    }

    GetResources(): void {
        let actionName_Get_Resource_List = ApiActionList.Get_Resource_List;
        this.appcommService.getAll(actionName_Get_Resource_List, true).subscribe(resources => { this.FillResources(resources) });
    }

    GetResourcesAssigned(): void {
        let actionName_Get_Project_Resource_Assigned = ApiActionList.Get_Project_Resource_Assigned;
        this.appcommService.getAll(actionName_Get_Project_Resource_Assigned, false).subscribe(projectResources => { this.FillProjectResourceAssigned(projectResources) });
    }

    GetProjectDetail(): void {
        let actionName_Get_Project_List = ApiActionList.Get_Project_List;
        this.appcommService.getAll(actionName_Get_Project_List, true).subscribe(projects => { this.FillProjectDetails(projects) });
    }

    FillResources(resources: ResourceModel[]): void {
        this.resourceModelCollection = resources;
    }

    FillProjectDetails(projects: NewProjectDetailModel[]): void {
        this.projectDetailModelCollection = projects;
    }

    FillProjectResourceAssigned(projectResources: ResourceProjectAllocationDetailModel[]): void {
        this.resourceProjectAssignment = projectResources;
    }

    outCollectionVar(e): void {
        this.resourceFilteredModelCollection = e;
    }

    UpdateProjectAssignmentList():void{
       this.GetResourcesAssigned();
    }

    SearchCriteria = [
        { enumvalue: SearchCriteriaTypeResource.ResourceId, viewValue: 'ResourceId' },
        { enumvalue: SearchCriteriaTypeResource.ResourceName, viewValue: 'ResourceName' },
        { enumvalue: SearchCriteriaTypeResource.ResourceSupervisor, viewValue: 'ResourceSupervisor' }
        // { enumvalue: SearchCriteriaTypeResource.ResourceDOJ, viewValue: 'ResourceDOJ' }
    ];
}