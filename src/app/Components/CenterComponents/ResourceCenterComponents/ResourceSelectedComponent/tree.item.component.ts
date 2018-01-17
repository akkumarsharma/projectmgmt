import { Component, ElementRef, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
@Component({
    selector: 'tree-item',
    templateUrl:'./tree.item.component.html',
    styleUrls: ['resource.selected.css']
})
export class TreeItemComponent {
    @Input()
    public dataDown: any = {};

     @Input()
    public IsFromParent:boolean;

    IsTreeThere: boolean;

    ngOnChanges(changes: SimpleChanges) {
        if (JSON.stringify(this.dataDown) == JSON.stringify({})) {
            this.IsTreeThere = false;
        }
        else {
            this.IsTreeThere = true;
        }
    }
}
