import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ToolsService } from 'src/app/source/Tools.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';

@Component({
  selector: 'app-messagetemplates',
  templateUrl: './messagetemplates.component.html',
  styleUrls: ['./messagetemplates.component.css']
})
export class MessagetemplatesComponent implements OnInit {
  messageTemplates: any;
  loader: boolean = false;
  TemplateTypesList: any;
  filterForm: FormGroup;
  EditmessageTemplateForm: FormGroup;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;
  SeletedIconIndex: any;
  popupArrow: boolean = false;
  ActionTemplatedata: any;
  EditmessageTemplatesPopup: boolean = false;
  deletemessageTemplatesPopup: boolean = false;
  SpinnwerT: boolean = false;
  MailTemplateText: any = {};
  MailTemplateParameters: any;
  LanguagesList: any;
  submitted = false;
  seletedLanguage: any;
  MailTemplateTextList: any;
  activeButton: any = 0;
  isValid: boolean = false;
  constructor(private ToolsService: ToolsService,private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
    this.EditmessageTemplateForm = new FormGroup({
      // Login: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10),]),
      // Email: new FormControl('', [Validators.required,]),
      Email: new FormControl('',),
    })
  }

  ngOnInit(): void {
    this.onFormSubmit();
    this.TemplateTypes();
    this.Languages();
  }
  get f() {
    return this.EditmessageTemplateForm.controls;
  }

