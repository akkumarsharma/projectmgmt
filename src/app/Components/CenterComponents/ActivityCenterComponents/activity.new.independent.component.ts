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
@Component({
    selector: 'activity-new-independent',
    templateUrl: './activity.new.independent.component.html'
})
export class ActivityNewIndependentComponent implements OnInit {
    IsFromProjectTile:boolean=false;
    constructor(private fb: FormBuilder, public datepipe: DatePipe, private sharedService: serviceForRoute, private appcommService: ApiCommunicationService) { }
    ngOnInit(): void {

    }
}