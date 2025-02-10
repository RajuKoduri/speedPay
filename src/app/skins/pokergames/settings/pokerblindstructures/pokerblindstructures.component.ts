import { Component, OnInit, ViewChild } from '@angular/core';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { CreatePokerBlindStructureComponent } from 'src/app/skins/admin-control/create-poker-blind-structure/create-poker-blind-structure.component';
import * as XLSX from 'xlsx';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
@Component({
  selector: 'app-pokerblindstructures',
  templateUrl: './pokerblindstructures.component.html',
  styleUrls: ['./pokerblindstructures.component.css']
})
export class PokerblindstructuresComponent implements OnInit {
  @ViewChild(CreatePokerBlindStructureComponent) CreatePokerBlindStructureComponent: CreatePokerBlindStructureComponent | undefined

  objList: any;
  activeInactive: any;
  sublistdata: any;
  playerdetailspopup: boolean = false;
  subdata: any;
  subdatalist: any = [];
  popupArrow: boolean = false;
  SeletedIconIndex: any;
  EditBlindData: any;
  EditBlindStructurepopup: boolean = false;

  constructor(private PokergamesService: PokergamesService, private FileformatServiceService: FileformatServiceService) { }

  ngOnInit(): void {
    this.getBlindStructure()
    this.onRequery()
  }
  getBlindStructure() {
    let body = {}
    this.PokergamesService.getBlindStructureList(body).subscribe(data => this.blindData(data))
  }
  onRequery() {
    let body = {}
    this.PokergamesService.getBlindStructureList(body).subscribe(data => this.blindData(data))
  }
  blindData(data: any) {
    // console.log(data)
    console.log(data.objectList)
    this.objList = data.objectList;
    for (let i = 0; i < this.objList.length; i++) {
      if (this.objList[i].editable) {
        this.activeInactive = "Editable"
      } else {
        this.activeInactive = "Used"

      }
      this.objList[i].activIN = this.activeInactive
      for (let j = 0; j < this.objList[i].levels.length; j++) {
        this.sublistdata = this.objList[i].levels[j];
        // console.log(this.su)
      }
    }

  }
  playerdetalispopup(data: any) {
    this.subdata = data
    console.log(this.subdata)
    for (let i = 0; i < this.subdata.length; i++) {
      this.subdata[i].sno = i;
      // this. subdatalist = this.subdata[i]  
    }
    this.playerdetailspopup = true;
  }
  playerdetalisclosepopup() {
    this.playerdetailspopup = false;
  }
  onClick(event: any) {
    // this.subdata = this.objList[event]
    this.playerdetailspopup = true;
    // console.log(this.subdata)

  }

  showmanu(index: number, id: any): void {
    this.popupArrow = !this.popupArrow;
    // this.CashoutApporvePopUp = true;
    this.SeletedIconIndex = index;
    console.log(index)
    console.log(id);
    this.EditBlindData = this.objList[index];
    console.log(this.EditBlindData)

  }
  EditBlindStructurepopupclose() {
    this.EditBlindStructurepopup = false;
  }
  editBlindMethod() {
    this.EditBlindStructurepopup = true;
    this.popupArrow = false;
  }
  EditBlindMethods(msg: any): void {
    if (this.CreatePokerBlindStructureComponent) {
      if (msg == 'Add New') {
        this.CreatePokerBlindStructureComponent.addItems()
      }
      if (msg == 'Copy') {
        this.CreatePokerBlindStructureComponent.BlindStructureList()
      }
      if (msg == 'Save') {
        this.CreatePokerBlindStructureComponent.onFormSubmit()
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
    XLSX.writeFile(wb, "PokerBlindStructures.xlsx");

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element,"PokerBlindStructures")
  }
}
