import { enableProdMode } from '@angular/core';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { TopComponent } from './Components/top.component';
import { LeftComponent } from './Components/left.component';
import { CenterComponent } from './Components/center.component';
import { ProjectComponent } from './Components/LeftBar/project.component';
import { ActivityComponent } from './Components/LeftBar/activity.component';
import { ResourceComponent } from './Components/LeftBar/resource.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { serviceForRoute } from './Services/SharedServices.service';
import { ApiCommunicationService } from './Services/api.communication.service';
import { CollapsibleModule } from 'angular2-collapsible';
import { ProjectNewComponent } from './Components/CenterComponents/ProjectCenterComponents/ProjectNewComponent/project.new.component';
import { ActivityNewIndependentComponent } from './Components/CenterComponents/ActivityCenterComponents/activity.new.independent.component';
import { ActivitySummaryComponent } from './Components/CenterComponents/ActivityCenterComponents/activity.summary.component';
import { ResourceSummaryComponent } from './Components/CenterComponents/ResourceCenterComponents/resource.summary.component';
import { ResourceProjectDetail } from './Components/CenterComponents/ResourceCenterComponents/resource.project.detail';
import { ProjectSelectedComponent } from './Components/CenterComponents/ProjectCenterComponents/ProjectSelectedComponent/project.selected.component';
import { ProjectEventNewComponent } from './Components/CenterComponents/ProjectCenterComponents/ProjectEventNewComponent/project.event.new.component';
import { ControlMessages } from './Directives/control.message'
import { ControlMessagesForm } from './Directives/control.messages.form'
import { Tabs } from './Directives/Tabs/tabs'
import { Tab } from './Directives/Tabs/tab'
import { ProjectSelectedActivityTab } from './Components/CenterComponents/ProjectCenterComponents/ProjectSelectedComponent/project.selected.activity.tab';
import { ProjectSelectedProjectdtlTab } from './Components/CenterComponents/ProjectCenterComponents/ProjectSelectedComponent/project.selected.projectdtl.tab';
import { ProjectSelectedResourceTab } from './Components/CenterComponents/ProjectCenterComponents/ProjectSelectedComponent/project.selected.resource.tab';
import { ProjectSelectedActivityTabSubActivity } from './Components/CenterComponents/ProjectCenterComponents/ProjectSelectedComponent/project.selected.activity.tab.subActivity';
import {
  MatAutocompleteModule,
  MatInputModule,
  MatNativeDateModule,
  MatTabsModule,
  MatDatepickerModule,
  MatSelectModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatDialogModule
} from '@angular/material';
import { HttpModule } from '@angular/http';
//import {CdkTableModule} from '@angular/cdk';
import { CreateprojectsComponent } from './Components/createprojects/createprojects.component';
import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { DialogOnsubmitProjectdetailsComponent } from './Components/CenterComponents/ProjectCenterComponents/DialogOnsubmitProjectdetail/dialog.onsubmit.projectdetails.component';
import { ProjectResourceAllocationComponent } from './Components/CenterComponents/ProjectCenterComponents/ProjectResourceAllocation/project.resource.allocation.component'
import { ProjectResourceIndividualAllocation } from './Components/CenterComponents/ProjectCenterComponents/ProjectResourceAllocation/project.resource.individual.allocation'
import { BreadcrumbComponent } from './Components/Breadcrumb/breadcrumb.component';
import { LoaderComponent } from './Components/Loader/loader.component';
import { LoaderUnresponsive } from './Components/Loader/loader.unresponsive';
import { LoaderService } from './Components/Loader/loader.service';
import { SubActivityCreationComponent } from './Components/CenterComponents/ProjectCenterComponents/SubActivityCreation/sub.activity.creation.component'
import { SubActivityFormComponent } from './Components/CenterComponents/ProjectCenterComponents/SubActivityCreation/sub.activity.form.component'
import { CommonFilterComponent } from './Components/CommonComps/common.filter.component'
import { LoginComponent } from './Components/LoginComponent/login.component'
import { ResourceNewComponent } from './Components/CenterComponents/ResourceCenterComponents/resource.new.component';
import { HttpCache } from './CommonClasses/http.cache';
//  import { DateTimePickerModule } from 'ng-pick-datetime';
import { HttpClientModule } from '@angular/common/http';
import { CachingInterceptor } from './Interceptor/caching.interceptor ';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProjectSelectedResourceAllocation } from './Components/CenterComponents/ProjectCenterComponents/ProjectSelectedComponent/ProjectSelectedResourceAllocation/project.selected.resource.allocation'
import { ProjectSelectedResourceExtraWindow } from './Components/CenterComponents/ProjectCenterComponents/ProjectSelectedComponent/ProjectSelectedResourceAllocation/project.selected.resource.extra.window'

import { ResourceSelectedComponent } from './Components/CenterComponents/ResourceCenterComponents/ResourceSelectedComponent/resource.selected.component';
import { ResourceSelectedProjectdtlTab } from './Components/CenterComponents/ResourceCenterComponents/ResourceSelectedComponent/resource.selected.projectdtl.tab';
import { ResourceSelectedResourcedtlTab } from './Components/CenterComponents/ResourceCenterComponents/ResourceSelectedComponent/resource.selected.resourcedtl.tab';
import { ResourceSelectedResourcehierarcyTab } from './Components/CenterComponents/ResourceCenterComponents/ResourceSelectedComponent/resource.selected.resourcehierarcy.tab';
import { TreeItemComponent } from './Components/CenterComponents/ResourceCenterComponents/ResourceSelectedComponent/tree.item.component';
import { TreeItemParentComponent } from './Components/CenterComponents/ResourceCenterComponents/ResourceSelectedComponent/tree.item.parent.component';
@NgModule({

  imports: [
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    //CdkTableModule,
    MatAutocompleteModule,
    MatInputModule,
    MatNativeDateModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTabsModule,
    CollapsibleModule,
    MatDatepickerModule,
    ChartsModule,
    MatSelectModule,
    HttpClientModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  entryComponents: [ProjectSelectedActivityTabSubActivity,ResourceProjectDetail ],
  declarations: [AppComponent, TopComponent, LeftComponent, CenterComponent, ProjectComponent, ResourceComponent, ProjectNewComponent, CreateprojectsComponent,
    ProjectSelectedComponent, ProjectEventNewComponent, ControlMessages, ControlMessagesForm, DialogOnsubmitProjectdetailsComponent, ProjectResourceAllocationComponent, ProjectResourceIndividualAllocation,
    BreadcrumbComponent, Tabs, Tab, SubActivityCreationComponent, SubActivityFormComponent, ResourceNewComponent,
    LoaderComponent, ProjectSelectedActivityTab, ProjectSelectedProjectdtlTab, ProjectSelectedResourceTab, ProjectSelectedActivityTabSubActivity, ActivityComponent,
    ActivityNewIndependentComponent, ActivitySummaryComponent, ResourceSummaryComponent, ResourceProjectDetail, CommonFilterComponent, LoaderUnresponsive, ProjectSelectedResourceAllocation,
    ProjectSelectedResourceExtraWindow, LoginComponent, ResourceSelectedComponent, ResourceSelectedProjectdtlTab, ResourceSelectedResourcedtlTab, ResourceSelectedResourcehierarcyTab,
    TreeItemComponent,TreeItemParentComponent],
  bootstrap: [AppComponent],
  providers: [serviceForRoute, DatePipe, ApiCommunicationService, LoaderService, HttpCache,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true,
    }]
})
export class AppModule { }

//platformBrowserDynamic().bootstrapModule(AppModule);


/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
