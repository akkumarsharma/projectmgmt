import {
    Component,
    Directive,
    Renderer,
    HostListener,
    HostBinding,
    ElementRef,
    NgModule,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ResourceModel } from '../../../../Models/ResourceModel';
import { ResourceProjectAllocationDetailModel } from '../../../../Models/ResourceProjectAllocationDetailModel';
import { tempModelResourceAllocationCheck } from './tempModelResourceAllocationCheck';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'project-resource-individual-allocation',
    templateUrl: './project.resource.individual.allocation.html',
    styleUrls: ['project.resource.css'],
    
})
export class ProjectResourceIndividualAllocation {
    @Output() resourceProjectModelVariable = new EventEmitter<ResourceProjectAllocationDetailModel>();
    @Output() ClearResourceProjectAllocation = new EventEmitter<string>();
    @Input('resourceDetail') resourceDetail: ResourceModel;
    @Input('changeCap') changeCap: string;
    @Input('isCurrentResourceAllocatedList') isCurrentResourceAllocatedList: tempModelResourceAllocationCheck[];
    @Input('reflectChangeInputProp') reflectChangeInputProp:string;
    @Output() reflectChangeInputPropParent = new EventEmitter();
    addOrUpdateAfterSubmit:boolean=false;
    eventStartDateControl: FormControl;
    eventEndDateControl: FormControl;
    eventStartDateBind: Date = new Date("February 4, 2016 10:13:00");
    eventEndDateBind: Date = new Date("February 4, 2017 10:13:00");
    percentageAllocation: number = 100;
    IsAllocationCheckBoxModel: boolean = false;
    initialized = false;
    ngOnInit(): void {
        this.eventStartDateControl = new FormControl()
        this.eventEndDateControl = new FormControl()
        this.initialized = true;
        this.IsAllocationCheckBoxModel = false;
        this.addOrUpdateAfterSubmit=false;
        if (this.isCurrentResourceAllocatedList != null && this.isCurrentResourceAllocatedList.length != 0
        && this.isCurrentResourceAllocatedList.filter(a => a.resId == this.resourceDetail.ResourceId).length != 0) {
            this.IsAllocationCheckBoxModel = this.isCurrentResourceAllocatedList.filter(a => a.resId == this.resourceDetail.ResourceId)[0].isAllocatedVal;
        }

        if (this.IsAllocationCheckBoxModel == true) {
            this.IsAllocationCheckBoxModel = true;
            this.isResourceAllocated = true;
            this.addOrUpdateAfterSubmit=true;
        }
    }
    constructor(private datepipe: DatePipe) { }
    stringss: string;
    isResourceAllocated = false;
    IsAllocationCheckBoxModelChanged: boolean = false;
    onIsAllocateResource() {
        if (this.IsAllocationCheckBoxModel == true) {
            this.isResourceAllocated = true;
        }
        else {
            this.isResourceAllocated = false;
            this.ClearResourceProjectAllocation.emit(this.resourceDetail.ResourceId);
            this.addOrUpdateAfterSubmit=false;
        }
    }

    resourceProjectModel: ResourceProjectAllocationDetailModel;
    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    ngOnChanges() {
        if (this.initialized == true) {
            if (this.changeCap == "1") {
                this.IsAllocationCheckBoxModel = true;
                this.isResourceAllocated = true;
                this.reflectChangeInputPropParent.emit();
        }
            if (this.changeCap == "2") {
                this.IsAllocationCheckBoxModel = false;
                this.isResourceAllocated = false;
                this.addOrUpdateAfterSubmit=false;
                this.reflectChangeInputPropParent.emit();
            }
        }
    }

    FillResourceProjectModel(): void {
        let model = new ResourceProjectAllocationDetailModel();
        model.StartDate = this.datepipe.transform(this.eventStartDateBind, 'yyyy-MM-dd');
        model.EndDate = this.datepipe.transform(this.eventEndDateBind, 'yyyy-MM-dd');
        model.ResourceId = this.resourceDetail.ResourceId;
        model.AllocationPercentage = this.percentageAllocation;
        model.IsAllocation = true;
        this.resourceProjectModel = model;
    }

    SubmitResourceRecord(): void {
        if (this.IsAllocationCheckBoxModel == true) {
            this.isResourceAllocated = true;
            this.FillResourceProjectModel();
            this.resourceProjectModelVariable.emit(this.resourceProjectModel);
            this.addOrUpdateAfterSubmit=true;
        }
    }

}