import { Component, OnInit } from '@angular/core';
import { RemoteSystemsService } from 'src/app/source/RemoteSystems.service';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';

@Component({
  selector: 'app-remotesystems',
  templateUrl: './remotesystems.component.html',
  styleUrls: ['./remotesystems.component.css']
})
export class RemoteSystemComponent implements OnInit {
  remoteSystemDatas: any;
  DYIDINTEGRATIONTYPES: any
  currencyCode: any = []
  filterForm: FormGroup;
  WalletFormatsLists: any;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: number = 10;
  tablePrint: any;
  dataPrint: any;
  dataLoader: boolean = false;
  subRemote: any = [];
  remotepopup: boolean = false;
  PageCount: number = 1;
  pagecontrolbtn: boolean = false;
  FirstrecordFillter: any = 0;
  selectedcurrency: any = [];
  walletTypesList: any = [];
  currencyguid: any = [];
  CopyCurrencyGuid: any;
  dropdownSettingscurrency = {}
  DefaultCurrency: any;
  radioCheckbox: any = false;
  Spinner: any = false;
  // currencyCode: any;

  constructor(private remotesystemservice: RemoteSystemsService,
    private FileformatServiceService: FileformatServiceService) {


    this.filterForm = new FormGroup({
      // startdateFrom: new FormControl(),
      // startdateTo: new FormControl(),
      // wallet: new FormControl(),

      // startDate: new FormControl(),
      // endDate: new FormControl(),
      // startTime: new FormControl(),
      // endTime: new FormControl(),
      currency: new FormControl(),
      DefaultCurrency: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100)

    })
  }

  ngOnInit(): void {
    this.onRequery();
    this.WalletFormatsList();
    this.DYIDINTEGRATIONTYPE();
    this.walletTypes()

  }




  WalletFormatsList() {
    const WalletFormatsList = localStorage.getItem("walletFormats")
    if (WalletFormatsList)
      this.WalletFormatsLists = JSON.parse(WalletFormatsList)
    console.log("WalletFormatsLists", this.WalletFormatsLists)
    let currencyCode = []
    for (let i = 0; i < this.WalletFormatsLists.length; i++) {
      // console.log(this.WalletFormatsLists[i])
      if (this.WalletFormatsLists[i].currencyCode) {
        console.log(this.WalletFormatsLists[i])
        this.currencyCode.push(this.WalletFormatsLists[i])
      }
    }
    console.log("currencyCode", this.currencyCode)
  }

  DYIDINTEGRATIONTYPE() {
    const DYIDINTEGRATIONTYPE = localStorage.getItem("DYIDINTEGRATIONTYPES")
    if (DYIDINTEGRATIONTYPE)
      this.DYIDINTEGRATIONTYPES = JSON.parse(DYIDINTEGRATIONTYPE)
    console.log("DYIDINTEGRATIONTYPES", this.DYIDINTEGRATIONTYPES)
  }
  walletTypes() {
    const walletTypesString: string | null = localStorage.getItem('walletTypes');
    if (walletTypesString !== null) {
      const walletTypes: any = JSON.parse(walletTypesString);
      console.log(walletTypes);
      let walletTypesList = []
      for (let i = 0; i < walletTypes.length; i++) {
        if (walletTypes[i].clubGameWallet == true && walletTypes[i].description != "Play Money") {
          walletTypesList.push(walletTypes[i])
          console.log("walletType", walletTypesList)
          this.walletTypesList = walletTypesList
        }
      }
      console.log("walletType", this.currencyCode)
      for (let j = 0; j < this.walletTypesList.length; j++) {
        for (let k = 0; k < this.currencyCode.length; k++) {
          if (this.walletTypesList[j].guid.lowLong == this.currencyCode[k].guid.lowLong && this.walletTypesList[j].guid.hiLong == this.currencyCode[k].guid.hiLong) {
            this.walletTypesList[j].currencyCode = this.currencyCode[j].currencyCode
          }
        }

      }
    }
    console.log("**", this.walletTypesList)
    this.currencyDropdown()
  }
  currencyDropdown() {
    for (let i = 0; i < this.walletTypesList.length; i++) {

      this.selectedcurrency[i] = {
        description: this.walletTypesList[i].description,
        guid: this.walletTypesList[i].guid
      }
    }
    console.log(this.selectedcurrency)

    this.selectedcurrency.forEach((item: { guid: any; }) => {
      this.currencyguid.push(item.guid);
    });

    console.log(this.selectedcurrency)
    console.log(this.currencyguid)
    this.CopyCurrencyGuid = this.currencyguid

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


  ignoreContext() {
    this.remoteSystemDatas = [];
    this.dataLoader = true;
  }

  fastbackforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({ firstRecord: parseInt('1'), });
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;

    this.onRequery();
    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord);
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
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1;
    this.pagecontrolbtn = false;
    if (this.PageCount > this.remoteSystemDatas.length) {
      this.pagecontrolbtn = false;
    }
    this.onRequery();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  next() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
        // console.log(typeof this.filterForm.value.firstRecord)
      });
    }

    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord),
      });
    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    console.log(this.filterForm.value.firstRecord);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    // if (this.FirstrecordFillter) {

    //   this.FirstrecordFillter++
    //   console.log(this.FirstrecordFillter)
    // }

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.onRequery();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  fastforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({ firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord), });
    } else
      this.filterForm.patchValue({
        firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });

    console.log(
      Math.floor(
        this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1
    );
    this.PageCount =
      Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    console.log(this.PageCount)
    console.log(this.remoteSystemDatas.length)
    this.pagecontrolbtn = true;
    if (this.PageCount > this.remoteSystemDatas.length) {
      this.pagecontrolbtn = true;
    }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onRequery();

    console.log(this.filterForm.value.firstRecord);
    console.log(
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord
    );
    this.FirstrecordFillter = this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord;
    console.log(JSON.stringify(this.FirstrecordFillter).split('.')[0]);
  }





  onRequery() {
    this.dataLoader = true;
    this.remoteSystemDatas = [];
    let body = {
    }
    this.remotesystemservice.getRemoteSystems(body).subscribe((res) => { this.RemoteSystemData(res) })
  }

  RemoteSystemData(res: any) {
    this.dataLoader = false;
    console.log(res)
    this.remoteSystemDatas = res.objectList;
    console.log(this.remoteSystemDatas)
    this.ResultCount = res.resultCount
    this.rowsOnthePage = res.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }

    // if(this.ResultCount  == this.rowsOnthePage){
    //   this.pagecontrolbtn = true
    // }else{
    //   this.pagecontrolbtn = false;
    // }
    console.log(res)
    if (res != null) {
      this.remoteSystemDatas = res.objectList
      console.log(this.remoteSystemDatas)
      for (let i = 0; i < this.remoteSystemDatas.length; i++) {
        for (let m = 0; m < this.DYIDINTEGRATIONTYPES.length; m++) {
          if (this.remoteSystemDatas[i].integrationType.lowLong == this.DYIDINTEGRATIONTYPES[m].guid.lowLong) {
            this.remoteSystemDatas[i].integrationTypeName = this.DYIDINTEGRATIONTYPES[m].stringID
          }
        }
        for (let k = 0; k < this.remoteSystemDatas[i].wallets.length; k++) {
          for (let m = 0; m < this.WalletFormatsLists.length; m++) {
            console.log("hello")
            if (this.remoteSystemDatas[i].wallets[k].lowLong == this.WalletFormatsLists[m].guid.lowLong) {
              console.log(this.WalletFormatsLists[m].currencyCode)
              if (!this.remoteSystemDatas[i].walletsName) {
                this.remoteSystemDatas[i].walletsName = [];
              }
              this.remoteSystemDatas[i].walletsName.push(this.WalletFormatsLists[m].currencyCode);
              break
            }
          }
        }
        // for(let i = 0; i<this.WalletFormatsLists.length; i++){
        //   if(this.remoteSystemDatas[i].currencyCode == "CHP"){

        //   }
        // }
      }
      console.log(this.remoteSystemDatas)
    }

  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'remotesystemsExcelSheet.xlsx';
    XLSX.writeFile(wb, 'remotesystemsExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "remotesystemsExcelSheet")
  }
  onPrint() {
    this.tablePrint = document.getElementById("tablerecords");
    this.dataPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    console.log(this.tablePrint);
    console.log(this.dataPrint);
    this.dataPrint.document.write(this.tablePrint.innerHTML);
    this.dataPrint.document.close();
    this.dataPrint.focus();
    this.dataPrint.print();
    this.dataPrint.close();
  }
  onClick(event: any) {
    console.log(event)
    this.subRemote = JSON.parse(JSON.stringify(this.remoteSystemDatas[event]))
    console.log(this.subRemote)
    console.log(this.selectedcurrency)
    // if (this.subRemote.webserviceUrl == undefined) {
    //   this.subRemote.webserviceUrl = ""
    // }
    this.remotepopup = true;
    this.radioCheckbox = this.subRemote.authenticateReturnsPlayersDefaultWallet;

    for (let i = 0; i < this.selectedcurrency.length; i++) {
      if (this.subRemote.defaultWallet.lowLong == this.selectedcurrency[i].guid.lowLong && this.subRemote.defaultWallet.hiLong == this.selectedcurrency[i].guid.hiLong) {
        this.DefaultCurrency = this.selectedcurrency[i].guid
      }
    }
    this.selectedcurrency = []
    for (let j = 0; j < this.subRemote.wallets.length; j++) {
      for (let i = 0; i < this.walletTypesList.length; i++) {
        if (this.walletTypesList[i]?.guid?.lowLong == this.subRemote.wallets[j]?.lowLong) {
          // alert(1)
          this.selectedcurrency[j] = {
            description: this.walletTypesList[i].description,
            guid: this.walletTypesList[i].guid
          }
          break
        }
      }
    }

  }
  openRemotePop() {
    this.remotepopup = true;
  }
  closePopup() {
    this.remotepopup = false;
  }

  onSelectedRadio() {
    console.log(this.radioCheckbox)
  }
  defaultChange() {
    console.log(this.DefaultCurrency)
  }
  EditRemoteSystems() {
    this.Spinner = true;
    console.log(this.subRemote)
    console.log(this.DefaultCurrency)
    let obj = {
      "authenticateReturnsPlayersDefaultWallet": this.radioCheckbox,
      "defaultWallet": this.DefaultCurrency,
      "guid": this.subRemote.guid,
      "integrationType": this.subRemote.integrationType,
      "login": this.subRemote.login,
      "loginPrefix": this.subRemote.loginPrefix,
      "name": this.subRemote.name,
      "objState": this.subRemote.objState,
      "password": this.subRemote.password,
      // "wallets": this.selectedcurrency,
      "wallets": this.currencyguid,
      "webserviceUrl": this.subRemote.webserviceUrl,
      "websiteUrl": this.subRemote.websiteUrl,
    }
    console.log(obj)
    this.remotesystemservice.setRemoteSystem(obj).subscribe(data => {
      console.log(data)
      if (data.changedObjectList) {
        this.remotepopup = false;
        this.onRequery();
        this.Spinner = false;
      }
    })
  }

  // ****************************currency Dropdown @starts *********************************************
  onItemSelectcurrency(data: any) {
    this.currencyguid = []
    console.log(this.selectedcurrency)
    console.log(this.DefaultCurrency)
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyguid.push(item.guid);
    });
    console.log(this.currencyguid)

    this.DefaultCurrency = this.selectedcurrency[0]?.guid

  }

  OnItemDeSelectcurrency(data: any) {

    this.currencyguid = []
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyguid.push(item.guid);
    });
    console.log(this.currencyguid)
    if (this.currencyguid === null || this.currencyguid.length === 0) {
      console.log("Empty");
      this.currencyguid = this.CopyCurrencyGuid
    }
    console.log(this.selectedcurrency)
    console.log(this.DefaultCurrency)
    this.DefaultCurrency = this.selectedcurrency[0]?.guid
    console.log(this.DefaultCurrency)
  }
  onSelectAllcurrency(data: any) {
    this.currencyguid = []
    data.forEach((item: { guid: any; }) => {
      this.currencyguid.push(item.guid);
    });
    console.log(this.currencyguid)
    console.log(this.selectedcurrency)
  }
  onDeSelectAllcurrency(data: any) {
    this.currencyguid = []
    this.currencyguid = this.CopyCurrencyGuid
    // data.forEach((item: { guid: any; }) => {
    //   this.playerstatusaaray.push(item.guid);
    // });
    console.log(this.currencyguid)
    console.log(this.selectedcurrency)
    console.log(this.DefaultCurrency)
  }
}