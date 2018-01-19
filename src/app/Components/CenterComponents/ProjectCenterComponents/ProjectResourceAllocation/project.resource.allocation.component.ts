import { Component, ViewChild, OnInit,Input } from '@angular/core';
import { ProjectResourceIndividualAllocation } from './project.resource.individual.allocation';
import { ResourceModel } from '../../../../Models/ResourceModel';
import { ResourceProjectAllocationDetailModel } from '../../../../Models/ResourceProjectAllocationDetailModel';
import { SearchCriteriaType } from '../../../../../enums/SearchCriteriaType';
import { tempModelResourceAllocationCheck } from './tempModelResourceAllocationCheck';
import { ApiCommunicationService } from '../../../../Services/api.communication.service'
import { ApiActionList } from '../../../../CommonClasses/api.action.list'
import { DatePipe } from '@angular/common';
@Component({
    selector: 'project-resource-allocation',
    templateUrl: './project.resource.allocation.html',
    styleUrls: ['project.resource.css']
})
export class ProjectResourceAllocationComponent implements OnInit {
    constructor(private appcommService: ApiCommunicationService,private datepipe: DatePipe) { }
    @Input() NewId;
    ngOnInit(): void {
        this.LoadResources(true);
    }
    resourceModelData = [];
    isCriteriaNotSelected: boolean = true;
    selectedCriteriaValue: string;
    resourceModelDataFiltered: ResourceModel[];
    isCurrentResourceAllocatedList: tempModelResourceAllocationCheck[] = [];
    enteredResourceData: string;
    testIt: string;
    reflectChange: string;
    resourceProjectAllocationDetailModelList: ResourceProjectAllocationDetailModel[] = [];
    update_expression: string = "(Updating)";
    Isupdate_expression: boolean = false;

    @ViewChild(ProjectResourceIndividualAllocation) private timerComponent: ProjectResourceIndividualAllocation;

    SearchCriteria = [
        { enumvalue: SearchCriteriaType.ResourceId, viewValue: 'ResourceId' },
        { enumvalue: SearchCriteriaType.ResourceName, viewValue: 'ResourceName' },
        { enumvalue: SearchCriteriaType.ResourceSupervisor, viewValue: 'ResourceSupervisor' },
        { enumvalue: SearchCriteriaType.ResourceDOJ, viewValue: 'ResourceDOJ' }
    ];
    LoadResources(val: boolean): void {
        let actionName = ApiActionList.Get_Resource_List;
        this.appcommService.getAll(actionName,false).subscribe(resources => { this.FillResourcesName(resources) });
        console.log(this.NewId);
    }

    FillResourcesName(resources: any): void {
        // var obj: ResourceModel[] = JSON.parse(resources.text());
         resources.forEach(a=>{
            a.ResourceSupervisor=resources.filter(b=>b.ResourceId==a.ResourceSupervisor)[0] !=undefined || ""?resources.filter(b=>b.ResourceId==a.ResourceSupervisor)[0].ResourceName:"";
            this.resourceModelData.push(a);
        })
        // resources.forEach(item => {
        //      item.ResourceSupervisor=resources.filter(b=>b.ResourceId==item.ResourceSupervisor)[0] !=undefined?resources.filter(b=>b.ResourceId==b.ResourceSupervisor)[0].ResourceName:"";
        //     this.resourceModelData.push(item);
        // });

    }

    onChange(newValue): void {
        if (newValue == this.selectedCriteriaValue) {
            this.isCriteriaNotSelected = false;
            this.enteredResourceData = null;
            this.resourceModelDataFiltered = null;
            console.log(newValue);
        }

    }


    enumTypeCriteria(): SearchCriteriaType {
        return this.SearchCriteria.filter(s => s.viewValue == this.selectedCriteriaValue)[0].enumvalue;
    }

