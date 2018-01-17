import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NewProjectDetailModel } from '../../../../Models/NewProjectDetailModel';
import { DatePipe } from '@angular/common';
import { serviceForRoute } from '../../../../Services/SharedServices.service'
import { CenterComm } from '../../../../CommonClasses/centerComm'
import { CenterIdentifier } from '../../../../../enums/center.identifier'
import { ApiCommunicationService } from '../../../../Services/api.communication.service'
import { ApiActionList } from '../../../../CommonClasses/api.action.list'
@Component({
  selector: 'project-new',
  templateUrl: './project.new.component.html'
  // styles: [`
  //   .mat-form-field-underline
  //   {
  //       background: white;
  //   }
  //   .mat-icon {
  //     margin-bottom:50px;
  //   }
  //   .mat-form-field-wrapper{
  //   padding-bottom: 0;
  // }
  // .mat-input-ripple   {
  //       background: white;
  //   }
  //   .mat-form-field-ripple {
  //       background: white;
  //   }
  // `],
  // encapsulation: ViewEncapsulation.None,
})

export class ProjectNewComponent implements OnInit {
  projectNewFrm: FormGroup;
  projectStartDateControl: FormControl;
  projectEndDateControl: FormControl;
  newProjectDetailModel: NewProjectDetailModel;
  projectStartDateBind: string;
  projectEndDateBind: string;
  NewProjectCode:string;

  //start dialog
  showDialog = false;
  //end dialog
  constructor(private fb: FormBuilder, public datepipe: DatePipe, private sharedService: serviceForRoute, private appcommService:ApiCommunicationService) { }
  ngOnInit(): void {
    this.projectNewFrm = this.fb.group({
      ProjectName: ['', Validators.required],
      ProjectDesc: ['', Validators.required],
      // ProjectStartDate:[null,Validators.required]

    });
    this.projectStartDateControl = new FormControl(null, [
      Validators.required])
    this.projectEndDateControl = new FormControl(null, [
      Validators.required])
  }

  onSubmit(formData: any) {
    this.newProjectDetailModel = new NewProjectDetailModel();
    this.newProjectDetailModel.ProjectName = formData.value.ProjectName;
    this.newProjectDetailModel.ProjectDesc = formData.value.ProjectDesc;
    this.newProjectDetailModel.ProjectStartDate = this.datepipe.transform(this.projectStartDateBind, 'yyyy-MM-dd');
    this.newProjectDetailModel.ProjectEndDate = this.datepipe.transform(this.projectEndDateBind, 'yyyy-MM-dd');
  
    let actionName=ApiActionList.Post_Project_New;
    this.appcommService.post(this.newProjectDetailModel,actionName).subscribe(
                    data => {
                        if (data.status==200) //Success
                        {  
                           //this.NewProjectCode=data.text();
                           //nodejs
                           this.NewProjectCode=JSON.parse(data.text()).ProjectCode;
                            this.showDialog = true;
                            this.sharedService.updateProjectsList(true);
                        
                        }
                        else
                        {
                            // this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                        
                    },
                    error => {
                      // this.msg = error;
                    }
              
                );
  }

  centerCommObj: CenterComm;
  NewProjectResorceAllocation() {
    this.showDialog = false;
    this.centerCommObj = new CenterComm;
    this.centerCommObj.CommType = CenterIdentifier.newProjectResourceCreation;
    this.centerCommObj.Id =this.NewProjectCode;
    this.sharedService.sendMessage(this.centerCommObj);
  }
 
GotoHomePage():void{
   this.showDialog = false;
    this.centerCommObj = new CenterComm;
    this.centerCommObj.CommType = CenterIdentifier.homePage;
    this.centerCommObj.Id =null;
    this.sharedService.sendMessage(this.centerCommObj);
}



}
