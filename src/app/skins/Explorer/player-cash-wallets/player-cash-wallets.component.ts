import { Component, OnInit } from '@angular/core';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as XLSX from 'xlsx';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
@Component({
  selector: 'app-player-cash-wallets',
  templateUrl: './player-cash-wallets.component.html',
  styleUrls: ['./player-cash-wallets.component.css']
})
export class PlayerCashWalletsComponent implements OnInit {
  loader: boolean = false;
  CashWalletsList: any;
  ResultCount: any;
  resultcount: any;
  rowsOnthePage: any;

  constructor(private PlayerServiceService: PlayerServiceService, private FileformatServiceService: FileformatServiceService) { }

  ngOnInit(): void {
    this.getPlayerCashWallets()
  }
  getPlayerCashWallets() {
    let body = {

    }
    this.loader = true;
    this.PlayerServiceService.getPlayerCashWallets(body).subscribe((data) => {
      console.log(data);
      if (data.objectList) {
        this.CashWalletsList=data.objectList
        this.loader = false;
        this.ResultCount = data.resultCount
      }
    })
  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'CashWalletsListExeclSheet.xlsx';
    XLSX.writeFile(wb, 'CashWalletsListExeclSheet.xlsx');
  }


  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "CashWalletsListExeclSheet")
  }

}
