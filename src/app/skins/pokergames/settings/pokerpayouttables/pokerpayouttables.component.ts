import { Component, OnInit,ViewChild } from '@angular/core';
import { CreatePokerPayoutTableComponent } from 'src/app/skins/admin-control/create-poker-payout-table/create-poker-payout-table.component';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { PokergamesService } from 'src/app/source/pokergames.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pokerpayouttables',
  templateUrl: './pokerpayouttables.component.html',
  styleUrls: ['./pokerpayouttables.component.css']
})
export class PokerpayouttablesComponent implements OnInit {
  @ViewChild(CreatePokerPayoutTableComponent) CreatePokerPayoutTableComponent: CreatePokerPayoutTableComponent | undefined;


  objList: any;
  payOut: any;
  payOutList: any;
  activeInactive: any;
  playerpaypopup: boolean = false
  subData: any;
  a_percents: any;
  b_placesIndices: any;
  c_playersCountIndices: any;
  objListsub: any = [];
  listOne: any = [];
  listTwo: any = [];
  listThree: any = [];
  PayoutStructureList: any;
  percents: any;
  PayoutTicketTypeList: any;
  Fixedobj: any = [];
  ticketTypes: any = [];
  selectinmdex: any;
  actionoptons:boolean = false
  PokerpayoutDatapop:boolean = false
  PokerpayoutData:any
  activetype:boolean = false
  ticketTypesview:any =[]
  Editdata: any;
  fixednamebtns: any;
  constructor(private PokergamesService: PokergamesService,private FileformatServiceService: FileformatServiceService ) { }

  ngOnInit(): void {
    this.PayoutStructure();
    this.PayoutTicketType();
    let body = {}
    this.PokergamesService.getPokerPayoutStructureList(body).subscribe((data => this.pokertablesData(data)))
  }
  // getpokerpayouttable(){
  //   let body:{}
  // }
  PayoutStructure() {
    const PayoutStructure = localStorage.getItem("PayoutStructure")
    if (PayoutStructure) {
      this.PayoutStructureList = JSON.parse(PayoutStructure)
    }
    console.log("PayoutStructureList", this.PayoutStructureList)
  }

  PayoutTicketType() {
    const PayoutTicketType = localStorage.getItem("PayoutTicketType")
    if (PayoutTicketType) {
      this.PayoutTicketTypeList = JSON.parse(PayoutTicketType)
    }
    console.log("PayoutTicketTypeList", this.PayoutTicketTypeList)
  }

