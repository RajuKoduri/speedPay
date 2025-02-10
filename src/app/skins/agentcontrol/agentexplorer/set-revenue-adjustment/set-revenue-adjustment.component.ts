import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-set-revenue-adjustment',
  templateUrl: './set-revenue-adjustment.component.html',
  styleUrls: ['./set-revenue-adjustment.component.css']
})
export class SetRevenueAdjustmentComponent implements OnInit {
  @Input() agentinfo:any;
  @Output() notifyParent = new EventEmitter();

  revenueAdjustmentForm:FormGroup
  revenueAdjustmentPopup:boolean = true
  adjustmentAmount:any;
  walletList: any;
  currencyCode: any;
  constructor() {
    this.revenueAdjustmentForm = new FormGroup({
      revenueAdjAmount: new FormControl('',[Validators.required]) 
    })
   }

  ngOnInit() {
    console.log(this.revenueAdjustmentForm.controls)
    console.log(this.agentinfo)
    this.adjustmentAmount = this.agentinfo.revenueAdjustments.value
    this.walletFormats()
  }

  get f(){
    return this.revenueAdjustmentForm.controls
  }

  closepopup(){
    this.notifyParent.emit();
    // this.revenueAdjustmentPopup = !this.revenueAdjustmentPopup
  }

  walletFormats(){
    let walletFormats = localStorage.getItem('walletFormats')
    if(walletFormats){
      this.walletList = JSON.parse(walletFormats)
    }
    console.log('walletList', this.walletList)

    this.walletList.forEach((list:any)=>{
      if(list.guid.lowLong == this.agentinfo.agent.affiliateWallet.lowLong){
        this.currencyCode = list.currencyCode
      }
    })
    console.log(this.currencyCode)
  }

}
