
import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-onlineplayers',
  templateUrl: './onlineplayers.component.html',
  styleUrls: ['./onlineplayers.component.css']
})
export class OnlineplayersComponent implements OnInit {
  fileName = 'OnlinePlayerList.xlsx';
  onlinePlayerList: any;
  minuts: any = [];
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  faceParameterslist: any = [];
  playerStatusList: any = [];
  SessionType: any = [];
  walletlist: any = [];

  constructor(private PlayerserviceService: PlayerServiceService) {
    this.filterForm = new FormGroup({
      accountMask: new FormControl(),
      nickName: new FormControl(),
      shortid: new FormControl(),
      email: new FormControl(),
      fullName: new FormControl(),
      ipAddress: new FormControl(),
      networkNames: new FormControl(),
      statusesIdList: new FormControl(),
      SessionType: new FormControl(),
      wallet: new FormControl(),
      pokerGame: new FormControl(),
      casinoGame: new FormControl(),
      remoteGame: new FormControl(),
      tableName: new FormControl(),
      tournamentName: new FormControl(),
      permissionsGroup: new FormControl(),
    })
  }

  ngOnInit() {
    // let ws = sessionStorage.getItem('wsession')
    // this.PlayerserviceService.getPlayersOnlineForGames(ws).subscribe((res) => {
    //   this.onlinePlayerList = res.objectList;
    //   console.log( res.objectList)
    //   this.timeSend(res.objectList)
    // }
    // )
    this.faceParameters();
    this.palyerstatus();
    this.Sessiontype();
    this.walletlists();

  }

  faceParameters() {
    const faceParameterslist = localStorage.getItem('faceParameters')
    if (faceParameterslist) {
      this.faceParameterslist = JSON.parse(faceParameterslist)
    }
  }
  palyerstatus() {
    const playerstatus = localStorage.getItem('palyerstatus')
    if (playerstatus) {
      this.playerStatusList = JSON.parse(playerstatus)
    }
    console.log("playerStatusList", this.playerStatusList)
  }
  Sessiontype() {
    const SessionTypes = localStorage.getItem('SessionType')
    if (SessionTypes) {
      this.SessionType = JSON.parse(SessionTypes)
    }
    console.log("SessionType", this.SessionType)
  }
  walletlists() {
    const wallets = localStorage.getItem('walletlist');
    if (wallets) {
      this.walletlist = JSON.parse(wallets);
      // for (let i = 0; i < this.walletlist.length; i++) {
      //   this.walletlists.push(this.walletlist[i])
      // }
    }
    // console.log(this.walletlist)
    // console.log(this.walletlists.value)
  }

  timeSend(data: any) {

    for (let i = 0; i < data.length; i++) {
      let estdTime = data[i].estimatedTime;
      var minutes = Math.floor(estdTime / 60000);
      var seconds = ((estdTime % 60000) / 1000).toFixed(0);
      this.minuts.push(minutes + ":" + (Number(data[i]) < 10 ? '0' : '') + seconds);
    }
    console.log(this.minuts)
  }

  test(myDuration: any) {
    return (Math.floor(myDuration / (1000 * 60 * 60 * 24)) + ": " + Math.floor(myDuration / (1000 * 60 * 60)) + ":" + Math.floor(myDuration / (1000 * 60)) % 60 + ":" + Math.floor(myDuration / 1000) % 60);
  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            dirtyValues[key] = this.getDirtyValues(currentControl);
          else
            dirtyValues[key] = currentControl.value;
        }
      });

    return dirtyValues;
  }

  onFormSubmit() {
    console.log(this.filterForm.value);
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)
    fillterbody["firstRecord"] = 0
    fillterbody["maxCountRecord"] = 100

    this.PlayerserviceService.getPlayersOnlineForGames(fillterbody).subscribe((res) => { this.OnlinePlayersData(res) }
    )
  }

  OnlinePlayersData(res: any) {
    console.log(res)
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    // let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, this.fileName);

  }
}