  pokertablesData(data: any) {
    console.log(data);
    this.objList = data.objectList;
   this.Editdata = JSON.parse(JSON.stringify(data.objectList));
    console.log(this.objList)
    for (let m = 0; m < this.objList.length; m++) {
      if (this.objList[m].editable == false) {
        this.activeInactive = "Used"
      } else {
        this.activeInactive = "Editable"
      }
      this.objList[m].activIN = this.activeInactive
      for (let i = 0; i < this.PayoutStructureList.length; i++) {
        if (this.objList[m].structureType.lowLong == this.PayoutStructureList[i].guid.lowLong) {
          // this.objList[m].structureType = this.PayoutStructureList[i].value
          this.objList[m].structureTypename = this.PayoutStructureList[i].value
          this.Editdata[m].structureTypename = this.PayoutStructureList[i].value
          // console.log(this.objList[m].dictionaries)
          // console.log(this.objList[m])
        }
      }
    }
  }
  playerpayclosepopup() {
    this.playerpaypopup = false

  }
  subclick(i: any) {
    console.log(i);
   this.actionoptons = false
    this.playerpaypopup = true
    this.objListsub = this.objList[i]
    console.log(this.objListsub)
    this.listTwo = []
    if (this.objListsub.structureTypename == 'Float') {
    // if (this.objListsub.structureType == 'Float') {
      if (this.listTwo.length == 0) {
        const WinnersRanges01 = (this.objListsub.placesIndices)
        console.log(WinnersRanges01);
        this.percents = (this.objListsub.percents)

        this.listOne.push(this.objListsub.percents[0].percents[0]);
        // console.log(this.objListsub.percents[0].percents[0])
        // for (let s = 0; s < this.objListsub.percents[1].percents.length; s++) {
        //   this.listTwo.push(this.objListsub.percents[1].percents[s]);
        //   console.log(this.objListsub.percents[1].percents[s])
        // }
      }
    }
    else {
      this.Fixedobj = []
      this.ticketTypes = []
      this.Fixedobj.push(this.objListsub)
      console.log(this.Fixedobj);

      for (let i = 0; i < this.Fixedobj.length; i++) {
        for (let j = 0; j < this.Fixedobj[i].ticketTypes.length; j++) {
          console.log(this.Fixedobj[i].ticketTypes[j]);
          for (let k = 0; k < this.PayoutTicketTypeList.length; k++) {
            if (this.Fixedobj[i].ticketTypes[j] != null) {
              if (this.Fixedobj[i].ticketTypes[j].lowLong == this.PayoutTicketTypeList[k].guid.lowLong) {
                if (this.Fixedobj[i].buyins[j] > 0) {
                  this.Fixedobj[i].ticketTypes[j] = this.PayoutTicketTypeList[k].value + " " + this.Fixedobj[i].buyins[j] + " x Buy-In"
                } else {
                  this.Fixedobj[i].ticketTypes[j] = this.PayoutTicketTypeList[k].value
                }
              }
            }
            else {
              if (this.Fixedobj[i].buyins[j] > 0) {
                this.Fixedobj[i].ticketTypes[j] = this.Fixedobj[i].buyins[j] + " x Buy-In"
              }
            }
          }
          this.ticketTypes.push(this.Fixedobj[i].ticketTypes[j])
        }
      }

      console.log(this.objListsub.buyins);
      console.log(this.objListsub.ticketTypes)
      console.log(this.objList[i].ticketTypes)

    }
  }
  
  editedPayouttable(data: any,i:any){
    console.log(data)
    this.PokerpayoutDatapop = true
    // this.PokerpayoutData = data
   let list= this.Editdata[i]
    this.PokerpayoutData = list
    this.actionoptons = false
  }
  showpopactions(data:any, i:any) {
    this.selectinmdex = i;
    this.actionoptons = !this.actionoptons
    console.log(data)
    console.log(data.activIN)
    this.fixednamebtns = data.structureTypename
    console.log(this.fixednamebtns)
    if( data.activIN == "Used"){
      this.activetype = true
    } else{
      this.activetype = false
    }

   }
   closepopup(){
  this.PokerpayoutDatapop = false
   }
   numofplayers(){
   if(this.CreatePokerPayoutTableComponent){
    this.CreatePokerPayoutTableComponent.FixedEditWinnersPopUp()
   }
   }
   updatedrake(){
    if(this.CreatePokerPayoutTableComponent){
      this.CreatePokerPayoutTableComponent.onFormSubmit()
     }
   }
   EditWinnersPopUp(){
    if(this.CreatePokerPayoutTableComponent){
      this.CreatePokerPayoutTableComponent.EditWinnersPopUp()
     }
   }
   ParticipantPopUp(){
    if(this.CreatePokerPayoutTableComponent){
      this.CreatePokerPayoutTableComponent.ParticipantPopUp()
     }
   }

   CopyfromExistingPop(){
    if(this.CreatePokerPayoutTableComponent){
      this.CreatePokerPayoutTableComponent.CopyfromExistingPop()
     }
   }
   onFormSubmit(){
    if(this.CreatePokerPayoutTableComponent){
      this.CreatePokerPayoutTableComponent.onFormSubmit()
     }
   }


   exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PokerPayoutTablesExcelSheet.xlsx';
    XLSX.writeFile(wb, "PokerPayoutTablesExcelSheet.xlsx");

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element,"PokerPayoutTables")
  }


}
