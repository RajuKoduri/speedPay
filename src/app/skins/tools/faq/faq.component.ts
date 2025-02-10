import { Component, OnInit } from '@angular/core';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { ToolsService } from 'src/app/source/Tools.service';
import { UtilityService } from 'src/app/source/utility.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  usertypeList: any;
  Faqdata: any;
  TemplateTypesList: any;
  loader: boolean = false;
  TemplateCreationTypesList: any;
  mailTemplateByTypeList: any;
  SeletedIconIndex: any;
  popupArrow:boolean = false;
  isDelete: boolean = false;
  selectedDelGuid: any;
  rowsOnthePage: any;
  ResultCount:any
  isEdit:boolean= false;
  selectedListForEdit: any;
  isCategory: boolean = false;
  selectedCategoryData: any;

  constructor(private ToolsService: ToolsService, private FileformatServiceService: FileformatServiceService, private US:UtilityService) { }

  ngOnInit(): void {
    this.usertype();
    this.TemplateTypes();
    this.onRequery()
    }

  onRequery() {
    let fillterbody = {}
    this.ToolsService.getCategories(fillterbody).subscribe((res) => {
      console.log(res)
      this.Faqdata = res.objectList
      this.rowsOnthePage = res.objectList?.length;
      this.ResultCount = res.resultCount
    })
    this.getmailTemplatesByType()
  }

  getmailTemplatesByType(){
    let TemplateCreationTypes = localStorage.getItem('TemplateCreationTypes')
    if (TemplateCreationTypes) {
      this.TemplateCreationTypesList = JSON.parse(TemplateCreationTypes)
    }

    let typeGuid = this.TemplateCreationTypesList.find((list: any) => list.value.startsWith('FAQ'))
    console.log(typeGuid)

    let body = {
      type: typeGuid.guid
    }

    this.ToolsService.getMailTemplatesByType(body.type).subscribe((res:any)=>{
      console.log(res)
      this.mailTemplateByTypeList = res.objectList
    })
  }

  usertype() {
    const usertype = localStorage.getItem("usertype")
    if (usertype) {
      this.usertypeList = JSON.parse(usertype)
    }
    console.log("usertypeList", this.usertypeList)
  }

  TemplateTypes() {
    let TemplateTypes = localStorage.getItem('TemplateTypes')
    if (TemplateTypes) {
      this.TemplateTypesList = JSON.parse(TemplateTypes)
    }
    console.log("TemplateTypes", this.TemplateTypesList)
  }

  getCategotyType(userType: any) {
    let categoryValue = ''
    this.usertypeList.forEach((list: any) => {
      if (list.guid.lowLong == userType.lowLong) {
        categoryValue = list.value
      }
    })
    return categoryValue
  }

  getTemplateTypesValues(template: any) {
    return this.mailTemplateByTypeList?.map((list: any) => {
      if (list.guid.lowLong == template.lowLong) {
        return list.name
      }
    })
  }

  showmanu(index: any, guid: any) {
    console.log(index)
    console.log(guid)
    this.SeletedIconIndex = index;
    this.popupArrow = !this.popupArrow;

  }

  closePopup(){
    this.isDelete = !this.isDelete
    this.popupArrow = !this.popupArrow;
  }

  deleteCategory(guid:any){
    this.isDelete = true 
    this.selectedDelGuid = guid 
  }

  onConformationDel(){
    let body = {
      tGuid:this.selectedDelGuid
    }
     this.ToolsService.delCategory(body).subscribe((res:any)=>{
      console.log(res)
      if(res.changedObjectList){
        this.closePopup()
        this.popupArrow = false
        this.onRequery()
      }
     })
  }

  closeEditPopup(){
    this.isEdit = !this.isEdit
    this.popupArrow = false 
  }

  onEditTemplate(data:any){
    this.selectedListForEdit = data
    this.isEdit = !this.isEdit
    // this.getMailTemplates()
    // this.getMailTemplateParameters(data.emailTemplate)
    // this.getMailTemplateText(data.emailTemplate)
  }

  getMailTemplates(){
    let emailTemplateGuid = this.Faqdata.map((list:any)=>list.emailTemplate)
    console.log(emailTemplateGuid)
    let body = {
        templates:emailTemplateGuid
    }
    this.ToolsService.getMailTemplates(body).subscribe((res:any)=>{
      console.log(res)
    })
  }

  getMailTemplateParameters(tempID:any){
    let body = {
      templateId:tempID
    }
    this.ToolsService.getMailTemplateParameters(tempID).subscribe((res:any)=>{
      console.log(res)
    })
  }

  getMailTemplateText(tempID:any){
    let body = {
      templates:[tempID]
    }

    this.ToolsService.getMailTemplateText(body).subscribe((res:any)=>{
      console.log(res)
    })
  }

  openPopup(data:any){
    console.log(data)
    this.isCategory = true
    this.selectedCategoryData = data
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
