import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NewResourceDetailModel } from '../../../Models/NewResourceDetailModel';
import { DatePipe } from '@angular/common';
import { serviceForRoute } from '../../../Services/SharedServices.service'
import { CenterComm } from '../../../CommonClasses/centerComm'
import { CenterIdentifier } from '../../../../enums/center.identifier'
import { ApiCommunicationService } from '../../../Services/api.communication.service'
import { ApiActionList } from '../../../CommonClasses/api.action.list'
import { NewProjectEventModel } from '../../../Models/NewProjectEventModel';
import { SubActivityModel } from '../../../Models/SubActivityModel';
import { SearchCriteriaTypeActivity } from '../../../../enums/SearchCriteriaTypeActivity';
@Component({
    selector: 'activity-summary',
    templateUrl: './activity.summary.component.html'
})
export class ActivitySummaryComponent implements OnInit {
    activityModelCollection: NewProjectEventModel[] = [];
    activityModelCollectionToSend:NewProjectEventModel[] = [];
    subActivityModelCollection: SubActivityModel[] = [];
    IsFromProjectSelected:boolean=false;
    constructor(private fb: FormBuilder, public datepipe: DatePipe, private sharedService: serviceForRoute, private appcommService: ApiCommunicationService) { }
    ngOnInit(): void {
        this.Load();
    }

    Load(): void {
        this.GetActivities();
        this.GetSubActivityDetails();
    }

    GetActivities(): void {
        let actionName_Get_Activity_List = ApiActionList.Get_Activity_List;
        this.appcommService.getAll(actionName_Get_Activity_List, false).subscribe(activities => { this.FillActivities(activities) });
    }

    GetSubActivityDetails(): void {
        let actionName_Get_SubActivity_List = ApiActionList.Get_SubActivity_List;
        this.appcommService.getAll(actionName_Get_SubActivity_List, false).subscribe(subActivities => { this.FillSubActivitiesDetails(subActivities) });
    }

    FillActivities(activities: NewProjectEventModel[]): void {
        this.activityModelCollection = activities;
    }

    FillSubActivitiesDetails(subActivities: SubActivityModel[]): void {
        this.subActivityModelCollection = subActivities;
    }

    outCollectionVar(e): void {
    this.activityModelCollectionToSend=e;
}

 SearchCriteria = [
        { enumvalue: SearchCriteriaTypeActivity.ActivityId, viewValue: 'ActivityId' },
        { enumvalue: SearchCriteriaTypeActivity.ActivityName, viewValue: 'ActivityName' },
        { enumvalue: SearchCriteriaTypeActivity.ActivityStartDate, viewValue: 'ActivityStartDate' },
        { enumvalue: SearchCriteriaTypeActivity.ActivityEndDate, viewValue: 'ActivityEndDate' }
    ];
}