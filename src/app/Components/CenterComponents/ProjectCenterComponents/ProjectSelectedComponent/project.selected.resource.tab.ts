import { Component, Input, OnInit, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { ResourceDetailsForDisplay } from '../../../../Models/ResourceDetailsForDisplay';
@Component({
  selector: 'project-selected-resource-tab',
  templateUrl: './project.selected.resource.tab.html',
  styleUrls: ['project.selected.css']
})

export class ProjectSelectedResourceTab implements OnChanges, OnInit {
  @Input() ResourceDetailForTab: ResourceDetailsForDisplay[];
  @Input() ProjectCode: string;
  @Output() UpdateProjectAssignmentList = new EventEmitter<boolean>();
  IsAddEditResource: boolean;
  AddEditResource(): void {
    this.IsAddEditResource = true;
  }

  ngOnChanges(): void {
    this.IsAddEditResource = false;
  }

  ngOnInit() {
  }
  
  GotoList(): void {
    this.IsAddEditResource = false;
    this.UpdateProjectAssignmentList.emit(true);
  }
}