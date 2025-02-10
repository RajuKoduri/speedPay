import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToolsService } from 'src/app/source/Tools.service';
import { UtilityService } from 'src/app/source/utility.service';

@Component({
  selector: 'add-faq-category',
  templateUrl: './add-faq-category.component.html',
  styleUrls: ['./add-faq-category.component.css']
})
export class AddFAQCategoryComponent implements OnInit {
  @Output() notifyParent = new EventEmitter()
  @Input() editableData:any;
  FaqCategoryForm: FormGroup;
  TemplateCreationTypesList: any;
  getMailTemplatesByTypeData: any;
  filteredUserType: any;
  isMessageTemp:boolean = false;
  isMessageTemplate: boolean = false;

  constructor(private toolService: ToolsService, private utilityService: UtilityService) {
    this.FaqCategoryForm = new FormGroup({
      categoryAlias: new FormControl('', [Validators.required]),
      responsEMail: new FormControl('', [Validators.required]),
      emailTemplate: new FormControl(),
      categoryType: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.getMailTemplatesByType()
    this.usertype()
    this.editFAQ()
  }

  editFAQ(){
    let editableType = this.filteredUserType?.find((list:any)=>list.guid.lowLong == this.editableData.categoryType.lowLong)
    let editableTemplate = this.getMailTemplatesByTypeData?.find((list:any)=>list.guid.lowLong == this.editableData.emailTemplate.lowLong)
    console.log(editableTemplate)
    this.FaqCategoryForm.patchValue({
      categoryAlias:this.editableData.categoryAlias,
      responsEMail:this.editableData.responsEMail,
      categoryType:editableType.guid,
      emailTemplate:editableTemplate?.guid
    })
  }

  get f() {
    return this.FaqCategoryForm.controls
  }

  getMailTemplatesByType() {
    let TemplateCreationTypes = localStorage.getItem('TemplateCreationTypes')
    if (TemplateCreationTypes) {
      this.TemplateCreationTypesList = JSON.parse(TemplateCreationTypes)
    }

    let typeGuid = this.TemplateCreationTypesList.find((list: any) => list.value.startsWith('FAQ'))
    console.log(typeGuid)

    let body = {
      type: typeGuid.guid
    }

    this.toolService.getMailTemplatesByType(typeGuid.guid).subscribe((data: any) => {
      console.log(data)
      if(data.objectList.length == 0){
        this.isMessageTemp = true
        this.isMessageTemplate = false
      }else{
        this.isMessageTemp = false
        this.isMessageTemplate = true
        this.getMailTemplatesByTypeData = data.objectList
      }

      this.FaqCategoryForm.patchValue({
        emailTemplate: this.getMailTemplatesByTypeData[0]?.guid
      })
    })
  }

  usertype() {
    let usertype = localStorage.getItem('usertype')
    if (usertype) {
      let usertypeList = JSON.parse(usertype)

      this.filteredUserType = usertypeList.filter((list: any) => list.value == 'Affiliate' || list.value == 'Agent' || list.value == 'Player')
    }

    this.FaqCategoryForm.patchValue({
      categoryType: this.filteredUserType[0].guid
    })
  }

  closePopup() {
    this.notifyParent.emit()
  }

  closeErrPopup(){
    this.isMessageTemp = !this.isMessageTemp
    this.closePopup()
  }

  onSubmit() {

    let {responsEMail,categoryAlias,emailTemplate,categoryType} = this.FaqCategoryForm.value
    console.log(this.FaqCategoryForm.value)

    let body:any = {
        objState:0,
        responsEMail,categoryAlias,emailTemplate,categoryType
    }
    if(this.editableData){
      body['guid'] = this.editableData.guid
    }

    if (this.FaqCategoryForm.valid) {
      this.utilityService.setCategory(body).subscribe((data: any) => {
        console.log(data)
        if(data.changedObjectList){
          this.closePopup()
        }
      })
    }
  }

}
