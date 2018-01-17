import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { serviceForRoute } from '../../../Services/SharedServices.service'
import { CenterComm } from '../../../CommonClasses/centerComm'
import { CenterIdentifier } from '../../../../enums/center.identifier'
import { ApiCommunicationService } from '../../../Services/api.communication.service'
import { ApiActionList } from '../../../CommonClasses/api.action.list'
import { ResourceModel } from '../../../Models/ResourceModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewProjectDetailModel } from '../../../Models/NewProjectDetailModel';
import { ResourceProjectAllocationDetailModel } from '../../../Models/ResourceProjectAllocationDetailModel';
import { ResourceProjectDetail } from './resource.project.detail';
import { SearchCriteriaTypeResource } from '../../../../enums/SearchCriteriaTypeResource';

@Component({
    selector: 'resource-summary',
    templateUrl: './resource.summary.component.html',
    styleUrls: ['resources.css']
})
export class ResourceSummaryComponent implements OnInit {
    resourceModelCollection: ResourceModel[];
    resourceFilteredModelCollection: ResourceModel[]=[];
    IsFromProjectSelected: boolean = false;
    projectDetailModelCollection: NewProjectDetailModel[] = [];
    resourceProjectAssignment: ResourceProjectAllocationDetailModel[] = [];
    constructor(private fb: FormBuilder, public datepipe: DatePipe, private sharedService: serviceForRoute, private appcommService: ApiCommunicationService,
        public dialog: MatDialog, ) { }
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
        this.appcommService.getAll(actionName_Get_Resource_List, false).subscribe(resources => { this.FillResources(resources) });
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
        resources.forEach(a=>{
            a.ResourceSupervisor=resources.filter(b=>b.ResourceId==a.ResourceSupervisor)[0] !=undefined?resources.filter(b=>b.ResourceId==a.ResourceSupervisor)[0].ResourceName:"";
        })
        this.resourceModelCollection = resources;
    }

    FillProjectDetails(projects: NewProjectDetailModel[]): void {
        this.projectDetailModelCollection = projects;
    }

    FillProjectResourceAssigned(projectResources: ResourceProjectAllocationDetailModel[]): void {
        this.resourceProjectAssignment = projectResources;
    }
    
    outCollectionVar(e): void {
    this.resourceFilteredModelCollection=e;
    }

    openDialog(resourceId: string): void {
        if (this.resourceProjectAssignment.filter(a => a.ResourceId == resourceId).length > 0) {
            let dialogRef = this.dialog.open(ResourceProjectDetail, {
                width: '500px;',
                data: { ProjectDetailResourceSpecific: this.resourceProjectAssignment.filter(a => a.ResourceId == resourceId), ProjectDetails: this.projectDetailModelCollection }
            });

            dialogRef.afterClosed().subscribe(result => {
            });
        }
    }

    CheckIfProjectExist(resourceId:string){
         if (this.resourceProjectAssignment != undefined && this.resourceProjectAssignment.length > 0) {
            if (this.resourceProjectAssignment.filter(a => a.ResourceId == resourceId).length >= 1) {
                return 'link';
            }
            return '';
        }
    }

    SearchCriteria = [
        { enumvalue: SearchCriteriaTypeResource.ResourceId, viewValue: 'ResourceId' },
        { enumvalue: SearchCriteriaTypeResource.ResourceName, viewValue: 'ResourceName' },
        { enumvalue: SearchCriteriaTypeResource.ResourceSupervisor, viewValue: 'ResourceSupervisor' },
        { enumvalue: SearchCriteriaTypeResource.ResourceDOJ, viewValue: 'ResourceDOJ' }
    ];
    

}