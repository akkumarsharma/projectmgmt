import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { serviceForRoute } from '../../../../Services/SharedServices.service'
import { Tabs } from '../../../../Directives/Tabs/tabs'
import { ApiCommunicationService } from '../../../../Services/api.communication.service'
import { ApiActionList } from '../../../../CommonClasses/api.action.list'
import { ResourceModel } from '../../../../Models/ResourceModel';
import { ResourceProjectAllocationDetailModel } from '../../../../Models/ResourceProjectAllocationDetailModel';
import { NewProjectDetailModel } from '../../../../Models/NewProjectDetailModel';

@Component({
    selector: 'resource-selected',
    templateUrl: './resource.selected.component.html',
    styleUrls: ['resource.selected.css']
})

export class ResourceSelectedComponent implements OnInit {
    subscription: Subscription;
    projectAssignedDetails: ResourceProjectAllocationDetailModel[] = [];
    @ViewChild(Tabs) private tabComponent: Tabs;
    resourceCollection: ResourceModel[]=[];
    resourceForHierarchy: ResourceModel[] = [];
    projecttDetails: NewProjectDetailModel;
    @Input() NewId;

    constructor(private appcommService: ApiCommunicationService, private messageService: serviceForRoute) {
        this.subscription = this.messageService.getcenterResourceSelectedMessage().subscribe(message => { this.Initalize(message) });
    }
    ngOnInit(): void {
        // this.Clear();
        this.Load();
    }
    Initalize(val?: string): void {
        this.NewId = val;
        // this.Clear();
        this.tabComponent.makeFirstTabActive();
        this.Load();
    }

    Load(): void {
        this.resourceForHierarchy.length=0;
        this.GetResources();
        this.GetResourcesAssigned();
        this.GetProjectDetail();
    }

    GetProjectDetail(): void {
        let actionName_Get_Project_List = ApiActionList.Get_Project_List;
        this.appcommService.getAll(actionName_Get_Project_List, true).subscribe(projects => { this.projecttDetails = projects });
    }

    GetResourcesAssigned(): void {
        let actionName_Get_Project_Resource_Assigned = ApiActionList.Get_Project_Resource_Assigned;
        this.appcommService.getAll(actionName_Get_Project_Resource_Assigned, false).subscribe(projectResources => { this.FillProjectResourceAssigned(projectResources) });
    }

    FillProjectResourceAssigned(projectResources: ResourceProjectAllocationDetailModel[]): void {
        this.projectAssignedDetails = projectResources.filter(a => a.ResourceId == this.NewId);
    }

    GetResources(): void {
        let actionName_Get_Resource_List = ApiActionList.Get_Resource_List;
        this.appcommService.getAll(actionName_Get_Resource_List, false).subscribe(resources => {
            this.resourceCollection = resources;
        });
    }

}