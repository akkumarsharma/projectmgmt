import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProjectEventModel } from '../../../../Models/NewProjectEventModel';
import { DatePipe } from '@angular/common';
import { serviceForRoute } from '../../../../Services/SharedServices.service'
import { CenterComm } from '../../../../CommonClasses/centerComm'
import { CenterIdentifier } from '../../../../../enums/center.identifier'
import { ApiCommunicationService } from '../../../../Services/api.communication.service'
import { ApiActionList } from '../../../../CommonClasses/api.action.list'
import { NewProjectDetailModel } from '../../../../Models/NewProjectDetailModel';
@Component({
  selector: 'project-event-new',
  templateUrl: './project.event.new.component.html'
})
export class ProjectEventNewComponent implements OnInit {
  @Input() IsFromProjectTile:boolean;
  constructor(private fb: FormBuilder, public datepipe: DatePipe,private sharedService: serviceForRoute,private appcommService: ApiCommunicationService) {
    this.projectCtrl = new FormControl('', [
      Validators.required])
    this.filteredProjects = this.projectCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterProjects(name));

  }
  projectEventNewFrm: FormGroup;
  eventStartDateControl: FormControl;
  eventEndDateControl: FormControl; 
  newProjectEventModel: NewProjectEventModel;
  eventStartDateBind: string;
  eventEndDateBind: string;
  project: string;
   projectNames = [];
   projectCtrl: FormControl;
   projectInfo:NewProjectDetailModel[];
  filteredProjects: any;
  NewActivityId:string;
  ngOnInit(): void {
    this.projectEventNewFrm = this.fb.group({
      EventNameControl: ['', Validators.required],
      EventDescControl: ['', Validators.required]
      // ProjectStartDate:[null,Validators.required]

    });
    this.eventStartDateControl = new FormControl(null, [
      Validators.required])
    this.eventEndDateControl = new FormControl(null, [
      Validators.required])
      this.LoadProjects();
  }

   LoadProjects(): void {
      this.projectNames.length = 0;
      let actionName = ApiActionList.Get_Project_List;
      this.appcommService.getAll(actionName,true).subscribe(projects => { this.FillProjectName(projects) });
  }

   FillProjectName(projects: any): void {
     //this.projectInfo= JSON.parse(projects.text());
     this.projectInfo= projects;
    this.projectInfo.forEach(item => {
      this.projectNames.push(item.ProjectName);
    });

  }

  filterProjects(val: string) {
    return val ? this.projectNames.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.projectNames;
  }

showDialog = false;
  onSubmit(formData: any) {
    this.newProjectEventModel = new NewProjectEventModel();
    this.newProjectEventModel.ActivityName = formData.value.EventNameControl;
    this.newProjectEventModel.ActivityDesc = formData.value.EventDescControl;
    if(this.project !=undefined){
    this.newProjectEventModel.ProjectCode = this.GetProjectCode(this.project)
    }
    this.newProjectEventModel.ActivityStartDate = this.datepipe.transform(this.eventStartDateBind, 'yyyy-MM-dd');
    this.newProjectEventModel.ActivityEndDate = this.datepipe.transform(this.eventEndDateBind, 'yyyy-MM-dd');
     let actionName=ApiActionList.Post_Activity_New;
    this.appcommService.post(this.newProjectEventModel,actionName).subscribe(
                    data => {
                        if (data.status==200) //Success
                        {   
                           //this.NewActivityId=data.text();
                           //if data is coming from nodejs in JSON
                           this.NewActivityId=JSON.parse(data.text()).ActivityId
                            this.showDialog = true;                
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

GetProjectCode(projectName:string):string{
return this.projectInfo.filter(a=>a.ProjectName==projectName)[0].ProjectCode;
} 

centerCommObj: CenterComm;
  SubActivityCreation():void{
     this.showDialog = false;
    this.centerCommObj = new CenterComm;
    this.centerCommObj.CommType = CenterIdentifier.subActivityCreation;
    this.centerCommObj.Id = this.NewActivityId;//projectId will go here
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