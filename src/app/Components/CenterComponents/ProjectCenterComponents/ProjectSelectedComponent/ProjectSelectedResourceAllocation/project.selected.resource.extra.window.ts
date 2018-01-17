import { Component, Inject, Input, OnInit, ViewChild,Output,EventEmitter,OnChanges } from '@angular/core';
import { SearchCriteriaTypeResource } from '../../../../../../enums/SearchCriteriaTypeResource';
import { ApiCommunicationService } from 'C:/Users/106313/Documents/Angular4/Major/projectMgmt/src/app/Services/api.communication.service';
import { ApiActionList } from 'C:/Users/106313/Documents/Angular4/Major/projectMgmt/src/app/CommonClasses/api.action.list';
import { NewProjectDetailModel } from 'C:/Users/106313/Documents/Angular4/Major/projectMgmt/src/app/Models/NewProjectDetailModel';
import { ResourceProjectAllocationDetailModel } from 'C:/Users/106313/Documents/Angular4/Major/projectMgmt/src/app/Models/ResourceProjectAllocationDetailModel';
import { ResourceModel } from 'C:/Users/106313/Documents/Angular4/Major/projectMgmt/src/app/Models/ResourceModel';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'project-selected-resource-extra-window',
    templateUrl: './project.selected.resource.extra.window.html',
    styleUrls: ['project.selected.resource.allocation.css']
})

export class ProjectSelectedResourceExtraWindow implements OnChanges {
    @Input() IsAddorEdit: boolean;
    @Input() resourceProjectAssignment: ResourceProjectAllocationDetailModel[] = [];
    @Input() ProjectCode: string
    @Input() ResourceId: string
    @Output() UpdateProjectAssignmentList = new EventEmitter<boolean>();
    @ViewChild('elementCtrl') myElem; 
    eventStartDateControl: FormControl;
    eventEndDateControl: FormControl;
    eventStartDateBind: string;
    eventEndDateBind: string;
    percentageAllocation: number;
    
    constructor(private appcommService: ApiCommunicationService,private datepipe: DatePipe){

    }
    ngOnInit(): void {
        this.eventStartDateControl = new FormControl()
        this.eventEndDateControl = new FormControl()
    }

    ngOnChanges():void{

    }

    AddResource() {
        this.IsAddorEdit = true;
        this.myElem.nativeElement.style.display='none';
    }

    EditResource() {
        this.myElem.nativeElement.style.display='none';
        let filterList = this.resourceProjectAssignment.filter(a => a.ResourceId == this.ResourceId && a.ProjectCode == this.ProjectCode);
        if (filterList.length > 0) {
            this.IsAddorEdit = true;
            this.eventStartDateBind = filterList[0].StartDate;
            this.eventEndDateBind = filterList[0].EndDate;
            this.percentageAllocation = +filterList[0].AllocationPercentage;
        }
    }
    IsAdd(): boolean {
        if (this.resourceProjectAssignment.filter(a => a.ResourceId == this.ResourceId && a.ProjectCode == this.ProjectCode).length == 0) {
            return true;
        }
        return false;
    }

    IsEdit(): boolean {
        if (this.resourceProjectAssignment.filter(a => a.ResourceId == this.ResourceId && a.ProjectCode == this.ProjectCode).length > 0) {
            return true;
        }
        return false;
    }

    CancelResourceRecord(): void {
        this.IsAddorEdit = false;
        this.myElem.nativeElement.style.display='block';
    }

    AddResourceRecord(): void {
        let model = new ResourceProjectAllocationDetailModel();
        model.ProjectCode = this.ProjectCode;
        model.ResourceId = this.ResourceId;
        model.AllocationPercentage = this.percentageAllocation;
        model.StartDate = this.datepipe.transform(this.eventStartDateBind, 'yyyy-MM-dd')
        model.EndDate = this.datepipe.transform(this.eventEndDateBind, 'yyyy-MM-dd');
        let actionName=ApiActionList.Post_Project_Resource_Assigned;
              this.appcommService.post(model,actionName).subscribe(
                    data => {
                        if (data.status==200) //Success
                        {
                          this.IsAddorEdit = false;       
                          this.myElem.nativeElement.style.display='block';
                          this.UpdateProjectAssignmentList.emit(true);                 
                        }
                        else
                        {
                           
                        }                      
                    },
                    error => {
                    
                    }             
                );
    }

    EditResourceRecord(): void {
        let model = new ResourceProjectAllocationDetailModel();
        model.ResourceAssignedId = this.GetResourceAssignmentId();
        model.ProjectCode = this.ProjectCode;
        model.ResourceId = this.ResourceId;
        model.AllocationPercentage = this.percentageAllocation;
        model.StartDate = this.datepipe.transform(this.eventStartDateBind, 'yyyy-MM-dd')
        model.EndDate = this.datepipe.transform(this.eventEndDateBind, 'yyyy-MM-dd');
          let actionName=ApiActionList.Update_Project_Resource_Assigned;
              //this.appcommService.post(model,actionName).subscribe(
                  this.appcommService.put( model.ResourceAssignedId,model,actionName).subscribe(
                    data => {
                        if (data.status==200) //Success
                        {   
                            this.IsAddorEdit = false;   
                            this.myElem.nativeElement.style.display='block';    
                            this.UpdateProjectAssignmentList.emit(true);                                           
                        }
                        else
                        {                          
                        }
                        
                    },
                    error => {
                    
                    }            
                );
    }

    GetResourceAssignmentId(): string {
        let filterList = this.resourceProjectAssignment.filter(a => a.ResourceId == this.ResourceId && a.ProjectCode == this.ProjectCode);
        if (filterList.length > 0) {
            return filterList[0].ResourceAssignedId;
        }
        return undefined;
    }


}