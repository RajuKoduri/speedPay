import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/source/utility.service';

@Component({
  selector: 'import-bots',
  templateUrl: './import-bots.component.html',
  styleUrls: ['./import-bots.component.css']
})
export class ImportBotsComponent implements OnInit {
@Output() notifyParent = new EventEmitter()
importBotsForm:FormGroup
  constructor(private utilityService:UtilityService) {
    this.importBotsForm = new FormGroup({})
   }

  ngOnInit(): void {
  }

  importBotsPopup(){
    this.notifyParent.emit()
  }

  onUploadCsv(){
    let body = {}
    this.utilityService.validateImportBotsFromCsv(body).subscribe((data:any)=>console.log(data))
  }

  onImport(){
    
  }

}
