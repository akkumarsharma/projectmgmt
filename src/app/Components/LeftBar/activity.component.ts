import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiActionList } from '../../CommonClasses/api.action.list'
import { Subscription } from 'rxjs/Subscription';
import { serviceForRoute } from '../../Services/SharedServices.service'
import { CenterComm } from '../../CommonClasses/centerComm'
import { CenterIdentifier } from '../../../enums/center.identifier'
import { ApiCommunicationService } from '../../Services/api.communication.service'

@Component({
    selector: 'left-bar-activity',
    templateUrl: './left.bar.activitycomponent.html',
    styleUrls: ['./LeftBar.css'],

})
export class ActivityComponent {
    centerCommObj: CenterComm;
    constructor(private sharedService: serviceForRoute, private appcommService: ApiCommunicationService) {

    }
    newActivityClick() {
        this.centerCommObj = new CenterComm;
        this.centerCommObj.CommType = CenterIdentifier.createIndependentActivity;
        this.centerCommObj.Id = null;
        this.sharedService.sendMessage(this.centerCommObj);
    }

    activitySummaryClick(){
        this.centerCommObj = new CenterComm;
        this.centerCommObj.CommType = CenterIdentifier.activitySummary;
        this.centerCommObj.Id = null;
        this.sharedService.sendMessage(this.centerCommObj);
    }
}