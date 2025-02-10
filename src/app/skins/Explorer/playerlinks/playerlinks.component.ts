import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as moment from 'moment';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';

@Component({
  selector: 'playerlinks',
  templateUrl: './playerlinks.component.html',
  styleUrls: ['./playerlinks.component.css']
})
export class PlayerlinksComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  loader: boolean = false;
  walletTypelist: any = [];

  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false
  Playerlinkslist: any;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  playerStatusList: any;
  selectedItemsStatus: any = [];
  playerstatusaaray: any = [];
  dropdownSettingsstatus = {}
  copyStatusguids: any[] = [];
  PlayerguidList: any;
  SUSPLINKSList: any;
  balanceSum: any;
  bonusSum: any;
  PlayerlinkslistPopup: boolean = false;
  SuspiciousPlayer: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  walletFormatLists: any;
  walletSymbol: any;

  constructor(private FileformatServiceService: FileformatServiceService,
    private PlayerServiceService: PlayerServiceService, private DateTimePipe: DateTimePipe) {
    this.filterForm = new FormGroup({
      Currency: new FormControl(),
      LoginMask: new FormControl(),
      balancefrom: new FormControl(),
      balanceto: new FormControl(),
      bonusfrom: new FormControl(),
      bonusto: new FormControl(),
      Bonus: new FormControl(),
      Alias: new FormControl(),
      PlayerandPlayer: new FormControl(),
      Status: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
  }

  ngOnInit(): void {
    this.getDates()
    this.walletTypes()
    this.palyerstatus()
    this.Playerguid()
    this.SUSPLINKS()
  }
  getDates() {
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());

    let dateToday = moment(new Date(today)).format('YYYY-MM-DD');
    let dateEnd = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = dateToday;
    this.endDate = dateEnd;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  Playerguid() {
    let Playerguid = sessionStorage.getItem("Playerguid");
    if (Playerguid) {
      this.PlayerguidList = JSON.parse(Playerguid)
    }
    console.log(this.PlayerguidList)
  }

  walletFormats(){
    let walletFormats = localStorage.getItem("walletFormats")
    if(walletFormats){
      this.walletFormatLists = JSON.parse(walletFormats)
    }

    this.walletFormatLists.forEach((list:any)=>{
      this.Playerlinkslist.forEach((type:any)=>{
        if(list.guid.lowLong == type.balance.wallet.lowLong){
          if(list.symbol){
            this.walletSymbol = list.symbol
          }

        }
      })
    })
    console.log(this.walletSymbol)
  }

  walletTypes() {
    const walletTypes = localStorage.getItem('walletTypes');
    let walletlist: any;
    if (walletTypes) {
      walletlist = JSON.parse(walletTypes);
      console.log(walletlist);
    }
    for (let i = 0; i < walletlist.length; i++) {
      if (walletlist[i].clubGameWallet == true) {
        if (walletlist[i].description !== 'Play Money')
          this.walletTypelist.push(walletlist[i]);
      }
    }
    console.log('walletTypelist', this.walletTypelist); 
   
  }
  SUSPLINKS() {
    const SUSPLINKS = localStorage.getItem('SUSPLINKS');
    if (SUSPLINKS) {
      this.SUSPLINKSList = JSON.parse(SUSPLINKS);
    }
    console.log('SUSPLINKSList', this.SUSPLINKSList);
  }
  palyerstatus() {
    const playerstatus = localStorage.getItem('palyerstatus');
    if (playerstatus) {
      this.playerStatusList = JSON.parse(playerstatus);
    }
    console.log('playerStatusList', this.playerStatusList);


    for (let i = 0; i < this.playerStatusList.length; i++) {
      this.selectedItemsStatus[i] = {
        value: this.playerStatusList[i].value,
        guid: this.playerStatusList[i].guid
      }
    }
    console.log(this.selectedItemsStatus)
    this.selectedItemsStatus.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });
    this.copyStatusguids = [...this.playerstatusaaray]
    this.dropdownSettingsstatus = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
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
    this.loader = true;
    this.Playerlinkslist = false;

    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    // getPlayerAnalizer
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)
    fillterbody["firstRecord"] = Number(this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    fillterbody["players"] = [this.PlayerguidList];
    fillterbody["wallet"] = this.filterForm.value.Currency != null ? this.filterForm.value.Currency : undefined;
    fillterbody["accountMask"] = this.filterForm.value.LoginMask != null ? this.filterForm.value.LoginMask : undefined;
    fillterbody["alias"] = this.filterForm.value.Alias != null ? this.filterForm.value.Alias : undefined;

    // const { balancefrom, balanceto } = this.filterForm.value;
    // fillterbody["balance"] = balancefrom || balanceto ? { 
    //   ...(balancefrom && { low: balancefrom }), 
    //   ...(balanceto && { high: balanceto }) 
    // } : undefined;

    const { balancefrom, balanceto } = (this.filterForm.value);
    const balanceFrom = balancefrom ? parseFloat(balancefrom) : null;
    const balanceTo = balanceto ? parseFloat(balanceto) : null;
    fillterbody["balance"] = (balanceFrom && balanceTo) ? { "high": balanceTo, "low": balanceFrom } :
      (balanceFrom) ? { "low": (balanceFrom) } :
        (balanceTo) ? { "high": balanceTo } : undefined;

    const { bonusfrom, bonusto } = (this.filterForm.value);
    fillterbody["bonus"] = (bonusfrom && bonusto) ? { "high": Number(bonusto), "low": Number(bonusfrom) } :
      (bonusfrom) ? { "low": Number(bonusfrom) } :
        (bonusto) ? { "high": Number(bonusto) } : undefined;

    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["date"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;

    fillterbody["suspicionsId"] = this.filterForm.value.PlayerandPlayer != null ? this.filterForm.value.PlayerandPlayer : undefined;
    fillterbody["statuses"] = this.playerstatusaaray;


    this.PlayerServiceService.getPlayerAnalizer(fillterbody).subscribe((data) => {
      this.getPlayerLinksData(data);
    })
  }
  getPlayerLinksData(res: any) {
    this.loader = false;
    this.Playerlinkslist = res.objectList;
    console.log(res)
    this.walletFormats()
    this.rowsOnthePage = res.objectList.length;
    this.ResultCount = res.resultCount
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }

    const susplinkMap = new Map(
      this.SUSPLINKSList.map((item: any) => [`${item.guid.lowLong}-${item.guid.hiLong}`, item.value])
    );
    console.log(susplinkMap)

    for (let i = 0; i < this.Playerlinkslist.length; i++) {
      const playerSuspicions = this.Playerlinkslist[i].suspicionsId;
      for (let m = 0; m < playerSuspicions.length; m++) {
        const suspicion = playerSuspicions[m];
        console.log(suspicion)

        const key = `${suspicion.lowLong}-${suspicion.hiLong}`;
        const matchedValue = susplinkMap.get(key);
        console.log((key))
        console.log((matchedValue))
        console.log(susplinkMap.get(key))
        if (matchedValue !== undefined) {
          playerSuspicions[m] = matchedValue;
        }
      }
    }
    this.findSum(this.Playerlinkslist)

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
  }
  changeSelect(date: string): any {
    if (date != undefined) {
      let c = this.DateTimePipe.transforminingDispalyDate(date);
      return (c)

    }
  }
  findSum(data: any): any {
    // let balance = data.balance.value
    // this.balance = Math.round( data.reduce((a: any, b: { balance: any }) => a + b.balance.value, 0) );
    // console.log(this.balance);
    this.balanceSum = data.reduce((a: any, b: any) => a + Number(b.balance.value), 0);
    console.log(this.balanceSum);
    this.bonusSum = data.reduce((a: any, b: any) => a + Number(b.bonus.value), 0);
    console.log(this.bonusSum);
  }
  playerLinkRow(i: any) {
    this.SuspiciousPlayer = this.Playerlinkslist[i]
    this.PlayerlinkslistPopup = true;
  }
  closepopup() {
    this.PlayerlinkslistPopup = false;
  }
  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerServiceService.PlayerExplore(name, guid, List)
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
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'PlayerLinksExcelSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PlayerLinks")
  }


  fastbackforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({
        firstRecord: parseInt('1'),
      });
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;

    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord);
  }

  fastforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({
        firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
      });

    console.log(Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)));
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,)
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    if (this.PageCount > this.Playerlinkslist.length) {
      this.pagecontrolbtn = true;
    }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onFormSubmit();

    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord);

  }

  next() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord),
      });
    console.log(this.filterForm.value.firstRecord);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    // if (this.FirstrecordFillter) {

    //   this.FirstrecordFillter++
    //   console.log(this.FirstrecordFillter)
    // }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  prev() {
    console.log('......Hhello......');
    if (this.filterForm.value.firstRecord - 1 == parseInt(this.filterForm.value.maxCountRecord))
      this.filterForm.patchValue({
        // firstRecord:parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)-1
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord),
      });
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord),
      });
    console.log(this.filterForm.value.firstRecord);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1;
    if (this.PageCount > this.Playerlinkslist.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }


  // -----------------------------------StatusDropDown---------------------------------------------------------
  onItemSelect(data: any) {
    this.playerstatusaaray = []
    this.filterForm.value.Status.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray)
  }
  OnItemDeSelect(data: any) {
    this.playerstatusaaray = []
    this.filterForm.value.Status.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray)
    if (this.playerstatusaaray.length == 0) {
      this.playerstatusaaray = this.copyStatusguids
    }
  }
  onSelectAll(data: any) {
    this.playerstatusaaray = []
    data.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray)
  }
  onDeSelectAll(data: any) {
    this.playerstatusaaray = this.copyStatusguids;
    console.log(this.playerstatusaaray)
  }

  
}
