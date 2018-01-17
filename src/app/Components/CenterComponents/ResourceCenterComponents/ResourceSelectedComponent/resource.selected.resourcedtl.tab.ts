import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ResourceModel } from '../../../../Models/ResourceModel';

@Component({
    selector: 'resource-selected-resourcedtl',
    templateUrl: './resource.selected.resourcedtl.tab.html',
    styleUrls: ['resource.selected.css']
})

export class ResourceSelectedResourcedtlTab implements OnInit, OnChanges {
    @Input() resourceCollection: ResourceModel[];
    @Input() resourceId: string;
    resourceModel: ResourceModel;
    ngOnChanges(changes: SimpleChanges) {
        this.FillResourceModel();
    }
    ngOnInit(): void {
        this.FillResourceModel();
    }


    FillResourceModel() {
        if (this.resourceCollection.length > 0) {
            this.resourceModel = this.resourceCollection.filter(a => a.ResourceId == this.resourceId)[0]
        }
    }
    GetSupervisorName(Id) {
        return (Id != "" ? this.resourceCollection.filter(a => a.ResourceId == Id)[0].ResourceName : "");

    }
}