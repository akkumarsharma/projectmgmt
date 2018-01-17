import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NewProjectDetailModel } from '../../../../Models/NewProjectDetailModel'

@Component({
  selector: 'project-selected-projectdtl-tab',
  templateUrl: './project.selected.projectdtl.tab.html',
  styleUrls: ['project.selected.css']
})

export class ProjectSelectedProjectdtlTab{
    @Input() ProjectDetailForTab:NewProjectDetailModel;
}