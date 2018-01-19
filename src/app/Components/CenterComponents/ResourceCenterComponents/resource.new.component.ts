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
  selector: 'resource-new',
  templateUrl: './resource.new.component.html',
  styleUrls: ['./resources.css']
})
export class ResourceNewComponent implements OnInit {
  resourceNewForm: FormGroup;
  DOJControl: FormControl;
  supervisorCtrl: FormControl;
  DOJControlBind: string;
  ResourceName: string
  ResourceSupervisor: string
  newResourceDetailModel: NewResourceDetailModel;
  showDialog: boolean
  centerCommObj: CenterComm;

  filteredSupervisors: any;
  SupervisorNames = [];
  resourceInfo: NewResourceDetailModel[];
  //
  users: any;
  msg: string;
  isErrorMsg: boolean;

  unqueId_exist_msg: string;
  showNonAvalMsg: boolean;
  isUniqueIdAvailable: boolean;
  showUniqueIdAvalImage:boolean;

  //
  constructor(private fb: FormBuilder, public datepipe: DatePipe, private sharedService: serviceForRoute, private appcommService: ApiCommunicationService) {

  }



  filterSupervisors(val: string) {
    return val ? this.SupervisorNames.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.SupervisorNames;
  }

  ngOnInit(): void {
    this.resourceNewForm = this.fb.group({
      ResourceName: ['', Validators.required],
      ResourceEmail: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
      ])),
      SGUniqueId: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)]))
    });
    this.DOJControl = new FormControl(null, [
      Validators.required])
    this.supervisorCtrl = new FormControl();
    this.filteredSupervisors = this.supervisorCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterSupervisors(name));
    this.LoadResources();
  }

  LoadResources(): void {
    this.SupervisorNames.length = 0;
    let actionName = ApiActionList.Get_Resource_List;
    this.appcommService.getAll(actionName, true).subscribe(resources => { this.FillSupervisorName(resources) });
  }

  FillSupervisorName(resources: any): void {

    this.resourceInfo = resources;
    this.resourceInfo.forEach(item => {
      if (item.ResourceName != undefined) {
        this.SupervisorNames.push(item.ResourceName);
      }
    })
    this.removeDuplicates(this.SupervisorNames);
  };

  removeDuplicates(arr) {
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) == -1) {
        unique_array.push(arr[i])
      }
    }
    this.SupervisorNames = [];
    this.SupervisorNames = unique_array;
  }


  onSubmit(formData: any) {
    this.isErrorMsg = false;
    this.newResourceDetailModel = new NewResourceDetailModel();
    this.newResourceDetailModel.ResourceName = formData.value.ResourceName;
    this.newResourceDetailModel.SGUniqueId = formData.value.SGUniqueId;
    this.newResourceDetailModel.ResourceEmail = formData.value.ResourceEmail;
    this.newResourceDetailModel.ResourceSupervisor = this.ResourceSupervisor != "" && this.ResourceSupervisor != undefined ?
      this.resourceInfo.filter(a => a.ResourceName.toLowerCase() == this.ResourceSupervisor.toLowerCase())[0].ResourceId : "";
    this.newResourceDetailModel.ResourceDOJ = this.datepipe.transform(this.DOJControlBind, 'yyyy-MM-dd');

    // let actionName=ApiActionList.Post_Resource_New;
    // this.appcommService.post(this.newResourceDetailModel,actionName);
    let actionName = ApiActionList.Post_Resource_New;
    this.appcommService.post(this.newResourceDetailModel, actionName).subscribe(
      data => {
        if (data.status == 200) //Success
        {
          this.showDialog = true;
          this.sharedService.updateResourcesList(true);

        }
        else {
          this.msg = "There is some issue in saving records, please contact to system administrator!"
        }

      },
      error => {
        this.msg = error;
      }

    );
  }

  GotoHomePage(): void {
    this.showDialog = false;
    this.centerCommObj = new CenterComm;
    this.centerCommObj.CommType = CenterIdentifier.homePage;
    this.centerCommObj.Id = null;
    this.sharedService.sendMessage(this.centerCommObj);
  }

  Continue(): void {
    this.showDialog = !this.showDialog;
    this.ngOnInit();
    this.resourceNewForm.reset();
    this.supervisorCtrl.reset();
    this.showUniqueIdAvalImage=false;
  }

  onChangeSupervisorVal(event: any) {
    if (this.ResourceSupervisor != "" && this.ResourceSupervisor != undefined) {

      if (this.SupervisorNames.map(function (x) { return x.toLowerCase() }).indexOf(this.ResourceSupervisor.toLowerCase()) == -1) {
        this.isErrorMsg = true;
      }
      else {
        this.isErrorMsg = false;
      }
    }
    else if (this.ResourceSupervisor == "" || this.ResourceSupervisor == null) {
      this.isErrorMsg = false;
    }
  }

  checkIfUniqueIdAvailable() {
    let uniqueId = this.resourceNewForm.controls.SGUniqueId.value;
    if (this.resourceNewForm.controls.SGUniqueId.valid == true && uniqueId != "" && uniqueId != null) {
      let actionName = ApiActionList.Get_Resource_UniqueId_Availablity;
      this.appcommService.get(uniqueId, actionName).subscribe(
        data => {
          if (JSON.parse(data._body).error == "true") {
            this.showNonAvalMsg = true;
            this.unqueId_exist_msg = "unique Id already exists.";
            this.isUniqueIdAvailable = false;
            this.showUniqueIdAvalImage = false;
          }
          else {
            this.showNonAvalMsg = false;
            this.showUniqueIdAvalImage = true;
            this.isUniqueIdAvailable = true;
          }

        },
        error => {
          //  this.sharedService.setIfAuthenticateUser(true);
        }

      );
    }
    else {
      this.showUniqueIdAvalImage = false;
      this.showNonAvalMsg = false
    }
    console.log("send api first");


  }


   styleSGUniqueId() {
        if (this.showUniqueIdAvalImage == true)
            return 'funkystyling'
        else
            return '';
    }

}   