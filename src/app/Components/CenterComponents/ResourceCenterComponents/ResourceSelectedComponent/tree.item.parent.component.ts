import { Component, ElementRef, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
@Component({
    selector: 'tree-item-parent',
    templateUrl: './tree.item.parent.component.html',
    styleUrls: ['resource.selected.css']
})
export class TreeItemParentComponent {
    @Input()
    public dataUp: any = {};

    ngOnChanges(changes: SimpleChanges) {
        if(this.dataUp.length>0)
        {    
            //this.dataUp= this.dataUp.reverse();
        }
    }
}
