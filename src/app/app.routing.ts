import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProjectComponent } from './Components/LeftBar/project.component';
import { ResourceComponent } from './Components/LeftBar/resource.component';
import { CenterComponent } from './Components/center.component';
import { LeftComponent } from './Components/left.component';
const appRoutes: Routes = [
    { path: 'project', component: ProjectComponent, outlet: 'projectOutlet' },
    { path: 'resource', component: ResourceComponent, outlet: 'resourceOutlet' },
    { path: 'center', component: CenterComponent }
];;

export const routing: ModuleWithProviders =
    RouterModule.forRoot(appRoutes);