  TemplateTypes() {
    const TemplateTypes = localStorage.getItem('TemplateTypes');
    if (TemplateTypes) {
      this.TemplateTypesList = JSON.parse(TemplateTypes)
    }
    console.log(this.TemplateTypesList)
  }
  Languages() {
    const Languages = localStorage.getItem('Languages');
    if (Languages) {
      this.LanguagesList = JSON.parse(Languages)
      this.LanguagesList.sort((a:any,b:any)=>{
        if(a.guid.lowLong > b.guid.lowLong){
          return 1
        }else if(a.guid.lowLong < b.guid.lowLong){
          return -1
        }
        return 0
      })
    }
    console.log(this.LanguagesList)

  }
  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            dirtyValues[key] = this.getDirtyValues(currentControl);
          // else
          //     dirtyValues[key] = currentControl.value;
        }
      });

    return dirtyValues;
  }

  onFormSubmit() {
    this.loader = true;
    this.popupArrow = false;
    this.messageTemplates = false;


    let fillterbody = this.getDirtyValues(this.filterForm)
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1,
      fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord,
      fillterbody["templates"] = null,
      fillterbody["queryId"] = "",
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    this.ToolsService.getMailTemplates(fillterbody).subscribe((data) => {
      console.log(data)
      this.loader = false;
      this.messageTemplates = data.objectList;
      this.ResultCount = data.resultCount;
      this.rowsOnthePage = data.objectList.length;

      for (let i = 0; i < this.messageTemplates.length; i++) {
        for (let j = 0; j < this.TemplateTypesList.length; j++) {
          if (this.messageTemplates[i].type.lowLong == this.TemplateTypesList[j].guid.lowLong) {
            this.messageTemplates[i].typeName = this.TemplateTypesList[j].value
          }
        }
      }
      // if (this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
      if (this.ResultCount > (this.messageTemplates.length)) {
        this.pagecontrolbtn = false;
      } else {
        this.pagecontrolbtn = true;
      }
    })
  }
  showmanu(index: any, guid: any) {
    console.log(index)
    console.log(guid)
    this.SeletedIconIndex = index;
    this.popupArrow = !this.popupArrow;
    // this.CashoutApporvePopUp = true;

    this.ActionTemplatedata = this.messageTemplates[index];
    console.log(this.ActionTemplatedata)
  }
  setPlayerActions(Action: any, guid: any) {
    this.popupArrow = false
    console.log(guid)
    console.log(Action)
    console.log(this.MailTemplateText)
    if (Action == 'Edit') {
      this.getMailTemplateParameters(guid)
      this.getMailTemplateText(guid)
      this.EditmessageTemplatesPopup = true;
      this.seletedLanguage = this.LanguagesList[0].guid;
      console.log(this.seletedLanguage)

    }
    if (Action == 'Delete') {
      this.deletemessageTemplatesPopup = true
    }
  }
  getMailTemplateText(templates: any) {
    let body = {
      "firstRecord": 0,
      "maxCountRecord": 100,
      "templates": [templates]
    }
    this.ToolsService.getMailTemplateText(body).subscribe((data) => {
      console.log(data);
      if (data.objectList) {
        // this.MailTemplateText = data.objectList[0]
        this.MailTemplateTextList = data.objectList
        this.MailTemplateTextList.sort((a:any,b:any)=>{
          if(a.language.lowLong > b.language.lowLong){
            return 1
          }else if(a.language.lowLong < b.language.lowLong){
            return -1
          }
          return 0
        })
        this.LanguageSelect(this.seletedLanguage,this.activeButton)
      }
      console.log(this.MailTemplateText)
    })
  }
  getMailTemplateParameters(templateId: any) {
    // let body = {
    //   "templateId":templateId
    // }
    this.ToolsService.getMailTemplateParameters(templateId).subscribe((data) => {
      console.log(data)
      this.MailTemplateParameters = data.objectList
    })
  }
  LanguageSelect(guid: any, index:any) {
    // console.log(this.seletedLanguage)
    // console.log(guid)
    this.activeButton = index;
    console.log(this.activeButton)
    this.seletedLanguage = guid
    console.log(this.seletedLanguage)
    console.log(this.MailTemplateTextList)
    // for (let i = 0; i < this.MailTemplateTextList.length; i++) {
    //   if (this.seletedLanguage.lowLong == this.MailTemplateTextList[i].language.lowLong) {
    //     console.log(this.MailTemplateTextList[i])
    //     this.MailTemplateText = this.MailTemplateTextList[i]
    //     console.log(this.MailTemplateText)
    //   } else {
    //     this.MailTemplateText = {}
    //   }
    // }

    
    
  }
  setMailTemplate() {
    let isValid = this.MailTemplateTextList.every((list:any)=>list.fromEmail && list.text)
    if (isValid) {
      console.log("Valid CreateNewAgentForm")
      this.submitted = false;
      // this.SpinnwerT=true;
      let body = {
        "name": this.ActionTemplatedata.name,
        "type": this.ActionTemplatedata.type,
        "creatable": this.ActionTemplatedata.creatable,
        "nameChangeable": this.ActionTemplatedata.nameChangeable,
        "texts":this.MailTemplateTextList,
        "guid": this.ActionTemplatedata.guid,
        "objState": 0
      }
      console.log(body)
      
      this.ToolsService.setMailTemplate(body).subscribe((data) => {
        console.log(data)
        if (data.changedObjectList) {
          this.EditmessageTemplatesPopup = false
          this.SpinnwerT = false
        }
      })
    } else {
      console.log("InValid CreateNewAgentForm")
      this.submitted = true;
      this.isValid = true 
    }
  }
  delMailTemplates() {
    this.SpinnwerT = true;
    this.deletemessageTemplatesPopup = false;
    let body = {
      "objectList": [this.ActionTemplatedata.guid]
    }
    this.ToolsService.delMailTemplates(body).subscribe((data) => {
      console.log(data)
      if (data.changedObjectList) {
        this.SpinnwerT = false;
        this.onFormSubmit()
      }
    })
  }
  closepopup() {
    this.EditmessageTemplatesPopup = false
    this.MailTemplateText = ''
    this.ActionTemplatedata = ''
  }

  errorPopup(){
    this.isValid = !this.isValid
  }
  deleteMessageclosepopup() {
    this.deletemessageTemplatesPopup = false
  }
  fastbackforward() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt("1")
      })
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    if (this.PageCount > this.messageTemplates.length) {

      this.pagecontrolbtn = true
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)

  }

  fastforward() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1
      })

    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    console.log(this.ResultCount)
    console.log((this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    if (this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
      this.pagecontrolbtn = false;
    } else {
      this.pagecontrolbtn = true;
    }

    this.onFormSubmit()
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)
  }


  next() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord)
      })
    console.log(this.filterForm.value.firstRecord)
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    console.log(this.ResultCount)
    console.log(this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount))
    console.log(((this.filterForm.value.maxCountRecord) * this.PageCount))
    console.log((this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount)) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit()

  }

  prev() {
    console.log("......Hhello......")
    if ((this.filterForm.value.firstRecord - 1) == parseInt(this.filterForm.value.maxCountRecord))
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)
      })
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)
      })
    console.log(this.filterForm.value.firstRecord)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1)
    if (this.PageCount > this.messageTemplates.length) {
      this.pagecontrolbtn = false
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
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
