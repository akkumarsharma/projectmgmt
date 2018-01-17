import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../Components/Loader/loader.service';
import { serviceForRoute } from '../Services/SharedServices.service'

@Injectable()
export class ApiCommunicationService {
    constructor(private _http: Http, private loaderService: LoaderService, private http: HttpClient, private _serviceForRoute: serviceForRoute) { }
     //url:string="http://10.2.152.245:81/api/";
    // url: string = "http://localhost:53522/api/";
    url:string="http://10.2.152.245:4500/api/";
    results: any;
    
createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization',this._serviceForRoute.getToken()); 
  }

    get(id: string,action: string): Observable<any> {
        this.loaderService.show();
        return this._http.get(this.url + action+ id)
            .map((response) => {
                    return response
            })
            .catch(this.handleError)
            .finally(() => {
                this.loaderService.hide();
            });
    }

    getAll(action: string, isFromCache: boolean): any {
        this.loaderService.show();
        this._serviceForRoute.setIfcacheRequired(isFromCache);
        //   let timeStamp = +new Date();
        // uniqueUrl=this.url + action+'?tsp=' + timeStamp
        //let headers = new Headers();
        //headers.append('Authorization', '"Bearer "+ this._serviceForRoute.getToken()');
        return this.http.get(this.url + action)
            .map(
            (response) => {
                //if (response.status==200) {
                return response
                //}
            }
            )
            .catch(this.handleError)
            .finally(() => {
                this.loaderService.hide();
            });
    }


    post(model: any, action: string): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ this._serviceForRoute.getToken() });
        let options = new RequestOptions({ headers: headers});
        this.loaderService.show();
        return this._http.post(this.url + action, body, options)
            .map((response) => {
               // if (response.status == 200) {
                    // return "1"
                    return response;
               //}
            }
            )
            .catch(this.handleError)
            .finally(() => {
                this.loaderService.hide();
            });
    }

    put(id: string, model: any, action: string): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.loaderService.show();
       // id = id.replace(/"/g, '');
       //nodejs
        return this._http.put(this.url + action + id, body, options)
            .map((response: Response) => {
                if (response.status == 200) {
                    // return "1"
                    return response;
                }
            })
            .catch(this.handleError)
            .finally(() => {
                this.loaderService.hide();
            });
    }

    delete(id: string, action: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.loaderService.show();
        //id = id.replace(/"/g, '');
        //nodejs
        return this._http.delete(this.url + action + id, options)
            .map((response) => {
                if (response.status == 200) {
                    // return "1"
                    return response;
                }
            }
            )
            .catch(this.handleError)
            .finally(() => {
                this.loaderService.hide();
            });
    }

    private handleError(error: Response) {
        console.error('Error Occured' + error);
        return Observable.throw(error || 'Server error');
    }


}