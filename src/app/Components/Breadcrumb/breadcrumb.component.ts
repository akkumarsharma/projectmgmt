import { Component, Input } from '@angular/core';
import { Breadcrumb } from './breadcrumb';
import { CenterComm } from '../../CommonClasses/centerComm'
import { CenterIdentifier } from '../../../enums/center.identifier'
import { serviceForRoute } from '../../Services/SharedServices.service'
@Component({
    selector: 'breadcrumb-menu',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['breadcrumb.css']
    //   providers:[serviceForRoute]

})

export class BreadcrumbComponent {
    constructor(private sharedService: serviceForRoute) {

    }
    @Input('menuItemInput') menuItemInput: Breadcrumb;
    // MenuName:string=this.menuItemInput.MenuValue
    // MenuClass:string=this.menuItemInput.MenuClass
    centerCommObj: CenterComm;
    switchComponent() {
        if (this.menuItemInput.MenuClass != "active") {
            if(this.menuItemInput.MenuClass != "inactiveright"){
                switch (this.menuItemInput.centerIdentity) {
                case CenterIdentifier.createNewProject:
                    this.centerCommObj = new CenterComm;
                    this.centerCommObj.CommType = CenterIdentifier.createNewProject;
                    this.centerCommObj.Id = null;
                    this.sharedService.sendMessage(this.centerCommObj);
                    break;
                case CenterIdentifier.createNewProjectActivity:
                    this.centerCommObj = new CenterComm;
                    this.centerCommObj.CommType = CenterIdentifier.createNewProjectActivity;
                    this.centerCommObj.Id = null;
                    this.sharedService.sendMessage(this.centerCommObj);
                    break;
                default:
            }
            }
        }
    }
}