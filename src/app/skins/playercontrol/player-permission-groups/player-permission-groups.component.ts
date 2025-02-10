import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import * as XLSX from 'xlsx';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { NewPlayerPremissionsGroupComponent } from '../../admin-control/new-player-premissions-group/new-player-premissions-group.component';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-permission-groups',
  templateUrl: './player-permission-groups.component.html',
  styleUrls: ['./player-permission-groups.component.css']
})
export class PlayerPermissionGroupsComponent implements OnInit {
  @ViewChild(NewPlayerPremissionsGroupComponent) NewPlayerPremissionsGroupComponent: NewPlayerPremissionsGroupComponent | undefined;
  usertypeList: any;
  PlayerPermissionsData: any;
  playerPermissionStructureList: any;
  playerPermissionStructurePopup: boolean = false;
  PlayerPermissionsPopUpData: any;
  playerPermissionStructureListLevelName: any = [];
  LevelNames: any = [];
  PlayerPermissionDataChange: any
  popupArrow: boolean = false
  selectinmdex: any
  loader: boolean = false
  constructor(private DateTimePipe: DateTimePipe, private PlayerserviceService: PlayerServiceService,
    private AgentControlService: AgentControlService, private router: Router,
    private FileformatServiceService: FileformatServiceService) { }

  ngOnInit(): void {
    this.usertype();
    this.playerPermissionStructure();
    let filterbody = {
      "userType": this.usertypeList[0].guid
    }
    this.PlayerserviceService.listUserPermissionsGroup(filterbody).subscribe((res) => { this.PlayerPermissionsResData(res) })
  }


  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
    return (c)
  }
  PlayerPermissionsResData(data: any) {
    console.log(data);
    this.PlayerPermissionsData = data.objectList
  }
  usertype() {
    const usertype = localStorage.getItem('usertype')
    if (usertype) {
      this.usertypeList = JSON.parse(usertype)
    }
    console.log("usertypeList", this.usertypeList)
    console.log("usertypeList", this.usertypeList[0].guid)
  }
  playerPermissionStructure() {
    const playerPermissionStructure = localStorage.getItem("playerPermissionStructure");
    if (playerPermissionStructure) {
      this.playerPermissionStructureList = JSON.parse(playerPermissionStructure)
    }
    console.log("playerPermissionStructureList", this.playerPermissionStructureList)
    for (let i = 0; i < this.playerPermissionStructureList.children.length; i++) {
      // this.playerPermissionStructureListLevelName.push(this.playerPermissionStructureList[i]);
      console.log(this.playerPermissionStructureList.children[i]);
      for (let j = 0; j < this.playerPermissionStructureList.children[i].levels.length; j++) {
        console.log(this.playerPermissionStructureList.children[i].levels[j]);
        this.LevelNames.push(this.playerPermissionStructureList.children[i].levels[j])
      }
    }
    // console.log(this.playerPermissionStructureListLevelName)
  }
  // OnformSubmit() {
  //   let filterbody = {}
  //   this.PlayerserviceService.listUserPermissionsGroup(filterbody).subscribe((res => { console.log() }))
  // }

  permissionchange(i: any, data: any) {
    console.log(data);
    this.playerPermissionStructurePopup = true
    this.PlayerPermissionDataChange = JSON.parse(JSON.stringify(data)) 
    this.popupArrow = false
  }
  closepopup() {
    this.playerPermissionStructurePopup = false
    this.PlayerPermissionDataChange = null
  }
  showmenu(list: any, i: any) {
    this.selectinmdex = i;
    this.popupArrow = !this.popupArrow
  }

  navigatePlayersListComponent(list: any) {
    console.log("list    : --", list)

    const queryParams = {
      guid: list?.guid,
      value: list?.name
    };
    this.router.navigate(['/playerslist']);
    localStorage.setItem("permissionGropKey", JSON.stringify(queryParams.value));
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
    XLSX.writeFile(wb, "Playerpermissiongroups.xlsx");

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "Playerpermissiongroups")
  }

  makedefault(list: any) {
    console.log(list)
    this.popupArrow = false
    this.loader = true
    this.AgentControlService.makeDefaultUserPermissionsGroup(list.guid).subscribe((res) => this.makeadafaultres(res))
  }
  makeadafaultres(res: any) {
    if (res.changedObjectList) {
      this.loader = false
      window.location.reload()
    }
  }
  deleteset(list: any) {
    console.log(list)
    this.popupArrow = false
    this.AgentControlService.deleteUserPermissionsGroup(list.guid).subscribe((res) => this.permissiondelete(res))
  }
  permissiondelete(res: any) {
    console.log(res)
    if (res.changedObjectList) {
      window.location.reload()
    }
  }
}
