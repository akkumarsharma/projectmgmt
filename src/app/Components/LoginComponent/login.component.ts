import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { serviceForRoute } from '../../Services/SharedServices.service'
import { UserModel } from '../../Models/UserModel';
import { ApiCommunicationService } from '../../Services/api.communication.service'
import { ApiActionList } from '../../CommonClasses/api.action.list'
@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    registerForm: FormGroup;
    msg: string;
    IsLoginForm: boolean = true;
    IsRegisterForm: boolean = false;
    isUserAvailable: boolean = false;
    user_exist_msg: string;
    showNonAvalMsg: boolean;
    showuserAvalImage: boolean;
    constructor(private fb: FormBuilder, private sharedService: serviceForRoute, private appcommService: ApiCommunicationService) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            UserName: ['', Validators.required],
            Password: new FormControl("", Validators.compose([
                Validators.required,
                Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)
            ]))
        });
        this.registerForm = new FormGroup({
            Name: new FormControl("", Validators.required),
            Email: new FormControl("", Validators.compose([
                Validators.required,
                Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
            ])),
            UserName: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])),
            Password: new FormControl("", Validators.compose([
                Validators.required,
                Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)
            ]))
        });
    }

    goToRegister(): void {
        this.IsRegisterForm = true;
        this.IsLoginForm = false;
        this.msg = "";
        this.loginForm.reset();
    }
    goToLogin(): void {
        this.IsRegisterForm = false;
        this.IsLoginForm = true;
        this.msg = "";
        this.registerForm.reset();
    }

    onSubmitLogin(formData: any) {
        let userModel = new UserModel();
        userModel.UserName = formData.value.UserName;
        userModel.Password = formData.value.Password;

        let actionName = ApiActionList.Post_User_Login;
        this.appcommService.post(userModel, actionName).subscribe(
            data => {
                if (data.status == 200 && JSON.parse(data._body).error == null) //Success
                {
                    this.sharedService.saveToken(JSON.parse(data._body).token);
                    this.sharedService.setIfAuthenticateUser(true);
                }
                else if (JSON.parse(data._body).error != null) {
                    this.msg = JSON.parse(data._body).error;
                }
                else {
                    this.msg = JSON.parse(data._body).error;
                }

            },
            error => {
                //  this.sharedService.setIfAuthenticateUser(true);
            }

        );
    }

    onSubmitRegister(formData: any) {
        let userModel = new UserModel();
        userModel.UserName = formData.value.UserName;
        userModel.Password = formData.value.Password;
        userModel.Name = formData.value.Name;
        userModel.Email = formData.value.Email;

        let actionName = ApiActionList.Post_User_Register;
        this.appcommService.post(userModel, actionName).subscribe(
            data => {
                if (data.status == 200) //Success
                {
                    this.sharedService.saveToken(JSON.parse(data._body).token);
                    this.goToLogin();
                    this.loginForm.reset();
                    this.msg = "registration Successful!!";
                }
                else if (data.status == 204) {
                    this.msg = "*Invalid Credentials";
                }
                else {
                    this.msg = "Sorry,something went wrong!!";
                }

            },
            error => {
                //  this.sharedService.setIfAuthenticateUser(true);
            }

        );
    }

    checkIfUsernameAvailable() {
        let username = this.registerForm.controls.UserName.value;
        if (this.registerForm.controls.UserName.valid == true && username != "" && username != null) {
            let actionName = ApiActionList.Get_User_Availablity;
            this.appcommService.get(username, actionName).subscribe(
                data => {
                    if (JSON.parse(data._body).error == "true") {
                        this.showNonAvalMsg = true;
                        this.user_exist_msg = "username already exists.";
                        this.isUserAvailable = false;
                        this.showuserAvalImage = false;
                    }
                    else {
                        this.showNonAvalMsg = false;
                        this.showuserAvalImage = true;
                        this.isUserAvailable = true;
                    }

                },
                error => {
                    //  this.sharedService.setIfAuthenticateUser(true);
                }

            );
        }
        else {
            this.showuserAvalImage = false;
            this.showNonAvalMsg = false
        }

    }

    styleusername() {
        if (this.showuserAvalImage == true)
            return 'funkystyling'
        else
            return '';
    }
}