import { Component, ElementRef, OnInit, Renderer2,OnDestroy } from '@angular/core';
import { ToolsService } from 'src/app/source/Tools.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as XLSX from 'xlsx'
import * as moment from 'moment';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';

@Component({
  selector: 'app-skins',
  templateUrl: './skins.component.html',
  styleUrls: ['./skins.component.css']
})
export class SkinsComponent implements OnInit,OnDestroy {
  FillterMenu: boolean = true;
  filterForm: FormGroup;
  TableSettingsForm: FormGroup;
  todaydate: any;
  startDate: any;
  endDate: any = Date;
  loader: boolean = false
  SkinsDataList: any;
  rowsOnthePage: any;
  faceParametersList: any;
  walletTypesList: any;
  walletlists: any = [];
  showDrop: any;

  SkinId: boolean=true;
  Playersnum: boolean=true;
  Result: boolean=true;
  Rake: boolean=true;
  TournamentFee: boolean=true;
  MarketingFee: boolean=true;
  CasinoResult: boolean=true;
  HorsesResult: boolean=true;
  startdatefil: any;
  Enddateeror:boolean = false
  steddate:boolean = false
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  FirstrecordFillter: any = 0;
  ResultCount:any
  timeerror: boolean =false;
  startTime:any= "00:00:00"
  endTime:any = "23:59:59"
  currencyarray:any = []
  selectedcurrency: any=[];
  currencystatus: any;
  dropdownSettingscurrency ={}
  selectedFillterGames: any;
  gamesTobeSelected: any;
  dropdownSettingsSkins:any= {}
  selectedFaceParameters:any = []

