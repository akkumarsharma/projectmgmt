import { Component, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { serviceForRoute } from '../Services/SharedServices.service'
import { Subscription } from 'rxjs/Subscription';
import { CenterIdentifier } from '../../enums/center.identifier'
import { CenterComm } from '../CommonClasses/centerComm';
import { Breadcrumb } from '../Components/Breadcrumb/breadcrumb';
import { ApiCommunicationService } from '../Services/api.communication.service'
import { ApiActionList } from '../CommonClasses/api.action.list'
import { NewProjectDetailModel } from '../Models/NewProjectDetailModel';
import { NewProjectEventModel } from '../Models/NewProjectEventModel';
import { NewResourceDetailModel } from '../Models/NewResourceDetailModel';

@Component({
    selector: 'app-center',
    templateUrl: './center.component.html',
    styleUrls: ['center.component.css'],
    //   providers:[serviceForRoute]

})
export class CenterComponent implements OnDestroy {
    num: number;
    message: string;
    subscription: Subscription;
    Id: any;
    opType: string;
    msgArray = [];
    screenmgs: string;
    isShowProjectNew: boolean;
    isShowProjectEventNew: boolean;
    isShowProjectSelected: boolean;
    isShowProjectResourceAllocation: boolean;
    IsSubActivityCreation: boolean;
    IsResourceShowNewResourceCreation: boolean;
    IsIndependentActivityCreation: boolean;
    IsActivitySummary: boolean;
    IsResourceSummary: boolean;
    IsShowResourceSelected: boolean;
    NewId: string;
    TitleVal: string;
    IsFromProjectTile: boolean;
    IsHomePage: boolean = true;
    constructor(private messageService: serviceForRoute, private appcommService: ApiCommunicationService) {
        this.subscription = this.messageService.getMessage()
            .subscribe(message => {
                this.GetViewInfo(message)
            });
    }
    IsGotoTop: boolean = false;

    @HostListener("window:scroll", [])
    onWindowScroll() {
        const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (offset > 0) {
            this.IsGotoTop = true;
        }
        else {
            this.IsGotoTop = false;;
        }
    }
    GotoTop(): void {
        window.scrollTo(0, 0);
    }

    breadcrumbList: Breadcrumb[] = [];
    GetViewInfo(obj: CenterComm) {
        if (obj.CommType != undefined && obj.CommType != null) {
            this.HideAllCompBeforeLoad()
            this.breadcrumbList.length = 0
            switch (obj.CommType) {
                case CenterIdentifier.createNewProject:
                    this.screenmgs = "Create new project";
                    this.isShowProjectNew = true;
                    this.BuildBreadcrumb(CenterIdentifier.createNewProject);
                    break;
                case CenterIdentifier.createNewProjectActivity:
                    this.screenmgs = "Create new activity"
                    this.isShowProjectEventNew = true;
                    this.BuildBreadcrumb(CenterIdentifier.createNewProjectActivity);
                    this.IsFromProjectTile = true;
                    break;
                case CenterIdentifier.selectProject:
                    this.NewId = obj.Id;
                    let actionName = ApiActionList.Get_Project_List;
                    this.appcommService.getAll(actionName, true).subscribe(projects => { this.GetProjectName(projects) });
                    this.screenmgs = "Project details-" + this.TitleVal;
                    this.isShowProjectSelected = true;
                    break;
                case CenterIdentifier.createNewResourceEvent:
                    this.screenmgs = "create new resource event"
                    break;
                case CenterIdentifier.selectResource:
                    this.NewId = obj.Id;
                    let actionName_Get_Resource_List = ApiActionList.Get_Resource_List;
                    this.appcommService.getAll(actionName_Get_Resource_List, true).subscribe(resources => {
                        this.TitleVal = resources.filter(a => a.ResourceId == this.NewId)[0].ResourceName;
                        this.screenmgs = "Resource details-" + this.TitleVal;
                        this.IsShowResourceSelected = true;
                    });
                    break;
                case CenterIdentifier.newProjectResourceCreation:
                    this.NewId = obj.Id;
                    //nodejs
                    //this.NewId = this.NewId.replace(/"/g, '');
                    let actionName_project_list = ApiActionList.Get_Project_List;
                    this.appcommService.getAll(actionName_project_list, false)
                        .subscribe(projects => {
                            this.TitleVal = projects.filter(a => a.ProjectCode == this.NewId)[0].ProjectName
                            this.screenmgs = "Project Resource Allocation: " + this.TitleVal;
                            this.isShowProjectResourceAllocation = true;
                            this.BuildBreadcrumb(CenterIdentifier.newProjectResourceCreation);
                        });
                    break;
                case CenterIdentifier.subActivityCreation:
                    this.NewId = obj.Id;
                    //nodejs
                    //this.NewId = this.NewId.replace(/"/g, '');
                    let actionName_Get_Activity_List = ApiActionList.Get_Activity_List;
                    this.appcommService.getAll(actionName_Get_Activity_List, false)
                        .subscribe(activities => {
                            this.TitleVal = activities.filter(a => a.ActivityId == this.NewId)[0].ActivityName
                            this.screenmgs = "Create sub activities: " + this.TitleVal;
                            this.IsSubActivityCreation = true;
                            this.BuildBreadcrumb(CenterIdentifier.subActivityCreation);
                        });
                    break;
                case CenterIdentifier.resourceNewResourceCreation:
                    this.screenmgs = "Create new Resource";
                    this.IsResourceShowNewResourceCreation = true;
                    this.BuildBreadcrumb(CenterIdentifier.resourceNewResourceCreation);
                    break;
                case CenterIdentifier.createIndependentActivity:
                    this.screenmgs = "Create new Activity";
                    this.IsIndependentActivityCreation = true;
                    this.BuildBreadcrumb(CenterIdentifier.createIndependentActivity);
                    break;
                case CenterIdentifier.activitySummary:
                    this.screenmgs = "Activity Summary";
                    this.IsActivitySummary = true;
                    break;
                case CenterIdentifier.resourceSummary:
                    this.screenmgs = "Resource Summary";
                    this.IsResourceSummary = true;
                    break;
                case CenterIdentifier.homePage:
                    this.screenmgs = "";
                    this.IsHomePage = true;
                    break;
                default:
                    this.screenmgs = "Error"
            }
        }
    }
    GetProjectName(projects: NewProjectDetailModel[]): void {
        this.TitleVal = projects.filter(a => a.ProjectCode == this.NewId)[0].ProjectName
    }


    BuildBreadcrumb(typeIdentifier: CenterIdentifier): void {
        switch (typeIdentifier) {
            case CenterIdentifier.createNewProject:
                this.BuildBreadcrumbMenu("Create new project", "active", 1, CenterIdentifier.createNewProject)
                this.BuildBreadcrumbMenu("Project Resource Allocation", "inactiveright", 2, CenterIdentifier.newProjectResourceCreation)
                break;
            case CenterIdentifier.newProjectResourceCreation:
                this.BuildBreadcrumbMenu("Update project details", "inactiveleft", 1, CenterIdentifier.createNewProject)
                this.BuildBreadcrumbMenu("Project Resource Allocation", "active", 2, CenterIdentifier.newProjectResourceCreation)
                break;
            case CenterIdentifier.createNewProjectActivity:
                this.BuildBreadcrumbMenu("Create new activity", "active", 1, CenterIdentifier.createNewProjectActivity)
                this.BuildBreadcrumbMenu("Create sub activities", "inactiveright", 2, CenterIdentifier.subActivityCreation)
                break;
            case CenterIdentifier.subActivityCreation:
                this.BuildBreadcrumbMenu("Create new activity", "inactiveleft", 1, CenterIdentifier.createNewProjectActivity)
                this.BuildBreadcrumbMenu("Create sub activities", "active", 2, CenterIdentifier.subActivityCreation)
                break;
            case CenterIdentifier.resourceNewResourceCreation:
                this.BuildBreadcrumbMenu("Create new resource", "active", 1, CenterIdentifier.resourceNewResourceCreation)
                break;
            case CenterIdentifier.createIndependentActivity:
                this.BuildBreadcrumbMenu("Create new activity", "active", 1, CenterIdentifier.resourceNewResourceCreation)
                this.BuildBreadcrumbMenu("Create sub activities", "inactiveright", 2, CenterIdentifier.subActivityCreation)
                break;
            default:
        }
    }

    BuildBreadcrumbMenu(menuVal: string, menuclass: string, menuStep: number, centerIdentity: CenterIdentifier): void {
        let breadcrumb = new Breadcrumb();
        breadcrumb.MenuValue = menuVal;
        breadcrumb.MenuClass = menuclass;
        breadcrumb.MenuStep = menuStep;
        breadcrumb.centerIdentity = centerIdentity;
        this.breadcrumbList.push(breadcrumb);
    }

    HideAllCompBeforeLoad(): void {
        this.isShowProjectNew = false;
        this.isShowProjectEventNew = false;
        this.isShowProjectSelected = false;
        this.isShowProjectResourceAllocation = false;
        this.IsSubActivityCreation = false;
        this.IsResourceShowNewResourceCreation = false;
        this.IsIndependentActivityCreation = false;
        this.IsActivitySummary = false;
        this.IsResourceSummary = false;
        this.IsHomePage = false;
        this.IsShowResourceSelected=false;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
