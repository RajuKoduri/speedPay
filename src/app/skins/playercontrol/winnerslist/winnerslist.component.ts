import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
@Component({
  selector: 'app-winnerslist',
  templateUrl: './winnerslist.component.html',
  styleUrls: ['./winnerslist.component.css']
})
export class WinnerslistComponent implements OnInit {
  filterForm: FormGroup;
  FillterMenu: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;
  WinnersList: any;
  resultcount: boolean = true;
  loader: boolean = false
  endDate: any;
  startDate: any;
  todaydate: any;
  startTime: any = '00:00:00';
  endTime: any = '23:59:59';
  steddate: boolean = false;
  timeerror: boolean = false;
  walletTypesList: any = [];
  faceParametersList: any;
  selectedFaceParameters: any = []
  dropdownSettingsSkins: any = {}
  walletFormatList: any = []
  sumsArray: any[] = [];
  WinnersListDetails: any;
  WinnersListDetailsPopup: boolean = false;

  constructor(private PlayerserviceService: PlayerServiceService, private FileformatServiceService:FileformatServiceService) {
    this.Date();
    this.filterForm = new FormGroup({
      Currency: new FormControl(),
      Face: new FormControl(),
      Player: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),

      startDate: new FormControl(this.startDate),
      endDate: new FormControl(this.endDate),
      startTime: new FormControl(this.startTime),
      endTime: new FormControl(this.endTime),
    })
  }

  ngOnInit(): void {
    this.faceParameters();
    this.walletTypes();
    this.getwalletFormats();
    
  }
  Date() {
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());

    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
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
    this.selectedFaceParameters = this.faceParametersList.map((face: any) => {
      return { name: face.name }
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

  walletTypes() {
    const walletTypes = localStorage.getItem('walletTypes');
    if (walletTypes) {
      let walletlist = JSON.parse(walletTypes)
      for (let i = 0; i < walletlist.length; i++) {
        if (walletlist[i].clubGameWallet == true) {
          if (walletlist[i].description !== 'Play Money')
            this.walletTypesList.push(walletlist[i]);
        }
      }
      console.log('walletTypeslist', this.walletTypesList);

      this.filterForm.patchValue({
        Currency: this.walletTypesList[0]?.guid
      })
    }
  }

  getwalletFormats() {
    let walletFormats = localStorage.getItem('walletFormats');
    if (walletFormats) {
      this.walletFormatList = JSON.parse(walletFormats)
      console.log(this.walletFormatList)
    }
  }


  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls)
      .forEach(key => { let currentControl = form.controls[key];
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
    const faceArray = this.selectedFaceParameters.map((face: any) => {
      console.log(face)
      return face?.name
    })

    console.log(this.filterForm.value);
    this.WinnersList = false;
    this.FillterMenu = false;
    this.loader = true;
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)
    // fillterbody["firstRecord"] = 0
    fillterbody["networkNames"] = faceArray
    fillterbody["firstRecord"] = Number(this.filterForm.value.firstRecord - 1)
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    fillterbody["wallet"] = this.filterForm.value.Currency != null ? this.filterForm.value.Currency : undefined;
    fillterbody["playerLoginMask"] = this.filterForm.value.Player != null ? this.filterForm.value.Player : undefined;
    // fillterbody["networkNames"] = this.filterForm.value.Face != null ? this.filterForm.value.Face : undefined;
    fillterbody["reportPeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
      (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;

    this.PlayerserviceService.getWinnersStat(fillterbody).subscribe((res) => this.WinnersListResData(res))
  }
  WinnersListResData(data: any) {
    console.log(data)
    this.WinnersList = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.WinnersList != null) {
      this.loader = false;
    }

    for (let i = 0; i < this.WinnersList.length; i++) {
      for (let j = 0; j < this.walletFormatList.length; j++) {
        if (this.WinnersList[i]?.bets?.wallet?.lowLong == this.walletFormatList[j]?.guid?.lowLong) {
          if (this.walletFormatList[j].currencyCode) {
            if (this.walletFormatList[j].symbol) {
              this.WinnersList[i].symbol = this.walletFormatList[j].symbol
            }
          }
        }
      }
    }
    this.sumWalletValues()
  }

  sumWalletValues() {
    const sumsMap = new Map();
  
    this.WinnersList?.forEach((game:any) => {
      this.walletFormatList.forEach((format:any) => {
        if (game.bets?.wallet?.lowLong === format.guid.lowLong ) {
          const key = `${game.bets.wallet.hiLong}-${game.bets.wallet.lowLong}`;
          
          if (!sumsMap.has(key)) {
            sumsMap.set(key, {
              hiLong: game.bets.wallet.hiLong,
              lowLong: game.bets.wallet.lowLong,
              payoutSum: 0,
              betsum: 0,
              incomeSum: 0,
              // gainLossAmountSum: 0,
              // cumulativeJackpotSum: 0,
              symbol: format.symbol
            });
          }
          console.log(sumsMap)
          const sums = sumsMap.get(key);
          sums.payoutSum += Number(game.payouts.value);
          sums.betsum += Number(game.bets.value);
          sums.incomeSum += Number(game.incomeLoss.value);
          // sums.gainLossAmountSum += Number(game.gainLossAmount.value);
          // sums.cumulativeJackpotSum += Number(game.cumulativeJackpotSum.value);
        }
      });
    });
  
     this.sumsArray = Array.from(sumsMap.values());
    console.log(this.sumsArray);
    return this.sumsArray;
  }
  

  showDate(data: any) {
    console.log(this.filterForm.value.endDate)
    if (this.filterForm.value.startDate > this.filterForm.value.endDate) {

      this.steddate = true;
    } else {
      this.steddate = false;
    }

    if (this.filterForm.value.startDate == this.filterForm.value.endDate) {
      if (this.filterForm.value.startTime > this.filterForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    } else {
      this.timeerror = false;
    }

    this.filterForm.valueChanges.subscribe(x => {
      let yearsDiff = 0;
      var ToDate = new Date();
      var pastYear = ToDate.getFullYear() - yearsDiff;
      ToDate.setFullYear(pastYear);
      if (new Date(x.startDate).getTime() > ToDate.getTime() || new Date(x.startDate).getTime() > new Date(x.endDate).getTime() || new Date(x.endDate).getTime() > ToDate.getTime()) {
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
    if (this.filterForm.value.startDate == this.filterForm.value.endDate) {
      if (this.filterForm.value.startTime > this.filterForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    }

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
    XLSX.writeFile(wb, 'WinnerslistExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "SuspiciousPlyerlistExcelSheet")
  }


  closepopup() {
    this.WinnersListDetailsPopup = false
  }

  onClick(data:any){
    console.log(data)
    this.WinnersListDetails = this.WinnersList[data]
    console.log(this.WinnersListDetails)
    this.WinnersListDetailsPopup = true
  }

  
  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
  }

  // &&&&&&&&&&&&&&&&&&&&&&&&& Face Dropdown start &&&&&&&&&&&&&&&&&&&&&&&&&

  onItemSelectFaceParameters(event: any) {
    console.log(this.selectedFaceParameters)
  }

  OnItemDeSelectFaceParameters(event: any) {
    if (this.selectedFaceParameters.length == 0) {
      this.selectedFaceParameters = this.faceParametersList.map((face: any) => {
        return { name: face.name }
      })
    }
    console.log(this.selectedFaceParameters)

  }

  onSelectAllFaceParameters(event: any) {
    this.selectedFaceParameters = event
    console.log(this.selectedFaceParameters)

  }

  onDeSelectAllFaceParameters(event: any) {
    console.log(this.selectedFaceParameters)

  }
  // &&&&&&&&&&&&&&&&&&&&&&&&& Skins Dropdown end &&&&&&&&&&&&&&&&&&&&&&&&&

}
