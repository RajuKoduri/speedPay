import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { CreatePokerRakeStructureComponent } from 'src/app/skins/admin-control/create-poker-rake-structure/create-poker-rake-structure.component';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';

@Component({
  selector: 'app-pokerrakestructure',
  templateUrl: './pokerrakestructure.component.html',
  styleUrls: ['./pokerrakestructure.component.css']
})
export class PokerrakestructureComponent implements OnInit {
  @ViewChild(CreatePokerRakeStructureComponent) CreatePokerRakeStructureComponent:CreatePokerRakeStructureComponent | undefined 
  filterdata: boolean = false;
  objList: any;
  filterForm: FormGroup
  faceParameterslist: any = [];
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  activStatus: any;
  rakeobject: any;
  assignobj: any = [];
  mergeobj: any;
  showRake: boolean = false
  loader: boolean = false;
  EnabledDisabledAllList: any;
  actionoptons:boolean = false
  RakestrutureDatapop:boolean = false
  selectinmdex:any
  RakestrutureData:any;

  
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;



  constructor(private Pokergamesservice: PokergamesService,private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      name: new FormControl(),
      status: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
  }

  ngOnInit(): void {
    this.Enabled_Disabled_All()
    // this.getPokerRakeStructure()
  
  }
  // Enabled_Disabled_All() {
  //   const Enabled_Disabled_All = localStorage.getItem("Enabled_Disabled_All")
  //   if (Enabled_Disabled_All) {
  //     this.EnabledDisabledAllList = JSON.parse(Enabled_Disabled_All)
  //   }
  //   console.log("EnabledDisabledAllList", this.EnabledDisabledAllList)
  // }
  Enabled_Disabled_All() {
    const Enabled_Disabled_All = localStorage.getItem("Enabled_Disabled_All")
    if (Enabled_Disabled_All) {
      this.EnabledDisabledAllList = JSON.parse(Enabled_Disabled_All)
    }
    console.log("EnabledDisabledAllList", this.EnabledDisabledAllList)
  }


  fastbackforward() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt("1")
      })
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    if (this.PageCount > this.objList.length) {

      this.pagecontrolbtn = true
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)

  }

  fastforward() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1
      })

    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    console.log(this.ResultCount)
    console.log((this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    if (this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
      this.pagecontrolbtn = false;
    } else {
      this.pagecontrolbtn = true;
    }

    this.onFormSubmit()
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)
  }


  next() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord)
      })
    console.log(this.filterForm.value.firstRecord)
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    console.log(this.ResultCount)
    console.log(this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount))
    console.log(((this.filterForm.value.maxCountRecord) * this.PageCount))
    console.log((this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit()

  }

  prev() {
    console.log("......Hhello......")
    if ((this.filterForm.value.firstRecord - 1) == parseInt(this.filterForm.value.maxCountRecord))
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)
      })
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)
      })
    console.log(this.filterForm.value.firstRecord)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1)
    if (this.PageCount > this.objList.length) {
      this.pagecontrolbtn = false
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
  }








  onFormSubmit() {


    if (this.filterForm.value.maxCountRecord > 1) {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    } else {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord - 1 / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    }
    // if (this.PageCount = this.playersData.length) {

    //   this.pagecontrolbtn = true
    // }
    if (this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
      this.pagecontrolbtn = false;
    } else {
      this.pagecontrolbtn = true;
    }




    this.objList = false;
    this.loader = true;
    let body = {
      "name": this.filterForm.value.name != null ? this.filterForm.value.name : undefined,
      "active": this.filterForm.value.status != null ? this.filterForm.value.status : undefined
    }
    this.Pokergamesservice.getrakestructure(body).subscribe(data => this.RakeStructuredata(data))
  }
  RakeStructuredata(data: any) {
    this.objList = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount

    if (this.objList != null) {
      this.loader = false;
    }

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }


    console.log(this.objList)
    for (let i = 0; i < this.objList.length; i++) {
      console.log(this.objList[i])
      console.log(this.objList[i].active)
      if (this.objList[i].active) {
        this.activStatus = "active"
      } else {
        this.activStatus = 'inactive'
      }
      this.objList[i].activIna = this.activStatus
      for (let j = 0; j < this.objList[i].rakes.length; j++) {
        this.rakeobject = this.objList[i].rakes
        console.log(this.rakeobject)
      }
      for (let k = 0; k < this.objList[i].ranges.length; k++) {
        this.rakeobject = this.objList[i].ranges
      }
    }
    console.log(this.rakeobject)
  }
  filterbtn() {
    this.filterdata = !this.filterdata;
  }
  showRakeTable(range: any, target: any) {
    this.actionoptons = false
    this.assignobj = [];
    this.showRake = true;
    let a_range = range;
    let a_target = target;
    for (let i = 0; i < a_range.length; i++) {
      this.assignobj.push(Object.assign(a_range[i], a_target[i]))
    }
    console.log(this.assignobj)
    for (let i = 0; i < this.assignobj.length; i++) {
      if (this.assignobj[i].to == -1) {
        this.assignobj[i].to = "and more"
      }
    }
  }
  rakestrupopup() {
    this.showRake = false;

  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'RakeStructureExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element,"RakeStructureExcelSheet")
  }

  showpopactions(data:any, data2:any,data3:any,i:any) {
   this.selectinmdex = i;
   this.actionoptons = !this.actionoptons
   console.log(data)
   console.log(data2)
   console.log(data3)
   
  }
  editedrakestructure(data:any){
    this.actionoptons = false
    this.RakestrutureDatapop = true
    this.RakestrutureData = data
  }
  closepopup(){
    this.RakestrutureDatapop = false
  }
  numofplayers(){
    if(this.CreatePokerRakeStructureComponent){

      this.CreatePokerRakeStructureComponent.ParticipantPopUp()
    }
  }
  updatedrake(){
    if(this.CreatePokerRakeStructureComponent){

      this.CreatePokerRakeStructureComponent.onFormSubmit()
    }
  }
  servicemethod(){
    //alert("enter poker Rake structure")
  }
  
}
