import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/source/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-administrator',
  templateUrl: './create-new-administrator.component.html',
  styleUrls: ['./create-new-administrator.component.css']
})
export class CreateNewAdministratorComponent implements OnInit {
  createNnewAadministratorPopup: boolean = true;
  faceParameterslist: any;
  CreateAdminForm: FormGroup;
  formreg: FormGroup;
  viweBtn: any;
  disableBtn: boolean = true;
  values = '';

  constructor(private LoginService: LoginService) {
    this.CreateAdminForm = new FormGroup({
      loginName: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.pattern(".*\\S.*[a-zA-z0-9_-]"),Validators.pattern('[a-zA-Z0-9]*'),Validators.pattern(/^\S*$/)]),
      password: new FormControl("",[Validators.required,]),
      firstName: new FormControl("",[Validators.required,]),
      lastName: new FormControl("",[Validators.required,]),
      email: new FormControl("",[Validators.required,]),
      faces: new FormControl("",[Validators.required,]),
    })
    this.formreg= new FormGroup ({
      "usname": new FormControl("",[Validators.required,Validators.minLength(5),Validators.pattern(".*\\S.*[a-zA-z0-9_-]"),Validators.pattern('[a-zA-Z0-9]*'),Validators.pattern(/^\S*$/)]),
      // "pwd": new FormControl("",[Validators.required, Validators.minLength(6), Validators.maxLength(15) , Validators.pattern('[a-zA-Z0-9@#$%^&*()-_=+]*')]),
      // "email": new FormControl("",[Validators.required,Validators.minLength(5),Validators.email]),
      // "numbers": new FormControl("",[Validators.required,Validators.pattern('[6-9]\\d{9}')]),
     
   })
 
  }
  onKey(event: any) { // without type info
    this.values += event.target.value;
    console.log(this.values)
    if(this.values = ''){
      this.disableBtn = true;
    }else{
      this.disableBtn = false;

    }
  }

  ngOnInit(): void {
    // console.log(this.filterForm.value.loginName || this.filterForm.value.password || this.filterForm.value.firstName || this.filterForm.value.lastName || this.filterForm.value.email || this.filterForm.value.faces == "") 
    // this.viweBtn = this.filterForm.value.loginName || this.filterForm.value.password || this.filterForm.value.firstName || this.filterForm.value.lastName || this.filterForm.value.email || this.filterForm.value.faces == "";
   
    this.faceParameters();
  }
   get f(){
    console.log(this.CreateAdminForm.value.loginName.key)
    return this.CreateAdminForm.controls;
  }
 
  faceParameters() {
    const faceParameters = localStorage.getItem('faceParameters')
    if (faceParameters) {
      this.faceParameterslist = JSON.parse(faceParameters)
    }
    console.log(this.faceParameterslist)
  }
  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            dirtyValues[key] = this.getDirtyValues(currentControl);
          // else
          //   dirtyValues[key] = currentControl.value;
        }
      });

    return dirtyValues;
  }
  onFormSubmit() {
  
    let fillterbody = this.getDirtyValues(this.CreateAdminForm)
    console.log(this.CreateAdminForm.value)

    fillterbody["loginName"] = this.CreateAdminForm.value.loginName != null ? this.CreateAdminForm.value.loginName : undefined
    fillterbody["password"] = this.CreateAdminForm.value.password != null ? this.CreateAdminForm.value.password : undefined
    fillterbody["firstName"] = this.CreateAdminForm.value.firstName
    fillterbody["lastName"] = this.CreateAdminForm.value.lastName
    fillterbody["email"] = this.CreateAdminForm.value.email != null ? this.CreateAdminForm.value.email : undefined
    fillterbody["faces"] = this.CreateAdminForm.value.faces != null ? [this.CreateAdminForm.value.faces] : undefined

    console.log(fillterbody)

    this.LoginService.setAdmin(fillterbody).subscribe((res) => { this.setAdminData(res) })
  }
  setAdminData(data: any) {
    console.log(data)
  }
  closepopup() {
    this.createNnewAadministratorPopup = false
  }
}
