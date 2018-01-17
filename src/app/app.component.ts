import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { serviceForRoute } from './Services/SharedServices.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  IsUserAuthenticated:boolean=false;
  subscription: Subscription;

  constructor(private messageService: serviceForRoute) {
        this.subscription = this.messageService.checkIfAuthenticateUser()
            .subscribe(message => {
                this.IsUserAuthenticated=message;
            });
    }
}
