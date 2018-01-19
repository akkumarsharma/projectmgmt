import { Component, ElementRef, Input, OnInit, ViewChild, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
@Component({
    selector: 'tree-item',
    templateUrl: './tree.item.component.html',
    styleUrls: ['resource.selected.css']
})
export class TreeItemComponent implements OnChanges, AfterViewInit, OnInit {
    @Input()
    public dataDown: any = {};

    @Input()
    public IsFromParent: boolean;


    IsTreeThere: boolean;

    ngOnChanges(changes: SimpleChanges) {
        if (JSON.stringify(this.dataDown) == JSON.stringify({})) {
            this.IsTreeThere = false;
        }
        else {
            this.IsTreeThere = true;
        }
    }

    ngAfterViewInit() {
        var ulElements = document.getElementsByTagName('ul');
        for (var i = 0; i < ulElements.length; i++) {
            if (ulElements[i].className.indexOf(' ulClass')>-1) {
                ulElements[i].style.display = 'block';
            }
        }
        var plusElements = document.getElementsByClassName('plusClass')
        for (var i = 0; i < plusElements.length; i++) {
            document.getElementById(plusElements[i].id).style.display = 'none'
        }
    }

    ngOnInit(): void {
    }

    collapseUl(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        var idValue = idAttr.nodeValue;
        if (document.getElementById('ul_' + idValue.split("_")[1]).style.display == 'none') {
            document.getElementById('ul_' + idValue.split("_")[1]).style.display = 'block'
        }
        else if (document.getElementById('ul_' + idValue.split("_")[1]).style.display == 'block') {
            document.getElementById('ul_' + idValue.split("_")[1]).style.display = 'none'
        }
        else {
            document.getElementById('ul_' + idValue.split("_")[1]).style.display = 'none';
        }

        if (idValue.split("_")[0] == 'minus') {
            document.getElementById('minus_' + idValue.split("_")[1]).style.display = 'none';
            document.getElementById('plus_' + idValue.split("_")[1]).style.display = 'block';
        }
        else if (idValue.split("_")[0] == 'plus') {
            document.getElementById('plus_' + idValue.split("_")[1]).style.display = 'none';
            document.getElementById('minus_' + idValue.split("_")[1]).style.display = 'block';
        }

    }
}
