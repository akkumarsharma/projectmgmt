import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'common-filter',
  templateUrl: './common.filter.component.html',
     styleUrls:['./common.filter.component.css']
})
export class CommonFilterComponent {
  @Input() SearchCriteria: any;
  @Input() collection: any;
  @Output() outCollectionVar: EventEmitter<any> = new EventEmitter<any>();
  isCriteriaNotSelected: boolean = true;
  selectedCriteriaValue: string;
  FilterVal: string;
  collectionOut: any[]=[];
  onChange(newValue): void {
    if (newValue == this.selectedCriteriaValue) {
      this.isCriteriaNotSelected = false;
      this.collectionOut = this.collection;
      this.outCollectionVar.emit(this.collectionOut);
    }

  }


  filterResources() {
    if (this.FilterVal != null && this.FilterVal != "") {
      let collectionLocalVar: any[] = [];
      var keys = [];
      this.collection.forEach(a => {
        for (var key in a) {
          if (key == this.selectedCriteriaValue) {
            if (a[key] !=undefined && a[key] !="" && a[key] !=null && a[key].toLowerCase().indexOf(this.FilterVal.toLowerCase()) === 0) {
              collectionLocalVar.push(a);
            }
          }
        }
      }, this)
      this.collectionOut = collectionLocalVar;
    }
    else {
      this.collectionOut = this.collection;
    }
    this.outCollectionVar.emit(this.collectionOut);
  }
}