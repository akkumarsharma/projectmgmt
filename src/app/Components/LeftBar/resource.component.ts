import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { ElementRef, Renderer } from '@angular/core';
import { serviceForRoute } from '../../Services/SharedServices.service'
import { CenterComm } from '../../CommonClasses/centerComm'
import { CenterIdentifier } from '../../../enums/center.identifier'
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ApiCommunicationService } from '../../Services/api.communication.service'
import { ApiActionList } from '../../CommonClasses/api.action.list'
import { NewResourceDetailModel } from '../../Models/NewResourceDetailModel';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'left-bar-resource',
  templateUrl: './left.bar.resourcecomponent.html',
  styleUrls: ['./LeftBar.css']
})
export class ResourceComponent implements OnInit {
  resourceCtrl: FormControl;
  filteredResources: any;
  fullImagePath: string;
  centerCommObj: CenterComm;
  resouresList: NewResourceDetailModel[];
  resourceNames = [];
  subscription: Subscription;
  resourceModel:string;
  resourceCollection:NewResourceDetailModel[];
  ngOnInit(): void {
    this.LoadResources(true);
  }

  LoadResources(val: boolean): void {
    if (val == true) {
      this.resourceNames.length = 0;
      let actionName = ApiActionList.Get_Resource_List;
      this.appcommService.getAll(actionName,false).subscribe(resources => { this.FillResourcesName(resources) });
    }
  }
  FillResourcesName(resources: any): void {
   // var obj: NewResourceDetailModel[] = JSON.parse(resources);
   this.resourceCollection=resources;
    resources.forEach(item => {
      this.resourceNames.push(item.ResourceName);
    });

  }

  constructor(private router: Router, private sharedService: serviceForRoute, private renderer: Renderer, private appcommService: ApiCommunicationService) {
    this.resourceCtrl = new FormControl();
    this.subscription = this.sharedService.checkIfUpdateResourcesList().subscribe(message => { this.LoadResources(message) });
    this.filteredResources = this.resourceCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterReosurces(name));
    this.fullImagePath = '/assets/Images/Search_Image.jpg'
  }

  filterReosurces(val: string) {
    return val ? this.resourceNames.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.resourceNames;
  }

  onChange(newValue): void {
    if (newValue != undefined && newValue != null && this.resourceNames.filter(s=>s.toLowerCase()== newValue.toLowerCase()).length > 0) {
      this.centerCommObj = new CenterComm;
      this.centerCommObj.CommType = CenterIdentifier.selectResource;
      this.centerCommObj.Id = this.resourceCollection.filter(a=>a.ResourceName.toLowerCase()==newValue.toLowerCase())[0].ResourceId;
      this.sharedService.sendMessage(this.centerCommObj);
    }

  }
  newResourceClick() {
    this.centerCommObj = new CenterComm;
    this.centerCommObj.CommType = CenterIdentifier.resourceNewResourceCreation;
    this.centerCommObj.Id = null;
    this.sharedService.sendMessage(this.centerCommObj);
  }

  newResourceEventClick() {
    this.centerCommObj = new CenterComm;
    this.centerCommObj.CommType = CenterIdentifier.createNewResourceEvent;
    this.centerCommObj.Id = null;
    this.sharedService.sendMessage(this.centerCommObj);
  }

  resourceSummaryClick(){
      this.centerCommObj = new CenterComm;
    this.centerCommObj.CommType = CenterIdentifier.resourceSummary;
    this.centerCommObj.Id = null;
    this.sharedService.sendMessage(this.centerCommObj);
  }
}