  constructor(private ToolsService: ToolsService, private http: HttpClient,private elementRef: ElementRef,private renderer: Renderer2,
    private GamesofpokerService:GamesofpokerService) {
    this.filterForm = new FormGroup({
      // StartDate: new FormControl(),
      // EndDate: new FormControl(),
      Skins: new FormControl(),
      wallet: new FormControl(),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
    
    this.TableSettingsForm = new FormGroup({
      Skin: new FormControl(true),
      Playersnum: new FormControl(true),
      Result: new FormControl(true),
      Rake: new FormControl(true),
      TournamentFee: new FormControl(true),
      MarketingFee: new FormControl(true),
      CasinoResult: new FormControl(true),
      HorsesResult: new FormControl(true),
   
    })
  }
  ngOnDestroy(): void {
    this.GamesofpokerService.clearData()
  }

  ngOnInit(): void {
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate()-7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;

    this.faceParameters();
    this.walletType();

    console.log(moment(this.startDate).format("YYYY-MM-DDT00:00:00"))

    console.log(moment(new Date()).format('YYYY-MM-DD') + 'T00.00.00')

    this.todaydate = moment(new Date()).format('YYYY-MM-DD');

  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  faceParameters() {
    const faceParameters = localStorage.getItem("faceParameters");
    if (faceParameters) {
      this.faceParametersList = JSON.parse(faceParameters)
    }
    this.selectedFaceParameters = this.faceParametersList.map((face:any)=>{
      return {name:face.name}
    })
    console.log(this.selectedFaceParameters)
    this.dropdownSettingsSkins = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    }
  }
  // walletTypes() {
  //   const walletTypes = localStorage.getItem('walletTypes');
  //   if (walletTypes) {
  //     this.walletTypesList = JSON.parse(walletTypes)
  //   }
  //   console.log(this.walletTypesList)

  //   for (let i = 0; i < this.walletTypesList.length; i++) {
  //     if (this.walletTypesList[i].clubGameWallet == true && this.walletTypesList[i].description !== "Play Money") {

  //       this.walletlists.push(this.walletTypesList[i])
  //     }
  //   }
  //   console.log(this.walletlists)
  // }

  walletType() {
    this.currencyarray =[]
    
    this.walletlists= this.GamesofpokerService.walletTypes();
   console.log(this.walletlists)
    
    for (let i = 0; i < this.walletlists.length; i++) {
      this.selectedcurrency[i] = {
        description: this.walletlists[i].description,
        guid: this.walletlists[i].guid
      }
    }
    console.log(this.selectedcurrency)
    this.selectedcurrency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });

    this.currencystatus = this.walletlists;
    console.log(this.currencystatus);
    this.selectedcurrency = this.currencystatus;
    this.dropdownSettingscurrency = {
      singleSelection: false,
      idField: 'guid',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };
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
    const faceArray = this.selectedFaceParameters.map((face:any)=>{
      console.log(face)
      return face?.name
    })
    console.log(this.selectedFaceParameters)
    // this.FillterMenu = false;
    this.PageCount =Math.floor(this.filterForm.value.firstRecord /parseInt(this.filterForm.value.maxCountRecord)) + 1;
    this.loader = true;
    this.SkinsDataList = false;
    console.log(this.filterForm.value);
    console.log(moment(this.startDate).format("YYYY-MM-DDT00:00:00"));
     console.log(this.filterForm.value.startDate)
     console.log(this.filterForm.value.endDate)

    let fillterbody = this.getDirtyValues(this.filterForm)
    // fillterbody["startDate"] = moment(this.startdate).format("YYYY-MM-DDTHH:mm:ss")
    console.log(moment(this.startDate).format("YYYY-MM-DDTHH:mm:ss"))
    console.log(fillterbody);
    fillterbody["firstRecord"] = 0
    fillterbody["maxCountRecord"] = 100
    fillterbody["skin"] = faceArray
    // fillterbody["startDate"] = this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate +"T"+ this.filterForm.value.startTime , "end": this.filterForm.value.endDate + "T"+  this.filterForm.value.endTime } : undefined
    fillterbody["startDate"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
    (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;

    // fillterbody["startDate"] = this.filterForm.value.StartDate != null ? { "start": this.filterForm.value.StartDate + 'T00:00:00', "end": this.filterForm.value.EndDate + 'T00:00:00' } : undefined
    

    // fillterbody["skin"] = this.filterForm.value.Skins;
    // fillterbody["skin"] = 'all';
    // fillterbody["wallet"] = 'USD'
    // fillterbody["wallet"] = this.filterForm.value.wallet

    // this.ToolsService.skinReport(fillterbody).subscribe((data) => { this.SkinsResData(data) })
    // this.ToolsService.getSkinsDateAggr(fillterbody).subscribe((data) => { this.SkinsResData(data) })
    this.ToolsService.getSkinsMoneyReport(fillterbody).subscribe((data) => { 
      this.SkinsResData(data) },error=>{

      }
    )
  }


  SkinsResData(data: any) {
    console.log(data);
    this.loader = false;
    this.SkinsDataList = data.objectList;
    this.rowsOnthePage = data.objectList.length
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
    XLSX.writeFile(wb, 'SkinsDataExcelSheet.xlsx');

  }
  myFunction() {
    // (<HTMLInputElement>document.getElementById("myDropdown")).classList.toggle("show");
    this.showDrop = !this.showDrop
    console.log('ding')
  }
  // HideTHeads() {
  //   this.showDrop = !this.showDrop

  // }
  tableSettingSave(){
   console.log( this.TableSettingsForm.value)
   this.SkinId= this.TableSettingsForm.value.Skin
   this.Playersnum= this.TableSettingsForm.value.Playersnum
   this.Result= this.TableSettingsForm.value.Result
   this.Rake= this.TableSettingsForm.value.Rake
   this.TournamentFee= this.TableSettingsForm.value.TournamentFee
   this.MarketingFee= this.TableSettingsForm.value.MarketingFee
   this.CasinoResult= this.TableSettingsForm.value.CasinoResult
   this.HorsesResult= this.TableSettingsForm.value.HorsesResult
   this.showDrop = !this.showDrop
  }
 
  showDate(data:any) { 
    console.log(this.filterForm.value.endDate)
    if( this.filterForm.value.startDate > this.filterForm.value.endDate){
      
      this.steddate = true;
      } else {
        this.steddate = false;
      }
    
    if( this.filterForm.value.startDate == this.filterForm.value.endDate){
        if(this.filterForm.value.startTime > this.filterForm.value.endTime){
          this.timeerror = true;
        }else{
          this.timeerror = false;
        }
        }else{
          this.timeerror = false;
        }

    this.filterForm.valueChanges.subscribe(x => { 
      let yearsDiff = 0;
      var ToDate = new Date();
      var pastYear = ToDate.getFullYear() - yearsDiff;
      ToDate.setFullYear(pastYear);
      if (new Date(x.startDate).getTime() > ToDate.getTime() || new Date(x.startDate).getTime() > new Date(x.endDate).getTime() || new Date(x.endDate).getTime() > ToDate.getTime()){
       console.log("indirect")
        console.log(this.filterForm.value.endDate)
        this.steddate = true;
      } else {
        this.steddate = false;
      }
    }); 
  }
  timechange(data: any) {
    console.log(data.target.value)
    console.log(this.filterForm.value.startTime)
    console.log(this.filterForm.value.endTime)
    if( this.filterForm.value.startDate == this.filterForm.value.endDate){
      if(this.filterForm.value.startTime > this.filterForm.value.endTime){
        this.timeerror = true;
      }else{
        this.timeerror = false;
      }
      } 
   
  }

  fastforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) +
          1 +
          parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({
        firstRecord:
          Math.floor(
            this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)
          ) *
            this.filterForm.value.maxCountRecord +
          1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });

    console.log(
      Math.floor(
        this.filterForm.value.firstRecord /
          parseInt(this.filterForm.value.maxCountRecord)
      ) + 1
    );
    this.PageCount =
      Math.floor(
        this.filterForm.value.firstRecord /
          parseInt(this.filterForm.value.maxCountRecord)
      ) + 1;
      console.log(this.PageCount) 
      console.log(this.SkinsDataList.length) 
      this.pagecontrolbtn = true;
    if (this.PageCount > this.SkinsDataList.length) {
      this.pagecontrolbtn = true;
    }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onFormSubmit();

    console.log(this.filterForm.value.firstRecord);
    console.log(
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord
    );
    this.FirstrecordFillter =
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord;
    console.log(JSON.stringify(this.FirstrecordFillter).split('.')[0]);
  }

  next() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) +
          1 +
          parseInt(this.filterForm.value.maxCountRecord),
        // console.log(typeof this.filterForm.value.firstRecord)
      });
    }
    
    else
      this.filterForm.patchValue({
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) +
          parseInt(this.filterForm.value.maxCountRecord),
      });
    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    console.log(this.filterForm.value.firstRecord);
    console.log(
      Math.floor(
        this.filterForm.value.firstRecord /
          parseInt(this.filterForm.value.maxCountRecord)
      ) + 1
    );
    this.PageCount =
      Math.floor(
        this.filterForm.value.firstRecord /
          parseInt(this.filterForm.value.maxCountRecord)
      ) + 1;
    // if (this.FirstrecordFillter) {

    //   this.FirstrecordFillter++
    //   console.log(this.FirstrecordFillter)
    // }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  fastbackforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) +
          1 +
          parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({
        firstRecord: parseInt('1'),
      });
    this.PageCount =
      Math.floor(
        this.filterForm.value.firstRecord /
          parseInt(this.filterForm.value.maxCountRecord)
      ) + 1;

    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord);
    console.log(
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord
    );
  }
  prev() {
    console.log('......Hhello......');
    if (
      this.filterForm.value.firstRecord - 1 ==
      parseInt(this.filterForm.value.maxCountRecord)
    )
      this.filterForm.patchValue({
        // firstRecord:parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)-1
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) -
          parseInt(this.filterForm.value.maxCountRecord),
      });
    else
      this.filterForm.patchValue({
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) -
          parseInt(this.filterForm.value.maxCountRecord),
      });
    console.log(this.filterForm.value.firstRecord);
    this.PageCount =
      Math.floor(
        this.filterForm.value.firstRecord /
          parseInt(this.filterForm.value.maxCountRecord)
      ) - 1;
      this.pagecontrolbtn = false;
    if (this.PageCount > this.SkinsDataList.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  exportCsv(): void {
    const element = this.elementRef.nativeElement.querySelector('#excel-table');
    const rows = element.querySelectorAll('tr');
    let csvContent = '';
  
    rows.forEach((row: any) => {
      const cols = row.querySelectorAll('td, th');
      cols.forEach((col: any, index: number) => {
        csvContent += col.textContent + (index < cols.length - 1 ? ',' : '\n');
      });
    });
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
  
    const link = this.renderer.createElement('a');
    this.renderer.setAttribute(link, 'href', url);
    this.renderer.setAttribute(link, 'download', 'LeaderBoardData.csv');
    this.renderer.appendChild(this.elementRef.nativeElement, link);
  
    link.click();
  
    this.renderer.removeChild(this.elementRef.nativeElement, link);
  }

  // *******************************************************************************************************
// onItemSelectpoker(data:any){
//   console.log(data)
// }
// OnItemDeSelectpoker(data:any){
//   console.log(data)
// }
// onSelectAllpoker(data:any){
//   console.log(data)
// }
// onDeSelectAllpoker(data:any){
//   console.log(data)
// }

onItemSelectcurrency(item: any) {
  const changeCurrencyResult = this.GamesofpokerService.onItemSelect(item);
  console.log(changeCurrencyResult)
  const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
  this.selectedFillterGames = selectedFillterGames;
  this.gamesTobeSelected = gamesTobeSelected
}

OnItemDeSelectcurrency(item: any) {
  const changeCurrencyResult = this.GamesofpokerService.OnItemDeSelect(item);
  const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
  this.selectedFillterGames = selectedFillterGames;
  this.gamesTobeSelected = gamesTobeSelected;

}
onSelectAllcurrency(items: any) {
  const changeCurrencyResult = this.GamesofpokerService.onSelectAll(items);
  const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
  this.selectedFillterGames = selectedFillterGames;
  this.gamesTobeSelected = gamesTobeSelected;
}
onDeSelectAllcurrency(items: any) {
  const changeCurrencyResult = this.GamesofpokerService.onDeSelectAll(items);
  const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
  this.selectedFillterGames = selectedFillterGames;
  this.gamesTobeSelected = gamesTobeSelected;
}






// onItemSelectCurrent(data:any){
//   this.currencyarray = []
//   this.filterForm.value.wallet.forEach((item: { guid: any; }) => {
//     this.currencyarray.push(item.guid);
//   });
//   console.log(this.currencyarray)
// }
// OnItemDeSelectCurrent(data:any){
//   this.currencyarray = []
//   this.filterForm.value.wallet.forEach((item: { guid: any; }) => {
//     this.currencyarray.push(item.guid);
//   });
//   console.log(this.currencyarray)
// }
// onSelectAllCurrent(data:any){
//   this.currencyarray = []
//   data.forEach((item: { guid: any; }) => {
//     this.currencyarray.push(item.guid);
//   });
//   console.log(this.currencyarray)
// }
// onDeSelectAllCurrent(data:any){
//   this.currencyarray = []
//   data.forEach((item: { guid: any; }) => {
//     this.currencyarray.push(item.guid);
//   });
//   console.log(this.currencyarray)
// }

// &&&&&&&&&&&&&&&&&&&&&&&&& Skins Dropdown start &&&&&&&&&&&&&&&&&&&&&&&&&

onItemSelectFaceParameters(event:any){
  console.log(this.selectedFaceParameters)
}

OnItemDeSelectFaceParameters(event:any){
  if(this.selectedFaceParameters.length == 0){
    this.selectedFaceParameters = this.faceParametersList.map((face:any)=>{
      return {name:face.name}
    })
  }
  console.log(this.selectedFaceParameters)

}

onSelectAllFaceParameters(event:any){
  this.selectedFaceParameters = event
  console.log(this.selectedFaceParameters)

}

onDeSelectAllFaceParameters(event:any){
  console.log(this.selectedFaceParameters)

}
// &&&&&&&&&&&&&&&&&&&&&&&&& Skins Dropdown end &&&&&&&&&&&&&&&&&&&&&&&&&

}
