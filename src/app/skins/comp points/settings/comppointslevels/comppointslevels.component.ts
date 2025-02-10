import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ComppointsService } from 'src/app/source/comppoints.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';


// import * As XLSX from 'xlsx;';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-comppointslevels',
  templateUrl: './comppointslevels.component.html',
  styleUrls: ['./comppointslevels.component.css']
})
export class ComppointslevelsComponent implements OnInit {
  comppointlevel: any;
  DYIDPLAYER: any;
  DYIDPLAYERList: any;
  loader: boolean = false
  CompLevelpopup:boolean = false
  ComppointsLevelres: any;
  backgroundcolor_id: any;
  indexvalue: any;
  Comppointleveldefault:boolean = true
  selectobtainedreq: any;
  Compointvalue:any
  levelname:any  
  multipleperiodvalue :any
  Expirationperiodvalue:any
  Expirationperiods:any
  constructor(private comppointsService: ComppointsService,
    private FileformatServiceService: FileformatServiceService,
    private router:Router) { }
  ngOnInit(): void {
    this.onFormSubmit()
    this.COMP_POINTS_LEVEL_PERIODS()
  }
  COMP_POINTS_LEVEL_PERIODS() {
    this.DYIDPLAYER = localStorage.getItem("DYIDPLAYERCOMPPOINTSLEVELPERIODS")
    this.DYIDPLAYERList = JSON.parse(this.DYIDPLAYER)
    console.log(this.DYIDPLAYERList)
  }
  onFormSubmit() {
    this.comppointlevel = false;
    this.loader = true;
    let body = {}
    this.comppointsService.compLevel(body).subscribe((data) => this.complevels(data))
  }
  complevels(data: any) {
    console.log(data)
    this.loader = false;
    this.comppointlevel = data.objectList
    console.log(this.comppointlevel)
    for (let i = 0; i < this.comppointlevel.length; i++) {
      if (this.comppointlevel[i].requirements) {
        if (this.comppointlevel[i].requirements.period) {
          for (let m = 0; m < this.DYIDPLAYERList.length; m++) {
            if (this.comppointlevel[i].requirements.period.lowLong == this.DYIDPLAYERList[m].guid.lowLong) {
              // console.log(this.DYIDPLAYERList[2].value);
              this.comppointlevel[i].requirements.period = this.DYIDPLAYERList[m].value;

            }
            if (this.comppointlevel[i].expirations.period.lowLong == this.DYIDPLAYERList[m].guid.lowLong) {
              this.comppointlevel[i].expirations.periodsNumber += " " + this.DYIDPLAYERList[m].value;
              console.log(this.comppointlevel[i])
            }
          }
        }
      }

      if (!this.comppointlevel[i].expirations) {
        Object.assign(this.comppointlevel[i], { expirations: { periodsNumber: '' } })
      }

      if (!this.comppointlevel[i].benefits) {
        Object.assign(this.comppointlevel[i], { benefits: { compPointsMultiplier: '' } })
      }
      if (!this.comppointlevel[i].requirements) {
        Object.assign(this.comppointlevel[i], { requirements: { compPoints: { value: '' } } })
      }

      // if (!this.comppointlevel[i].requirements.period) {
      //   Object.assign(this.comppointlevel[i], { requirements: { period: { hiLong: '',lowLong:'' } } })
      // }

      for (let m = 0; m < this.DYIDPLAYERList.length; m++) {
        // console.log(this.DYIDPLAYERList)
        // console.log (!this.comppointlevel[i].requirements.period)
        // console.log (this.DYIDPLAYERList[m].guid.lowLong)

        // if (this.comppointlevel[i].requirements.period.lowLong == this.DYIDPLAYERList[m].guid.lowLong){
        //   this.comppointlevel[i].requirements.period = this.DYIDPLAYERList[m].value;
        // }

        // console.log(this.comppointlevel[1].requirements.period);
        // console.log(this.comppointlevel[i])

      }
    }
  }


