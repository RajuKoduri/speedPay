import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class FileformatServiceService {

  constructor() { }

  downloadBase64Pdf(base64Data: string, filename: string) {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
  exportCsv(element:any,filename:any): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const csvData: string = XLSX.utils.sheet_to_csv(ws);
    let fileName = filename +'.csv';
  // Create a Blob and save it as a file
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

}
