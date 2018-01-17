import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';
  import { Injectable } from '@angular/core';

  @Injectable()
   export class HttpCache {
//      private dictionaryList : Map<HttpRequest<any>, HttpResponse<any>>=new  Map<HttpRequest<any>, HttpResponse<any>>();
private dictionaryList : Map<string, HttpResponse<any>>=new  Map<string, HttpResponse<any>>();
      constructor(){}
      
  /**
   * Returns a cached response, if any, or null if not present.
   */
   get(req: HttpRequest<any>): HttpResponse<any>|null{
     return this.dictionaryList.get(req.url);
   }

  /**
   * Adds or updates the response in the cache.
   */
   put(req: HttpRequest<any>, resp: HttpResponse<any>): void{
   this.dictionaryList.set(req.url,resp);
   }

   delete(req:HttpRequest<any>):void{
       this.dictionaryList.delete(req.url);
   }

   ifExist(req:HttpRequest<any>):boolean{
       if(this.dictionaryList.has(req.url)){
           return true;
       }
   }
}