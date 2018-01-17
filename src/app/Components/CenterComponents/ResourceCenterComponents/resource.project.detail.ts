import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
    selector: 'resource-project-detail',
    templateUrl: './resource.project.detail.html',
    styleUrls: ['resources.css']
})

export class ResourceProjectDetail {
    constructor(
        public dialogRef: MatDialogRef<ResourceProjectDetail>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    GetProjectName(ProjectCode: string) {
        return this.data.ProjectDetails.filter(a => a.ProjectCode == ProjectCode)[0].ProjectName;
    }
}