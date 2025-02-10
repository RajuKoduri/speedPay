import { Component, OnInit } from '@angular/core';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as XLSX from 'xlsx';
import { ToolsService } from 'src/app/source/Tools.service';

@Component({
  selector: 'app-activetasks',
  templateUrl: './activetasks.component.html',
  styleUrls: ['./activetasks.component.css']
})
export class ActivetasksComponent implements OnInit {
  loader:boolean = false

  constructor(private toolsService:ToolsService,private FileformatServiceService:FileformatServiceService) { }

  ngOnInit(): void {
    this.getActiveQueries()
  }

  getActiveQueries(){
    let body={};
    this.toolsService.getActiveQueries(body).subscribe((data)=>{
      console.log(data)
    })
  }

  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'messagetemplatesExcelSheet.xlsx';
    XLSX.writeFile(wb, 'messagetemplatesExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "messagetemplatesExcelSheet")
  }


}