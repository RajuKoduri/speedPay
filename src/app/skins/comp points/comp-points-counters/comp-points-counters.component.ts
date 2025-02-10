import { Component, OnInit } from '@angular/core';
import { ComppointsService } from 'src/app/source/comppoints.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'comp-points-counters',
  templateUrl: './comp-points-counters.component.html',
  styleUrls: ['./comp-points-counters.component.css']
})
export class CompPointsCountersComponent implements OnInit {

  loader:boolean = false;

  constructor(private FileformatServiceService:FileformatServiceService, private comppointsService:ComppointsService) { }

  ngOnInit(): void {
    
  }

  onSubmit(){
    let body= {}
    this.comppointsService.getCompPointsCounters(body).subscribe((res)=>{
      console.log(res)
    })
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
    XLSX.writeFile(wb, 'LevelChangeHistoryExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "LevelChangeHistoryExcelSheet")

  }

}
