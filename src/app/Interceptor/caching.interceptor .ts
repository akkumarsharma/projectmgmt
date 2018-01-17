import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { HttpCache } from '../CommonClasses/http.cache'
import { serviceForRoute } from '../Services/SharedServices.service'

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
    constructor(private cache: HttpCache,private _serviceForRoute:serviceForRoute) {}
    // apiCommunicationService:ApiCommunicationService;
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	// Before doing anything, it's important to only cache GET requests.
    // Skip this interceptor if the request method isn't GET.
    if (req.method !== 'GET') {
      return next.handle(req);
    }
 
    // First, check the cache to see if this request exists.
    let cachedResponse=null
    if(this._serviceForRoute.checkIfCacheRequired()==true){
         cachedResponse = this.cache.get(req);
    }
    
    if (cachedResponse) {
      // A cached response exists. Serve it instead of forwarding
      // the request to the next handler.
      return Observable.of(cachedResponse);
    }
 
    // No cached response exists. Go to the network, and cache
    // the response when it arrives.
    return next.handle(req).do(event => {
      // Remember, there may be other events besides just the response.
      if (event instanceof HttpResponse) {
      	// Update the cache.
        if(this.cache.ifExist(req)){
            this.cache.delete(req);
        }  
      	this.cache.put(req, event);
      }
    });
  }
}