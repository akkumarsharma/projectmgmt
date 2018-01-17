import { Component } from '@angular/core';
import { CenterComm } from '../CommonClasses/centerComm'
import { CenterIdentifier } from '../../enums/center.identifier'
import { serviceForRoute } from '../Services/SharedServices.service'

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html'
})
export class TopComponent {
  centerCommObj: CenterComm;
  
  constructor(private sharedService: serviceForRoute) { }

  GotoHomePage(): void {
    this.centerCommObj = new CenterComm;
    this.centerCommObj.CommType = CenterIdentifier.homePage;
    this.centerCommObj.Id = null;
    this.sharedService.sendMessage(this.centerCommObj);
  }

  currentUser = function () {
    if(this.sharedService.isLoggedIn()==true){
      var token = this.sharedService.getToken();
    var payload = token.split('.')[1];
    payload = window.atob(payload);
    payload = JSON.parse(payload);
    return payload.Name;
    }
  }

  logout=function(){
    this.sharedService.setIfAuthenticateUser(false);
  }

}
