import { Component, Input, OnInit, ViewChild,OnChanges } from '@angular/core';
import { NewProjectEventModel } from '../../../../Models/NewProjectEventModel';
import { SubActivityModel } from '../../../../Models/SubActivityModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectSelectedActivityTabSubActivity } from './project.selected.activity.tab.subActivity'
import { ApiCommunicationService } from '../../../../Services/api.communication.service'
import { ApiActionList } from '../../../../CommonClasses/api.action.list'
import { NewProjectDetailModel } from '../../../../Models/NewProjectDetailModel';
@Component({
    selector: 'project-selected-activity-tab',
    templateUrl: './project.selected.activity.tab.html',
    styleUrls: ['project.selected.css']
})

export class ProjectSelectedActivityTab implements OnInit,OnChanges {
    @Input() ActivityDetailForTab: NewProjectEventModel[];
    @Input() SubActivityDetailForTab: SubActivityModel[];
    @Input() IsFromProjectSelected: boolean;
    projectDetailModelList: NewProjectDetailModel[] = [];
    constructor(public dialog: MatDialog, private appcommService: ApiCommunicationService) { }
     

    ngOnInit(): void {
        // if (this.IsFromProjectSelected == false) {
        //     debugger
        //     this.GetProjectDetail();
        // }
    }
    ngOnChanges() {
     if (this.IsFromProjectSelected == false) {
            this.GetProjectDetail();
        }
    }
    GetProjectDetail(): void {
        let actionName_Get_Project_List = ApiActionList.Get_Project_List;
        this.appcommService.getAll(actionName_Get_Project_List, true).subscribe(projects => { this.FillProjectDetails(projects) });
    }

    FillProjectDetails(projects: NewProjectDetailModel[]): void {
        this.projectDetailModelList = projects;
        this.ActivityDetailForTab.forEach(item => {
            item.ProjectName = this.GetProjectName(item.ProjectCode);
        })
    }

    GetProjectName(code: string): string {
        if (code != null || code != undefined) {
            return (this.projectDetailModelList.filter(a => a.ProjectCode == code)[0].ProjectName != undefined) ? this.projectDetailModelList.filter(a => a.ProjectCode == code)[0].ProjectName : "";
        }
        return "";

    }
    openDialog(activityId: string): void {  
        if (this.SubActivityDetailForTab.filter(a => a.SelectedMainActivity == activityId).length > 0) {
            let dialogRef = this.dialog.open(ProjectSelectedActivityTabSubActivity, {
                width: '500px;',
                data: { SubActivityDetailForTabIdSpecific: this.SubActivityDetailForTab.filter(a => a.SelectedMainActivity == activityId) }
            });

            dialogRef.afterClosed().subscribe(result => {
            });
        }
    }
    CheckIfSubActivityExist(activityId: string): string {
        if (this.SubActivityDetailForTab != undefined && this.SubActivityDetailForTab.length > 0) {
            if (this.SubActivityDetailForTab.filter(a => a.SelectedMainActivity == activityId).length >= 1) {
                return 'subActivityLink';
            }
            return '';
        }
    }

    //   SubActivityDetailForTabIdSpecific(activityId:string):SubActivityModel[]{
    //       return this.SubActivityDetailForTab.filter(a=>a.SelectedMainActivity==activityId);
    //   }
}