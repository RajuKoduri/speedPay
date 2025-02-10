import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/source/utility.service';

@Component({
  selector: 'add-black-list-record',
  templateUrl: './add-black-list-record.component.html',
  styleUrls: ['./add-black-list-record.component.css']
})
export class AddBlackListRecordComponent implements OnInit {
  @Output() notifyParent = new EventEmitter()
  addBlackListForm :FormGroup
  // isAddBlackListPop:boolean = true;
  BlacklistTypesList: any;
  isValidator: boolean = false;
  date:any = new Date()
  constructor(private UtilityService:UtilityService, private router:Router) {
    this.addBlackListForm = new FormGroup({
      value: new FormControl('',[Validators.required]),
      type: new FormControl()
    })
   }

  ngOnInit(): void {
    console.log(this.date.toLocaleTimeString())
    let todayDate = new Date().toISOString()
    console.log(todayDate)
    
    console.log(this.f["value"])
    this.BlacklistTypes()

    this.addBlackListForm.patchValue({
      type:this.BlacklistTypesList[0].guid
    })
  }

  get f(){
    return this.addBlackListForm.controls
  }
  blackListPopup(){
    // this.isAddBlackListPop = !this.isAddBlackListPop
    this.notifyParent.emit()
  }

  BlacklistTypes(){
    let BlacklistTypes = localStorage.getItem("BlacklistTypes")
    if(BlacklistTypes){
      this.BlacklistTypesList = JSON.parse(BlacklistTypes)
    }
    console.log("BlacklistTypesList",this.BlacklistTypesList)
  }

  valueInput(event:any){
    let value = event.target.value
    if(value == ''){
      this.isValidator = true
    }
  }

  onSubmit(){
    let todayDate = new Date().toISOString()
    console.log(todayDate)
    let body = {
        objState :0,
        date : todayDate,
        type :this.f['type'].value,
        value :this.f['value'].value
    }
    console.log(body)
    this.UtilityService.setBlackListRecord(body).subscribe((data:any)=>{
      console.log(data)
      if(data.changedObjectList){
        // this.isAddBlackListPop = false 
        this.blackListPopup()
        // window.history.back();
      }
    })
  }

}
