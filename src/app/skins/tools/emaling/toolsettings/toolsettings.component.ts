import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ToolsService } from 'src/app/source/Tools.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
@Component({
  selector: 'app-toolsettings',
  templateUrl: './toolsettings.component.html',
  styleUrls: ['./toolsettings.component.css']
})
export class ToolsettingsComponent implements OnInit {
  loader: boolean = false;
  MailingSettings: any;
  SpinnwerT: boolean = false;
  EditSettingsPopup: boolean = false;

  constructor(private ToolsService: ToolsService,private FileformatServiceService: FileformatServiceService) { }

  ngOnInit(): void {
    this.onFormSubmit()
  }
  onFormSubmit() {
    this.loader = true;
    let body 
    this.ToolsService.getMailingSettings(body).subscribe((data) => {
      console.log(data);
      this.MailingSettings = data.objectList
    })
  }

  EditSettingsPopclose() {
    this.EditSettingsPopup = false;
  }

  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'messagetemplatesExcelSheet.xlsx';
    XLSX.writeFile(wb, 'SettingsExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "SettingsExcelSheet")
  }
}
