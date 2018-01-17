import { Component, ContentChildren, QueryList, AfterContentInit,OnChanges,OnInit,ViewChildren } from '@angular/core';
import { Tab } from './tab';

@Component({
  selector: 'tabs',
  template:`
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a href="#">{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class Tabs implements AfterContentInit,OnInit,OnChanges {
  
  @ContentChildren(Tab) tabs: QueryList<Tab>;
  ngOnChanges(){
console.log("onchanges");
  }
  ngOnInit(){
console.log("ngOnInit");
  }

  ngOnDestroy(){
console.log("ngOnDestroy");
  }
  // contentChildren are set
  ngAfterContentInit() {
    console.log("ngAfterContentInit");
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    
    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  
  selectTab(tab: Tab){
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
    
    // activate the tab the user has clicked on.
    tab.active = true;
  }

  makeFirstTabActive(){
    let tabVar=new  QueryList<Tab>();
    this.tabs.toArray().forEach(tab => tab.active = false);
    this.selectTab(this.tabs.first);
  }

}