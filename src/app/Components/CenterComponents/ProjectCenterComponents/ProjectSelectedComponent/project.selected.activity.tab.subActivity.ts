import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { NewProjectEventModel } from '../../../../Models/NewProjectEventModel';
import { SubActivityModel } from '../../../../Models/SubActivityModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'project-selected-activity-tab-subActivity',
  templateUrl: './project.selected.activity.tab.subActivity.html',
  styleUrls: ['project.selected.css']
})

export class ProjectSelectedActivityTabSubActivity {
  // @Input() SubActivityDetailForTabIdSpecific:SubActivityModel[];
  constructor(
    public dialogRef: MatDialogRef<ProjectSelectedActivityTabSubActivity>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}