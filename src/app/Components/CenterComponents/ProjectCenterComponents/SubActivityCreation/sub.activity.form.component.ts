import { Component, Output, EventEmitter, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubActivityModel } from '../../../../Models/SubActivityModel';
import { ApiCommunicationService } from '../../../../Services/api.communication.service'
import { ApiActionList } from '../../../../CommonClasses/api.action.list'
import { CenterComm } from '../../../../CommonClasses/centerComm'
import { CenterIdentifier } from '../../../../../enums/center.identifier'
import { serviceForRoute } from '../../../../Services/SharedServices.service'
@Component({
  selector: 'sub-activity-form',
  templateUrl: './sub.activity.form.component.html',
})
export class SubActivityFormComponent {
  @Input() NewId;
  @Output() cancelSubActivityCreation = new EventEmitter();
  @Output() subActivityModelToAdd = new EventEmitter<SubActivityModel>();
  @Output() IsEditModeUpdate = new EventEmitter<boolean>();
  centerCommObj: CenterComm;
  constructor(private fb: FormBuilder, public datepipe: DatePipe, private sharedService: serviceForRoute, private appcommService: ApiCommunicationService) { }
  subActivityForm: FormGroup;
  eventEndDateControl: FormControl;
  state: string;
  IsEditMode: boolean;
  SubActivityEndDate: string;
  SubActivityStartDate: string;
  SubActivityDesc: string;
  SubActivityName: string;
  SubActivityId: string;
  ngOnInit(): void {
    this.subActivityForm = this.fb.group({
      EventNameControl: ['', Validators.required],
      EventDescControl: ['', Validators.required],
      eventStartDateControl: [null, Validators.required],
      eventEndDateControl: [null, Validators.required]
    });
  }


  showDialog = false;
  subActivityModel: SubActivityModel;
  onSubmit(formData: any) {
    this.subActivityModel = new SubActivityModel();
    this.subActivityModel.SubActivityName = formData.value.EventNameControl;
    this.subActivityModel.SubActivityDesc = formData.value.EventDescControl;
    //this.subActivityModel.SelectedMainActivity = this.NewId.replace(/"/g, '');
    //nodejs
    this.subActivityModel.SelectedMainActivity = this.NewId;
    this.subActivityModel.SubActivityStartDate = this.datepipe.transform(formData.value.eventStartDateControl, 'yyyy-MM-dd');
    this.subActivityModel.SubActivityEndDate = this.datepipe.transform(formData.value.eventEndDateControl, 'yyyy-MM-dd');
    if (this.IsEditMode == true) {
      //nodejs
      //this.SubActivityId = this.SubActivityId.replace(/"/g, '');
      this.SubActivityId = this.SubActivityId;
      this.subActivityModel.SubActivityId = this.SubActivityId;
      let actionName = ApiActionList.Edit_SubActivity_Item;
      this.appcommService.put(this.SubActivityId, this.subActivityModel, actionName).subscribe(
        data => {
          if (data.status == 200) //Success
          {
            this.showDialog = true;
            this.IsEditModeUpdate.emit(true);
            this.IsEditMode=false;
            this.subActivityModelToAdd.emit(this.subActivityModel);

          }
          else {
            // this.msg = "There is some issue in saving records, please contact to system administrator!"
          }

        },
        error => {
          // this.msg = error;
        }

      );
    }
    else {
      let actionName = ApiActionList.Post_SubActivity_New;
      this.appcommService.post(this.subActivityModel, actionName).subscribe(
        data => {
          if (data.status == 200) //Success
          {
            this.showDialog = true;
            //nodejs
            //this.subActivityModel.SubActivityId = data.text();
            this.subActivityModel.SubActivityId = JSON.parse(data.text()).SubActivityId;
            this.subActivityModelToAdd.emit(this.subActivityModel);

          }
          else {
            // this.msg = "There is some issue in saving records, please contact to system administrator!"
          }

        },
        error => {
          // this.msg = error;
        }

      );
    }
    console.log(this.subActivityModel);
  }

  ClearFormData(): void {
    this.subActivityForm.reset();
  }

  putFormData(model: SubActivityModel): void {
    this.SubActivityId = model.SubActivityId;
    this.SubActivityName = model.SubActivityName;
    this.SubActivityDesc = model.SubActivityDesc;
    this.SubActivityStartDate = model.SubActivityStartDate;
    this.SubActivityEndDate = model.SubActivityEndDate;
    this.IsEditMode = true;
  }

  SubActivityCancel(): void {
    // this.showDialog=!this.showDialog;
    // this.cancelSubActivityCreation.emit();
    // this.ClearFormData(); 
    this.showDialog = false;
    this.centerCommObj = new CenterComm;
    this.centerCommObj.CommType = CenterIdentifier.homePage;
    this.centerCommObj.Id = null;
    this.sharedService.sendMessage(this.centerCommObj);

  }
  SubActivityContinue(): void {
    this.showDialog = !this.showDialog;
    this.cancelSubActivityCreation.emit();
    // this.subActivityModelToAdd.emit(this.subActivityModel);
  }



  // customErrorStateMatcher(c: FormControl): boolean {
  //    const hasInteraction = c.dirty || c.touched;
  //   const isInvalid = c.invalid;

  //   return !!(hasInteraction && isInvalid);
  // }
}