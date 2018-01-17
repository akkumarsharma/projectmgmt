import { Component, ViewChild, Input } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes,
    query,
    stagger
} from '@angular/animations';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubActivityModel } from '../../../../Models/SubActivityModel';
import { SubActivityFormComponent } from './sub.activity.form.component';
import { ApiActionList } from '../../../../CommonClasses/api.action.list';
import { ApiCommunicationService } from '../../../../Services/api.communication.service'
@Component({
    selector: 'sub-activity-creation',
    templateUrl: './sub.activity.creation.component.html',
    // styleUrls: ['sub.activity.css'],
    animations: [
        trigger('AnimateGrid', [
            state('removeForm', style({
                // width: '100%',
                transform: 'translateX(0%)'
                //display:'block'
            })),
            state('addForm', style({
                // width: '30%',
                transform: 'translateX(+5%)'
                //display:'none'
            })),
            state('editForm', style({
                // width: '30%',
                transform: 'translateX(+5%)'
                //display:'none'
            })),
            transition('addForm => removeForm', animate('100ms ease-out')),
            // transition('addForm => removeForm', [
            //     animate(900, keyframes([
            //          style({ transform: 'translateX(-10%)' }),
            //         style({transform: 'Scale(0.2)'}),
            //         style({ transform: ' Scale(1)' })
            //     ]))
            // ]),
            //  transition('removeForm => addForm', [
            //     animate(900, keyframes([

            //          style({ transform: 'translateX(+10%) ' }),
            //         style({transform: 'Scale(0.2)'  }),
            //         style({ transform: 'Scale(1)' })
            //     ]))
            // ])
            transition('removeForm => addForm', animate('100ms ease-in'))
        ])]
})
export class SubActivityCreationComponent {
    switchForm: OpType;
    @Input() NewId;
    isShowSubActivityForm = false;
    title__add_cancel_activity = "+Add New"
    get stateName() {
        let ReturnOpVal;
        switch (this.switchForm) {
            case OpType.addActvity:
                ReturnOpVal = 'addForm';
                break;
            case OpType.cancelActivityForm:
                ReturnOpVal = 'removeForm';
                break;
            case OpType.editActivity:
                ReturnOpVal = 'editForm';
                break;
        }
        return ReturnOpVal;
    }

    constructor(private appcommService: ApiCommunicationService) { }

    AddNewActivity(): void {
        switch (this.switchForm) {
            case OpType.addActvity:
                this.switchForm = OpType.cancelActivityForm;
                break;
            case OpType.cancelActivityForm:
                this.switchForm = OpType.addActvity;
                break;
            case OpType.editActivity:
                this.switchForm = OpType.cancelActivityForm;
                break;
            default:
                this.switchForm = OpType.addActvity;
        }
    }

    @ViewChild(SubActivityFormComponent)
    private subComponent: SubActivityFormComponent;
    classesToApply: string;
    IsShowDetailActivityGrid: boolean = false;
    IsEditMode: boolean;
    AnimationEnd(): void {
        switch (this.switchForm) {
            case OpType.addActvity:
                this.isShowSubActivityForm = true;
                this.title__add_cancel_activity = "-Cancel";
                this.classesToApply = "col-lg-3 col-md-3 col-sm-3 col-xs-10";
                this.IsShowDetailActivityGrid = false;
                break;
            case OpType.cancelActivityForm:
                this.isShowSubActivityForm = false;
                this.title__add_cancel_activity = "+Add New";
                this.classesToApply = "col-lg-8 col-md-8 col-sm-8 col-xs-12";
                this.IsShowDetailActivityGrid = true;
                this.subComponent.ClearFormData();
                break;
            case OpType.editActivity:
                this.isShowSubActivityForm = true;
                this.title__add_cancel_activity = "-Cancel";
                this.classesToApply = "col-lg-3 col-md-3 col-sm-3 col-xs-10";
                this.IsShowDetailActivityGrid = false;
                break;
        }
    }

    cancelSubActivityCreation(): void {
        this.switchForm = OpType.cancelActivityForm
        this.AnimationEnd();
    }

    SubActivityList: SubActivityModel[] = [];
    subActivityModelToAdd(model: SubActivityModel): void {
        // if (this.SubActivityList != null && this.SubActivityList.length > 0) {
        //     if (model.SubActivityId != null && model.SubActivityId != "") {
        //         this.SubActivityList.forEach(a => {
        //             a.SubActivityId = a.SubActivityId.replace(/"/g, '');
        //         });
        //         let indexModel = this.SubActivityList.filter(a => a.SubActivityId == model.SubActivityId)[0];
        //         var index = this.SubActivityList.indexOf(indexModel);
        //         if (index !== -1) {
        //             this.SubActivityList.splice(index, 1);
        //             this.SubActivityList.push(model);
        //         }
        //     }
        if (this.IsEditMode == true) {
            if (model.SubActivityId != null && model.SubActivityId != "") {
                this.SubActivityList.forEach(a => {
                   // a.SubActivityId = a.SubActivityId.replace(/"/g, '');
                   //nodejs
                    a.SubActivityId = a.SubActivityId;
                });
                let indexModel = this.SubActivityList.filter(a => a.SubActivityId == model.SubActivityId)[0];
                var index = this.SubActivityList.indexOf(indexModel);
                if (index !== -1) {
                    this.SubActivityList.splice(index, 1);
                    this.SubActivityList.push(model);
                }
            }
        }
        else {
            this.SubActivityList.push(model);
        }
        this.IsEditMode=false;
    }

    IsEditModeUpdate(e): void {
        this.IsEditMode = e;
    }

    deleteSubActivityItem(id: string): void {
        let actionName = ApiActionList.Delete_SubActivity_Item;
        this.appcommService.delete(id, actionName).subscribe(
            data => {
                if (data.status == 200) //Success
                {
                    let indexModel = this.SubActivityList.filter(a => a.SubActivityId == id)[0];
                    var index = this.SubActivityList.indexOf(indexModel);

                    if (index !== -1) {
                        this.SubActivityList.splice(index, 1);
                    }

                }
                else {
                    // this.msg = "There is some issue in saving records, please contact to system administrator!"
                }

            },
            error => {
                // this.msg = error;
            }

        );
    }

    editSubActivityItem(model: SubActivityModel): void {
        this.switchForm = OpType.editActivity;
        this.subComponent.putFormData(model);
    }

}

enum OpType {
    addActvity = 0,
    cancelActivityForm = 1,
    editActivity = 2
}