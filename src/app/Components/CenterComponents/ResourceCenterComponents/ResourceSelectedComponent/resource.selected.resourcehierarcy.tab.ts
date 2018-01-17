import { Component, ElementRef, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ResourceModel } from '../../../../Models/ResourceModel';
@Component({
    selector: 'resource-selected-resourcehierarcy',
    templateUrl: './resource.selected.resourcehierarcy.tab.html',
    styleUrls: ['resource.selected.css']
})

export class ResourceSelectedResourcehierarcyTab implements OnChanges, OnInit {
    hierarchyDataDown: any = {};
    hierarchyDataUp: any = {};
    @Input() resourceForHierarchy: ResourceModel[];
    @Input() resourceId: string;
    ngOnChanges(changes: SimpleChanges) {
        if (changes.resourceForHierarchy != undefined) {
            if (changes.resourceForHierarchy.currentValue.length > 0) {
                let resourceTree = this.loadResourceTree();
                this.MakeResourceDownTreeForId(resourceTree);
                this.MakeResourceUpTreeForId(resourceTree);
            }
        }
    }

    ngOnInit(): void {
    }

    MakeResourceDownTreeForId(resourceTree) {
        let resourceTreeDown = this.getNestedChildren(resourceTree, this.resourceId);
        let resourceInfo = this.resourceForHierarchy.filter(a => a.ResourceId == this.resourceId)[0];
        if (resourceTreeDown.length > 0) {
            this.hierarchyDataDown.Id = this.resourceId;

            if (this.resourceForHierarchy != undefined && this.resourceForHierarchy.length > 0) {
                this.hierarchyDataDown.Name = resourceInfo.ResourceName
                this.hierarchyDataDown.Parent = resourceInfo.ResourceSupervisor
                this.hierarchyDataDown.Children = resourceTreeDown;
            }
        }
        else {
            let no_record:any={}
            no_record.Name = resourceInfo.ResourceName;
            no_record.Parent = resourceInfo.ResourceSupervisor;
            this.hierarchyDataDown=no_record;
        }
    }

    MakeResourceUpTreeForId(resourceTree) {
        let parentTree = this.getParentList(resourceTree, this.resourceId);
        this.parentListforGivenId = [];
        let resourceUptree = [];
        if (this.resourceId != "" && parentTree != undefined && parentTree.length > 0) {
            for (var index = 0; index < parentTree.length; index++) {
                if (parentTree[index] != "") {
                    resourceUptree[index] = {
                        "Id": parentTree[index], "Name": this.resourceForHierarchy.filter(a => a.ResourceId == parentTree[index])[0].ResourceName
                    }
                }
            }
        }
        resourceUptree = resourceUptree.reverse();
        // resourceUptree[resourceUptree.length] = {
        //     "Id": this.resourceId, "Name": this.resourceForHierarchy.filter(a => a.ResourceId == this.resourceId)[0].ResourceName
        // }
        this.hierarchyDataUp = resourceUptree;


    }

    getParentList(resourceTree, resId) {
        if (resId != "" && resId != undefined) {
            for (var i in resourceTree) {
                if (resourceTree[i].Id == resId) {
                    this.pushParent(resourceTree[i].Parent);
                    this.getParentList(resourceTree, resourceTree[i].Parent);
                }
            }
        }
        return this.parentListforGivenId;

    }


    parentListforGivenId: any = [];

    pushParent(parentId) {
        this.parentListforGivenId.push(parentId);
    }

    loadResourceTree() {
        if (this.resourceForHierarchy.length > 0) {
            let resourcetree = [];
            for (var index = 0; index < this.resourceForHierarchy.length; index++) {
                resourcetree[index] = {
                    "Id": this.resourceForHierarchy[index].ResourceId, "Name": this.resourceForHierarchy[index].ResourceName, "Parent": this.resourceForHierarchy[index].ResourceSupervisor
                }
            }
            return resourcetree;

        }
    }

    getNestedChildren(arr, parent) {
        var out = []
        for (var i in arr) {
            if (arr[i].Parent == parent) {
                var children = this.getNestedChildren(arr, arr[i].Id)

                if (children.length) {
                    arr[i].Children = children
                }
                out.push(arr[i])
            }
        }

        return out
    }


}