  navigatePlayersListComponent(list:any) {
    console.log("list    : --", list)

    const queryParams = {
      guid: list?.guid,
      value:list?.name
    };

   

    this.router.navigate(['/playerslist'] );
    localStorage.setItem("compointskey",JSON.stringify(queryParams))
  
  }



  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, "PlayerLevelExcelSheet.xlsx");

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PlayerLevel")
  }
  GetManageLevel(data:any,index:any){
    console.log(data)
    let body = {}
    this.comppointsService.listCompPointsLevels(body).subscribe((data:any) =>this.CompLevelres(data,index))
   
  }
  CompLevelres(data:any,index:any){
    console.log(data)
    this.ComppointsLevelres = data.objectList
    this.CompLevelpopup = true

    this.leveldecription( this.ComppointsLevelres[index],index)
  }
  closepopup(){
    this.CompLevelpopup = false
  }
  leveldecription(data:any,index:any){
    console.log(data)
    console.log(index)
    console.log(this.ComppointsLevelres)
    this.indexvalue = index
    if(this.backgroundcolor_id){
      console.log("final",this.backgroundcolor_id)
      document.getElementById(this.backgroundcolor_id)?.classList.remove('tr_color12')
    }
    let selectitem = document.getElementById(data.name)
    selectitem?.classList.add("tr_color12")
    this.backgroundcolor_id = data.name
    console.log(this.DYIDPLAYERList)   
    if(data.default){
      this.Comppointleveldefault = true
    }else{
      this.Comppointleveldefault = false
      this.DYIDPLAYERList.forEach((period:any) => {
        if(period?.guid.lowLong == data?.requirements?.period.lowLong){
          this.selectobtainedreq = period.value
        }
        if(period?.guid.lowLong == data?.expirations?.period.lowLong){
          this.Expirationperiods = period.value
        }
      })
      this.Compointvalue = data?.requirements?.compPoints?.value
      this.levelname = data?.name
      this.multipleperiodvalue = data?.benefits?.compPointsMultiplier
      this.Expirationperiodvalue = data?.expirations?.periodsNumber

      console.log("selectobtainedreq",this.selectobtainedreq)
      console.log("Compointvalue",this.Compointvalue)
    }

  }
  Obtainperiod(event:any){
    console.log(this.DYIDPLAYERList)
    console.log(event.target.value)
    this.selectobtainedreq = event.target.value
    this.DYIDPLAYERList.forEach((period:any) => {
      if(period.value == this.selectobtainedreq){
        console.log(this.ComppointsLevelres[this.indexvalue]) 
        if(this.ComppointsLevelres[this.indexvalue]?.requirements?.period){
          this.ComppointsLevelres[this.indexvalue].requirements.period=  period?.guid
        }
      }
    })
    console.log(this.ComppointsLevelres[this.indexvalue]) 
  }
  compointvalueinput(event:any){
    console.log(event.target.value)
    if( this.ComppointsLevelres[this.indexvalue]?.requirements?.compPoints?.value){
      this.ComppointsLevelres[this.indexvalue].requirements.compPoints.value = event.target.value
    }
  }
  levelchangevalue(event:any){
   console.log(event.target.value)
   if( this.ComppointsLevelres[this.indexvalue]?.name){
    this.ComppointsLevelres[this.indexvalue].name = event.target.value
  } 
  }
  multiplevalue(event:any){
    console.log(event.target.value)
    if(this.ComppointsLevelres[this.indexvalue].benefits.compPointsMultiplier){

      this.ComppointsLevelres[this.indexvalue].benefits.compPointsMultiplier = event.target.value
    }
  }
  expirationvalue(event:any){
    console.log(event.target.value)
    if(this.ComppointsLevelres[this.indexvalue].expirations?.periodsNumber){

      this.ComppointsLevelres[this.indexvalue].expirations.periodsNumber = event.target.value
    }

  }
expirationdropdown(event:any){
  console.log(event.target.value)
  this.Expirationperiods = event.target.value
  this.DYIDPLAYERList.forEach((period:any) => {
    if(period.value == this.Expirationperiods){
      console.log(this.ComppointsLevelres[this.indexvalue]) 
      if(this.ComppointsLevelres[this.indexvalue]?.expirations?.period){
        this.ComppointsLevelres[this.indexvalue].expirations.period=  period?.guid
      }
    }
  })
}
submit(){
  console.log(this.ComppointsLevelres)
  let body ={
    // levels:{
      compPointsLevels:[ 
        ...this.ComppointsLevelres
      ]
    // }
    
  }
  console.log(body)
  this.comppointsService.updateCompPointLevel(body).subscribe((data:any)=>{console.log(data)})
}
}