    filterResources() {
        if (this.enteredResourceData != null && this.enteredResourceData != "") {
            switch (this.enumTypeCriteria()) {
                case SearchCriteriaType.ResourceId:
                    this.resourceModelDataFiltered = this.enteredResourceData ? this.resourceModelData.filter(s => s.ResourceId.toLowerCase().indexOf(this.enteredResourceData.toLowerCase()) === 0)
                        : null;
                    break;
                case SearchCriteriaType.ResourceName:
                    this.resourceModelDataFiltered = this.enteredResourceData ? this.resourceModelData.filter(s => s.ResourceName.toLowerCase().indexOf(this.enteredResourceData.toLowerCase()) === 0)
                        : null;
                    break;
                case SearchCriteriaType.ResourceSupervisor:
                    this.resourceModelDataFiltered = this.enteredResourceData ? this.resourceModelData.filter(s => s.ResourceSupervisor.toLowerCase().indexOf(this.enteredResourceData.toLowerCase()) === 0)
                        : null;
                    break;
                case SearchCriteriaType.ResourceDOJ:
                    this.resourceModelDataFiltered = this.enteredResourceData ? this.resourceModelData.filter(s => s.ResourceDOJ.toLowerCase().indexOf(this.enteredResourceData.toLowerCase()) === 0)
                        : null;
                    break;
                default:

            }
        }
        else {
            this.resourceModelDataFiltered = null;

        }
        this.reflectChange = this.makeid();
    }


    reflectChangeInputPropParent() {
        //this.reflectChange=this.makeid();
    }


    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    selectAllFilteresResources(num): void {
        if (num == 1) {
            this.testIt = "1";
            this.reflectChange = this.makeid();
        }
    }

    UnSelectAllFilteresResources(num): void {
        if (num == 1) {
            this.testIt = "2";
            this.resourceProjectAllocationDetailModelList.length = 0;
            this.isCurrentResourceAllocatedList.length = 0;
            this.reflectChange = this.makeid();
            console.log(this.resourceProjectAllocationDetailModelList);
        }
    }




    resourceProjectModelVariable(model: ResourceProjectAllocationDetailModel): void {
        this.isCurrentResourceAllocatedList.length = 0;
        if (this.resourceProjectAllocationDetailModelList.filter(a => a.ResourceId == model.ResourceId).length == 0) {
              //model.ProjectCode=this.NewId.replace(/"/g,'');
              //nodejs
              model.ProjectCode=this.NewId;
              let actionName=ApiActionList.Post_Project_Resource_Assigned;
              this.appcommService.post(model,actionName).subscribe(
                    data => {
                        if (data.status==200) //Success
                        {
                           
                        
                        }
                        else
                        {
                           
                        }
                        
                    },
                    error => {
                    
                    }
              
                );
            this.resourceProjectAllocationDetailModelList.push(model);
        }
        else if (this.resourceProjectAllocationDetailModelList != null &&
            this.resourceProjectAllocationDetailModelList.filter(a => a.ResourceId == model.ResourceId).length != 0) {
            //model.ProjectCode=this.NewId.replace(/"/g,'');
            //nodejs
            model.ProjectCode=this.NewId;
              let actionName=ApiActionList.Update_Project_Resource_Assigned;
              this.appcommService.post(model,actionName).subscribe(
                    data => {
                        if (data.status==200) //Success
                        {
                           
                        
                        }
                        else
                        {
                           
                        }
                        
                    },
                    error => {
                    
                    }
              
                );

            let indexModel = this.resourceProjectAllocationDetailModelList.filter(a => a.ResourceId == model.ResourceId)[0];
            var index = this.resourceProjectAllocationDetailModelList.indexOf(indexModel);
 
            if (index !== -1) {
                this.resourceProjectAllocationDetailModelList[index] = model;
                setTimeout(() => {
                    this.Isupdate_expression = false;
                }, 2500);
                this.Isupdate_expression = true;
            }
        }
        console.log(this.resourceProjectAllocationDetailModelList);
        this.resourceProjectAllocationDetailModelList.forEach(a => {
            let tempmodel = new tempModelResourceAllocationCheck();
            tempmodel.resId = a.ResourceId,
                tempmodel.isAllocatedVal = a.IsAllocation
            this.isCurrentResourceAllocatedList.push(tempmodel);
        });
    }

    ClearResourceProjectAllocation(e): void {
        let indexModel = this.resourceProjectAllocationDetailModelList.filter(a => a.ResourceId == e)[0];
        var index = this.resourceProjectAllocationDetailModelList.indexOf(indexModel);

        if (index !== -1) {
            this.resourceProjectAllocationDetailModelList.splice(index, 1);
        }

        let indexModel1 = this.isCurrentResourceAllocatedList.filter(a => a.resId == e)[0];
        index = this.isCurrentResourceAllocatedList.indexOf(indexModel1);

        if (index !== -1) {
            this.isCurrentResourceAllocatedList.splice(index, 1);
        }
    }

    resourceName(Id): string {
        let resource = this.resourceModelData.filter(a => a.ResourceId == Id)[0];
        return resource.ResourceName;
    }
}
