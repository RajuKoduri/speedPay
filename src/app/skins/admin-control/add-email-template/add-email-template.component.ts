import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToolsService } from 'src/app/source/Tools.service';

@Component({
  selector: 'add-email-template',
  templateUrl: './add-email-template.component.html',
  styleUrls: ['./add-email-template.component.css']
})
export class AddEmailTemplateComponent implements OnInit {
@Output() notifyParent = new EventEmitter()
@Input() isEditTemplate:any
@Input() selectedListForEdit:any

  LanguagesList: any;
  activeBtnInd:number = 0;
  MailTemplateTextList:any = []
  name:string = "New template";
  selectedType:any
  TemplateCreationTypesList: any;
  isValid: boolean = false;
  getMailTemplatesData: any;
  getMailTemplateParametersData: any;
  getMailTemplateTextData: any;
  constructor(private toolServive:ToolsService) {
    
   }

  ngOnInit(): void {
    this.Languages()
    this.TemplateCreationTypes()
    console.log(this.isEditTemplate)
    console.log(this.selectedListForEdit)
    this.isEditTemplate ? this.onEditTemplate() : ''
  }

  closepopup(){
    this.notifyParent.emit()
  }

  TemplateCreationTypes(){
    let TemplateCreationTypes = localStorage.getItem("TemplateCreationTypes")
    if(TemplateCreationTypes){
      this.TemplateCreationTypesList = JSON.parse(TemplateCreationTypes)
    }
    console.log(this.TemplateCreationTypesList)
    this.selectedType = this.TemplateCreationTypesList[0].guid
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
    console.log('languageList',this.LanguagesList)

    this.LanguagesList.forEach((list:any,i:number)=>{
      this.MailTemplateTextList.push({
        "toName" : '',
        "fromName" : '',
        "fromEmail":'',
        "subject":'',
        "text":'',
        "objState":0,
        "language":list.guid
      })
    })

    console.log(this.MailTemplateTextList)

  }
  selectedLanguage(guid:any, i:number){
    this.activeBtnInd = i 
  }

  errorPopup(){
    this.isValid = !this.isValid
  }

  onSubmit(){
    let body={
      'objState':0,
      'creatable':true,
      'name':this.name,
      'nameChangeable':false,
      'texts':this.MailTemplateTextList,
      'type':this.selectedType
    }
    console.log(body)

    let isValid = this.MailTemplateTextList.every((list:any)=> list.fromEmail && list.text)
    if(isValid){
      this.toolServive.setMailTemplate(body).subscribe((data:any)=>{
        console.log(data)
        if(data.changedObjectList){
          this.closepopup()
        }
      })
    }else{
      this.isValid =true
    }
  }

  onEditTemplate(){
    this.getMailTemplates(this.selectedListForEdit.emailTemplate)
    this.getMailTemplateParameters(this.selectedListForEdit.emailTemplate)
    this.getMailTemplateText(this.selectedListForEdit.emailTemplate)
  }

  getMailTemplates(tempID:any){
    let body = {
        templates:[tempID]
    }
    this.toolServive.getMailTemplates(body).subscribe((res:any)=>{
      console.log(res)
      this.getMailTemplatesData = res.objectList
      this.name = this.getMailTemplatesData[0].name

      let type = this.TemplateCreationTypesList.find((list:any)=>list.guid.lowLong == this.getMailTemplatesData[0].type.lowLong)
      this.selectedType = type.guid
    })
  }

  getMailTemplateParameters(tempID:any){
    let body = {
      templateId:tempID
    }
    this.toolServive.getMailTemplateParameters(tempID).subscribe((res:any)=>{
      console.log(res)
      this.getMailTemplateParametersData = res.objectList
    })
  }

  getMailTemplateText(tempID:any){
    let body = {
      templates:[tempID]
    }

    this.toolServive.getMailTemplateText(body).subscribe((res:any)=>{
      console.log(res)
      this.getMailTemplateTextData = res.objectList
      this.getMailTemplateTextData = this.getMailTemplateTextData.sort((a:any, b:any)=>{
        if(a.language.lowLong > b.language.lowLong){
          return 1
        }else if(a.language.lowLong < b.language.lowLong){
          return -1
        }
        return 0 
      })
      this.MailTemplateTextList = this.getMailTemplateTextData
    })
  }

}
