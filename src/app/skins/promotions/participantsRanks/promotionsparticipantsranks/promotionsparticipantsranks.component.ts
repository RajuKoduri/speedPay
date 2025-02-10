import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-promotionsparticipantsranks',
  templateUrl: './promotionsparticipantsranks.component.html',
  styleUrls: ['./promotionsparticipantsranks.component.css']
})
export class PromotionsparticipantsranksComponent implements OnInit {
  showPro:boolean = false;
  showBox:boolean = false;
  openPagen:boolean = false;
  openpageBox:boolean = false;
  FillterMenu: boolean = false;
  loader:boolean= false;

  filterForm: FormGroup

  constructor(private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      playerLogin : new FormControl(),
      LBPAmount : new FormControl(),
      firstRecord : new FormControl(),
      pageSize : new FormControl(),
    })
   }

  ngOnInit(): void {
  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  filterrank(){
    this.showPro= !this.showPro
    this.showBox= !this.showBox
  }
  rankPage(){
    this.openPagen = !this.openPagen
    this.openpageBox = !this.openpageBox
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
    XLSX.writeFile(wb, 'PokerGameSessionsExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element,"PokerGameSessionsExcelSheet")
  }

  onFormSubmit(){}
}
