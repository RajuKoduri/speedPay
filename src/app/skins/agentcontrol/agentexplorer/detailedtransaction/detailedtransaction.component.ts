
import { unary } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { AgentControlService } from 'src/app/source/AgentControl.service';

@Component({
  selector: 'app-detailedtransaction',
  templateUrl: './detailedtransaction.component.html',
  styleUrls: ['./detailedtransaction.component.css']
})
export class DetailedtransactionComponent implements OnInit {
  walletFormatsList: any;
  TransactionHistoryFilter: any;
  TransactionHistoryType: any;
  walletlists: any = [];
  HistoryType: any = []
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;

  all = "All";
  counter: number = 0;
  dropdownSettings = {}
  faceParametersdropdown = {};

  filterForm: FormGroup;
  Agentguid: any;
  selectedCurrency: any
  timePicker: any;
  FillterMenu: boolean = false;
  startDate: any;
  endDate: any;
  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false
  DetailedtranstionData: any;
  resultcount: boolean = true;
  rowsOnthePage: any;
  ResultCount: any;
  loader: boolean = false;

  operationPopup: boolean = false;
  allOperations: boolean = true;
  systemNameCheckbox: any[] = []
  isParentOpen: any[] = [];
  transactionTypeCheckbox: any[] = [];
  keysCheckedList: any[] = []
  isSubParentOpen: any[][] = []
  selectedOperationsGuids: any = [];
  SelectedOperationsNames: any = [];
  location: any;
  playerExplorer: boolean = false;
  AgentExplorer: boolean = false;
  PlayerguidList: any;
  checkboxStates: { [key: string]: boolean } = {};
  groupDisplayNames: { [key: string]: string } = {
    nonGameGroups: "Non-Game Groups",
    gameGroups: "Game Groups"
  };
  constructor(private agentControlService: AgentControlService,private DateTimePipe:DateTimePipe) {
    this.filterForm = new FormGroup({

      StartDate: new FormControl(),
      EndDate: new FormControl(),
      Currency: new FormControl(),
      cashAmountlow: new FormControl(),
      cashAmounthigh: new FormControl(),
      wallets: new FormControl(),
      operationTypes: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      enddate: new FormControl(),


    })


  }
  ngOnInit(): void {
    this.walletFormats()
    this.Agentguids()
    this.playerExplorerCheck();
    this.oparationTyps()

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
  }

  playerExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/DetailTransaction") {
      this.playerExplorer = true;
      this.PlayerGuid();
    } else if (this.location == "/Agentexplorer/DetailTransaction") {
      this.playerExplorer = false;
      this.AgentExplorer = true;
      this.Agentguids();
    } else {
      this.AgentExplorer = false;
      this.playerExplorer = false;
    }
    console.log(this.playerExplorer, this.AgentExplorer);
  }

  Agentguids() {
    const Agentguid = sessionStorage.getItem('Agentguid');
    if (Agentguid) {
      this.Agentguid = JSON.parse(Agentguid)
    }

  }
  PlayerGuid() {
    let Playerguid = sessionStorage.getItem("Playerguid");
    if (Playerguid) {
      this.PlayerguidList = JSON.parse(Playerguid)
    }
    console.log(this.PlayerguidList)
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  updateValue() {
    this.timePicker = document.getElementById("taskTime")

    // timePicker.addEventListener('input' (e) => {
    //   taskTime.blur();
    // });
    // timePicker.type = 'text';
    // timePicker.type = 'time';
  }
  walletFormats() {
    const walletTypes = localStorage.getItem("walletTypes")
    if (walletTypes) {
      this.walletFormatsList = JSON.parse(walletTypes)
      for (let i = 0; i < this.walletFormatsList.length; i++) {
        if (this.walletFormatsList[i].clubGameWallet == true && this.walletFormatsList[i].description != 'Play Money') {
          this.walletlists.push(this.walletFormatsList[i])
        }
      }
      console.log(this.walletlists)

      this.selectedCurrency = this.walletlists.map((walletList: any) => {
        return { description: walletList.description, guid: walletList.guid }
      })
      console.log(this.selectedCurrency)
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'guid',
        textField: 'description',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false,
      };

    }



  }
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  oparationTyps() {
    let TransactionHistory: any
    if (this.playerExplorer) {
      TransactionHistory = localStorage.getItem('playerTransactionHistoryFilter')
    } else {
      TransactionHistory = localStorage.getItem('agentTransactionHistoryFilter')
    }
    if (TransactionHistory) {
      this.TransactionHistoryFilter = JSON.parse(TransactionHistory)
    }
    let TransactionHistoryType = localStorage.getItem('TransactionHistoryType')
    if (TransactionHistoryType) {
      this.TransactionHistoryType = JSON.parse(TransactionHistoryType)
    }
    console.log(this.TransactionHistoryFilter)
    console.log(this.TransactionHistoryType)
    this.getObjectKeys(this.TransactionHistoryFilter).forEach(key => {

      this.TransactionHistoryFilter[key].map((group: any) => {
        group.operationTypes.transactionTypes = []

        group.operationTypes.idList.forEach((list: any, i: any) => {
          this.TransactionHistoryType.forEach((type: any) => {
            if (list.lowLong == type.guid.lowLong) {
              group.operationTypes.transactionTypes.push({ name: type.value, guid: type.guid })

            }
          })
        })
      })
    })
    console.log(this.TransactionHistoryFilter)


    this.initializeCheckboxes()
    this.isParentOpen = new Array(this.getObjectKeys.length).fill(false);
    const keys = this.getObjectKeys(this.TransactionHistoryFilter);
    keys.forEach((key, i) => {
      console.log(key)
      // let x:any = []
      this.TransactionHistoryFilter[key].forEach((name: any, j: any) => {
        console.log(name, j)
        // x.push(false)
        this.isSubParentOpen[i] = new Array(this.TransactionHistoryFilter[key].length).fill(false);
      })
      // this.isSubParentOpen.push(x)
    })
    console.log(this.isSubParentOpen)
  }

  initializeCheckboxes() {
    const keys = this.getObjectKeys(this.TransactionHistoryFilter);
    keys.forEach((key, i) => {
      this.keysCheckedList[i] = true;
      this.systemNameCheckbox[i] = [];
      this.transactionTypeCheckbox[i] = [];
      this.TransactionHistoryFilter[key].forEach((name: any, j: any) => {
        // this.isSubParentOpen[i][j] = new Array(name.length).fill(false);
        this.systemNameCheckbox[i][j] = true;
        this.transactionTypeCheckbox[i][j] = [];
        name.operationTypes.transactionTypes.forEach((opt: any, n: any) => {
          this.transactionTypeCheckbox[i][j][n] = true;
        });
      });
    });
    console.log(this.keysCheckedList);
    console.log(this.systemNameCheckbox);
    console.log(this.transactionTypeCheckbox);
    console.log(this.isSubParentOpen);
    this.updateSelectedOperations()
  }

  operationClosePopup() {
    this.operationPopup = !this.operationPopup;
  }

  clickOnAllOperationCheckbox() {
    const keys = this.getObjectKeys(this.TransactionHistoryFilter);
    keys.forEach((key, i) => {
      this.keysCheckedList[i] = this.allOperations;;
      this.TransactionHistoryFilter[key].forEach((group: any, j: any) => {
        this.systemNameCheckbox[i][j] = this.allOperations;
        group.operationTypes.transactionTypes.forEach((list: any, n: any) => {
          this.transactionTypeCheckbox[i][j][n] = this.allOperations;;
        })
      })
    })
    this.updateSelectedOperations()
  }
  clickOnkeysCheckedListNamecheckbox(event: any, i: number) {
    const isChecked = event.target.checked;
    const keys = this.getObjectKeys(this.TransactionHistoryFilter);


    this.TransactionHistoryFilter[keys[i]].forEach((group: any, j: number) => {
      this.systemNameCheckbox[i][j] = isChecked;

      group.operationTypes.transactionTypes.forEach((list: any, n: number) => {
        this.transactionTypeCheckbox[i][j][n] = isChecked;
      });
    });
    this.updateAllOperationsCheckbox();
    console.log('Parent checkbox state changed:', this.systemNameCheckbox, this.transactionTypeCheckbox);
  }
  clickOnSystemNameCheckbox(event: any, i: number, j: number) {
    const isChecked = event.target.checked;
    this.systemNameCheckbox[i][j] = isChecked;

    this.TransactionHistoryFilter[this.getObjectKeys(this.TransactionHistoryFilter)[i]][j].operationTypes.transactionTypes.forEach((opt: any, n: number) => {
      this.transactionTypeCheckbox[i][j][n] = isChecked;
    });

    const allSecondLevelChecked = this.systemNameCheckbox[i].every((checked: any) => checked);
    this.keysCheckedList[i] = allSecondLevelChecked;

    this.updateAllOperationsCheckbox();

    console.log('Second-level checkbox clicked:', this.keysCheckedList, this.systemNameCheckbox, this.transactionTypeCheckbox);
  }
  clickOnTransactionTypeCheckbox(event: any, i: number, j: number, n: number) {
    const isChecked = event.target.checked;
    this.transactionTypeCheckbox[i][j][n] = isChecked;

    const allChecked = this.transactionTypeCheckbox[i][j].every((checked: any) => checked);
    this.systemNameCheckbox[i][j] = allChecked;

    const allSecondLevelChecked = this.systemNameCheckbox[i].every((checked: any) => checked);
    this.keysCheckedList[i] = allSecondLevelChecked;

    console.log('Checkbox states updated:', this.keysCheckedList, this.systemNameCheckbox, this.transactionTypeCheckbox);
    this.updateAllOperationsCheckbox();
  }

  updateAllOperationsCheckbox() {
    console.log(this.keysCheckedList)
    const allChecked = this.keysCheckedList.every((checked) => checked);
    this.allOperations = allChecked;
    console.log(allChecked)

    console.log('All Operations checkbox updated:', this.allOperations);
    this.updateSelectedOperations()
  }

  toggleParent(index: number) {
    console.log(this.isParentOpen, index);
    this.isParentOpen[index] = !this.isParentOpen[index];
  }

  toggleSubParent(parentIndex: number, subParentIndex: number) {
    // toggleSubParent(parentIndex: number) {
    this.isSubParentOpen[parentIndex][subParentIndex] = !this.isSubParentOpen[parentIndex][subParentIndex];
  }
  private updateSelectedOperations(): void {
    this.selectedOperationsGuids = [];
    let selectedTransactionTypes: string[] = [];

    const keys = this.getObjectKeys(this.TransactionHistoryFilter);

    keys.forEach((key: string, i: number) => {
      const group = this.TransactionHistoryFilter[key];

      group.forEach((operationGroup: any, j: number) => {
        operationGroup.operationTypes.idList.forEach((idList: any, n: number) => {
          if (this.transactionTypeCheckbox[i][j][n]) {
            this.selectedOperationsGuids.push(idList);
          }
        })
        operationGroup.operationTypes.transactionTypes.forEach((transactionType: any, n: number) => {
          if (this.transactionTypeCheckbox[i][j][n]) {
            selectedTransactionTypes.push(transactionType.name);
          }
        });
      });
    });

    this.SelectedOperationsNames = [];
    const allSecondLevelChecked = this.systemNameCheckbox.every((arr: boolean[]) => arr.every((bool: boolean) => bool));

    if (allSecondLevelChecked) {
      this.SelectedOperationsNames = "[ALL]";
    } else {
      this.SelectedOperationsNames = `[${selectedTransactionTypes.join(", ")}]`;
    }

  }

  getDisplayName(key: string): string {
    return this.groupDisplayNames[key] || key; // Return mapped name or the key itself if not found
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
    return dirtyValues
  }
  onFormSubmit() {
    this.loader = true;
    this.DetailedtranstionData = false;
    let fillterbody = this.getDirtyValues(this.filterForm);
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);


    let walletGuids = this.selectedCurrency.map((wallet: any) => wallet.guid)

    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);

    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;

    fillterbody["date"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;
    // fillterbody["startDate"] = this.filterForm.value.StartDate != null ? { "end": this.filterForm.value.EndDate, "start": this.filterForm.value.StartDate } : undefined
    fillterbody["cashAmount"] = this.filterForm.value.cashAmountlow != null ? { "low": this.filterForm.value.cashAmountlow, "high": this.filterForm.value.cashAmounthigh } : undefined
    fillterbody["userIds"] = this.playerExplorer ? [this.PlayerguidList] : this.AgentExplorer ? [this.Agentguid] : undefined;
    fillterbody["wallets"] = walletGuids.length > 0 ? walletGuids : undefined;
    // fillterbody["operationTypes"] = this.filterForm.value.operationTypes != null ? [this.filterForm.value.operationTypes] : undefined;
    fillterbody["operationTypes"] = this.selectedOperationsGuids.length > 0 ? this.selectedOperationsGuids : undefined;

    console.log(fillterbody)

    this.agentControlService.DetailedTractionalhistory(fillterbody).subscribe((data: any) => { this.detailhistoryres(data) })
  }

  detailhistoryres(data: any) {
    console.log(data)
    this.loader = false;
    this.DetailedtranstionData = data.objectList;
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList?.length;

    console.log(this.DetailedtranstionData)
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }

  }
  getOperationType(guid: any) {
    const keys = this.getObjectKeys(this.TransactionHistoryFilter);
    let OperationType: any
    keys.forEach((key: string, i: number) => {
      const group = this.TransactionHistoryFilter[key];

      group.forEach((operationGroup: any, j: number) => {
        operationGroup.operationTypes.transactionTypes.map((transactionType: any, n: number) => {
          console.log(guid, transactionType.guid.lowLong)
          if (guid.lowLong == transactionType.guid.lowLong) {
            OperationType = transactionType.name
          }
        });
      });
    });
    return OperationType
  }


  changeDate(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
    return (c)
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

    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)

  }


  onChange(event: any) {
    console.log(event)
    console.log(event.target)
    console.log(event.target.option)
    console.log(event.target.__ngContext__.walletlists)
    console.log(event.target.__ngContext__.walletlists.guid)
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
}
