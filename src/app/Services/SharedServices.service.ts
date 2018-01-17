import { Injectable } from '@angular/core'
import { ProjectComponent } from '../Components/LeftBar/project.component'
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { CenterIdentifier } from '../../enums/center.identifier'
import { CenterComm } from '../CommonClasses/centerComm'
@Injectable()
export class serviceForRoute {

    private centerUpdate = new Subject<CenterComm>();
    private updateResources = new Subject<boolean>();
    private updateProjects = new Subject<boolean>();
    private centerProjectSelected = new Subject<string>();
    private centerResourceSelected = new Subject<string>();
    private IsUserAuthenticated = new Subject<boolean>();
    IsFromCache: boolean = false;
    token: string;
    updateResourcesList(val: boolean) {
        this.updateResources.next(val);
    }

    checkIfUpdateResourcesList(): Observable<boolean> {
        return this.updateResources.asObservable();
    }

    updateProjectsList(val: boolean) {
        this.updateProjects.next(val);
    }

    checkIfUpdateProjectsList(): Observable<boolean> {
        return this.updateProjects.asObservable();
    }

    sendMessage(obj: CenterComm) {
        this.centerUpdate.next(obj);
        if (obj.CommType == CenterIdentifier.selectProject) {
            this.centerProjectSelected.next(obj.Id);
        }
        if (obj.CommType == CenterIdentifier.selectResource) {
            this.centerResourceSelected.next(obj.Id);
        }
    }

    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    clearMessage() {
        this.centerUpdate.next();
    }

    getMessage(): Observable<CenterComm> {
        return this.centerUpdate.asObservable();
    }

    //
    setIfAuthenticateUser(val: boolean) {
        this.IsUserAuthenticated.next(val);
    }

    checkIfAuthenticateUser(): Observable<boolean> {
        return this.IsUserAuthenticated.asObservable();
    }
    //

    getcenterProjectSelectedMessage() {
        return this.centerProjectSelected.asObservable();
    }

    getcenterResourceSelectedMessage() {
        return this.centerResourceSelected.asObservable();
    }

    setIfcacheRequired(val: boolean) {
        this.IsFromCache = val;
    }
    checkIfCacheRequired(): boolean {
        return this.IsFromCache;
    }


    saveToken = function (token) {
        window.localStorage["token_id"] = token
        this.isLoggedIn();

    };

    getToken = function () {
        return window.localStorage["token_id"];
    };


    isLoggedIn = function () {
        var token = this.getToken();
        var payload;

        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };
}
