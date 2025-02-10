import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/source/Tools.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as XLSX from 'xlsx';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, } from '@angular/forms';
@Component({
  selector: 'app-sng-monitoring',
  templateUrl: './sng-monitoring.component.html',
  styleUrls: ['./sng-monitoring.component.css']
})
export class SngMonitoringComponent implements OnInit {
  sngData: any;
  loader: boolean = false;
  filterForm: FormGroup;

  ResultCount: any;
  rowsOnthePage: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  FirstrecordFillter: any = 0;

  constructor(private ToolsService: ToolsService, private FileformatServiceService: FileformatServiceService) {

    this.filterForm = new FormGroup({
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    });
  }

  ngOnInit(): void {
    this.onFormSubmit()
  }
  onFormSubmit() {

    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    this.sngData = false;
    this.loader = true;
    let body = {
      firstRecord: this.filterForm.value.firstRecord - 1,
      maxCountRecord: this.filterForm.value.maxCountRecord

    }
    this.ToolsService.getPokerScoutStatistics(body).subscribe((data) => this.sngMonitoringData(data))
  }
  sngMonitoringData(data: any) {
    this.loader = false
    console.log(data)
    this.sngData = data.Lobby.Tournaments.SitAndGo.Tournament
    console.log(this.sngData);

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
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
    XLSX.writeFile(wb, "PlayerLevel.xlsx");

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PlayerLevel")
  }


  fastbackforward() {
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) +
          1 +
          parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({
        firstRecord: parseInt('1'),
      });
    this.PageCount =
      Math.floor(
        this.filterForm.value.firstRecord /
        parseInt(this.filterForm.value.maxCountRecord)
      ) + 1;

    this.onFormSubmit();

  }

  fastforward() {
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({ firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord), });
    } else
      this.filterForm.patchValue({
        firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });

    console.log(Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)));
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,)
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    if (this.PageCount > this.sngData.length) {
      this.pagecontrolbtn = true;
    }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onFormSubmit();

    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord
    );
    this.FirstrecordFillter =
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord;
    console.log(JSON.stringify(this.FirstrecordFillter).split('.')[0]);
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
    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter) + 1 + parseInt(this.filterForm.value.maxCountRecord)
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
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  prev() {
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
    this.PageCount = Math.floor(
      this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1;
    if (this.PageCount > this.sngData.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
  }
}
