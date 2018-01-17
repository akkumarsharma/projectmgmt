import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ResourceProjectAllocationDetailModel } from '../../../../Models/ResourceProjectAllocationDetailModel';

@Component({
    selector: 'resource-selected-projectdtl',
    templateUrl: './resource.selected.projectdtl.tab.html',
    styleUrls: ['resource.selected.css']
})

export class ResourceSelectedProjectdtlTab  {
 @Input() projectAssignedDetails:ResourceProjectAllocationDetailModel;
 @Input() projecttDetails:any;
 GetProjectName(ProjectCode: string) {
        return this.projecttDetails.filter(a => a.ProjectCode == ProjectCode)[0].ProjectName;
    }
}