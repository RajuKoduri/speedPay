import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, toDoc, toHTML, Toolbar } from 'ngx-editor';
import { ToolsService } from 'src/app/source/Tools.service';

@Component({
  selector: 'add-news-record',
  templateUrl: './add-news-record.component.html',
  styleUrls: ['./add-news-record.component.css']
})
export class AddNewsRecordComponent implements OnInit {
  @Output() notifyParent = new EventEmitter()
  @Input() editableData:any;
  addNewsRecordForm: FormGroup
  usertypeList: any;
  faceParametersList: any;
  submitted: boolean = false;
  LanguagesList: any;
  selectedFaces: any;
  facesDropdownSettings: any = {}

  selectedNewsParam: any;
  selectedNewsParam2: any;
  newsParametersList: any;

  EditorMessage: any = [];
  editor: Editor;
  isHtmlView: boolean = false;

  EditorMessage2: any = [];
  editor2: Editor;
  isHtmlView2: boolean = false;
  activeLangIndex: number = 0;
  facesName: any = [];


  constructor(public toolsService: ToolsService) {

    this.editor = new Editor();
    this.editor2 = new Editor();

    this.addNewsRecordForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl(),
      faces: new FormControl(),
      announceDate: new FormControl(new Date().toISOString().slice(0, 19)),
      hotPeriodMinutes: new FormControl(0),
      archiveAfterHotPeriod: new FormControl(false),
    })
  }

  ngOnInit(): void {
    this.Languages()
    this.NewsType()
    this.faceParameters()
    this.newsParameters()
    console.log(new Date().toISOString().slice(0, 19))
    this.editableData&&this.onEditNews()
  }

  onEditNews(){
    console.log("editableData", this.editableData)

    let editableType = this.usertypeList.find((list:any) => list.guid.lowLong == this.editableData[0].type.lowLong)
    console.log(editableType)
    // this.selectedFaces = this.faceParametersList.map((list:any)=> this.editableData[0].faces.find((data:any)=>list.name == data))
    this.selectedFaces = this.editableData[0].faces

    this.EditorMessage = this.editableData[0].texts

    this.addNewsRecordForm.patchValue({
      name:this.editableData[0].name,
      hotPeriodMinutes:this.editableData[0].hotPeriodMinutes,
      archiveAfterHotPeriod:this.editableData[0].archiveAfterHotPeriod,
      announceDate:this.editableData[0].announceDate.slice(0,19),
      type:editableType.guid,
    })
  }

  get f() {
    return this.addNewsRecordForm.controls;
  }

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    // ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    // [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    // ['text_color', 'background_color'],
    // ['align_left', 'align_center', 'align_right', 'align_justify'],

  ];

  toggleEditorMode(mode: 'html' | 'simple'): void {
    this.EditorMessage[this.activeLangIndex].mode = mode;
    if (mode === 'html') {
      this.isHtmlView = true;
      if (typeof this.EditorMessage[this.activeLangIndex].shortText !== 'string') {
        this.EditorMessage[this.activeLangIndex].shortText = toHTML(this.EditorMessage[this.activeLangIndex].shortText);
      }
    } else {
      this.isHtmlView = false;
      if (typeof this.EditorMessage[this.activeLangIndex].shortText === 'string') {
        this.EditorMessage[this.activeLangIndex].shortText = toDoc(this.EditorMessage[this.activeLangIndex].shortText);
      }
    }
    console.log(this.EditorMessage);
  }

  // toggleEditorMode(mode: 'html' | 'simple'): void {
  //   this.EditorMessage[this.activeLangIndex].mode = mode
  //   if (this.EditorMessage[this.activeLangIndex].mode === 'html') {

  //     this.isHtmlView = true;
  //     this.EditorMessage[this.activeLangIndex].shortText = toHTML(this.EditorMessage[this.activeLangIndex].shortText);
  //     console.log(this.EditorMessage)
  //   } else {
  //     this.isHtmlView = false;
  //     this.EditorMessage[this.activeLangIndex].shortText = toDoc(this.EditorMessage[this.activeLangIndex].shortText);
  //     console.log(this.EditorMessage)
  //   }
  // }

  // toggleEditorMode2(mode: 'html' | 'simple'): void {
  //   if (mode === 'html') {
  //     this.isHtmlView2 = true;
  //     this.EditorMessage[this.activeLangIndex].fullText = toHTML(this.EditorMessage[this.activeLangIndex].fullText);
  //     console.log(this.EditorMessage)
  //   } else {
  //     this.isHtmlView2 = false;
  //     this.EditorMessage[this.activeLangIndex].fullText = toDoc(this.EditorMessage[this.activeLangIndex].fullText);
  //     console.log(this.EditorMessage)
  //   }
  // }

  toggleEditorMode2(mode: 'html' | 'simple'): void {
    this.EditorMessage[this.activeLangIndex].mode = mode;
    if (mode === 'html') {
      this.isHtmlView2 = true;
      if (typeof this.EditorMessage[this.activeLangIndex].fullText !== 'string') {
        this.EditorMessage[this.activeLangIndex].fullText = toHTML(this.EditorMessage[this.activeLangIndex].fullText);
      }
    } else {
      this.isHtmlView2 = false;
      if (typeof this.EditorMessage[this.activeLangIndex].fullText === 'string') {
        this.EditorMessage[this.activeLangIndex].fullText = toDoc(this.EditorMessage[this.activeLangIndex].fullText);
      }
    }
    console.log(this.EditorMessage);
  }

  onLanguageSelect(guid: any, i: number) {
    console.log(i, guid)
    this.activeLangIndex = i
    console.log(this.EditorMessage)
    this.toggleEditorMode(this.EditorMessage[this.activeLangIndex].mode)
    this.toggleEditorMode2(this.EditorMessage[this.activeLangIndex].mode)

  }


  NewsType() {
    let NewsType = localStorage.getItem('NewsType')
    if (NewsType) {
      let usertypes = JSON.parse(NewsType)

      this.usertypeList = usertypes.filter((list: any) => list.value == 'Players' || list.value == 'Affiliates' || list.value == 'Agents')
      console.log("userList", this.usertypeList)

      this.addNewsRecordForm.patchValue({
        type: this.usertypeList[0].guid
      })
    }
  }

  faceParameters() {
    let faceParameters = localStorage.getItem('faceParameters')
    if (faceParameters) {
      this.faceParametersList = JSON.parse(faceParameters)
      console.log('face', this.faceParametersList)
    }

    this.selectedFaces = this.faceParametersList.map((list: any) => {
      this.facesName.push(list.name)
      return { name: list.name }
    })

    console.log(this.selectedFaces)

    this.facesDropdownSettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    }
  }

  Languages() {
    let Languages = localStorage.getItem('Languages')
    if (Languages) {
      this.LanguagesList = JSON.parse(Languages)
      this.LanguagesList.sort((a: any, b: any) => {
        if (a.guid.lowLong > b.guid.lowLong) {
          return 1
        } else if (a.guid.lowLong < b.guid.lowLong) {
          return -1
        }
        return 0
      })
    }

    this.LanguagesList.forEach((list: any) => {
      this.EditorMessage.push({
        shortText: undefined,
        fullText: undefined,
        mode: 'simple',
        language: list.guid
      })
    })
    console.log(this.EditorMessage)
    console.log(this.EditorMessage2)
  }

  newsParameters() {
    let newsParameters = localStorage.getItem('newsParameters')
    if (newsParameters) {
      this.newsParametersList = JSON.parse(newsParameters)
    }
    this.selectedNewsParam = this.newsParametersList[0].tag
    this.selectedNewsParam2 = this.newsParametersList[0].tag
  }

  onChangeNewsParams(param: any) {
    if (param === 'p1') {
      if (typeof this.EditorMessage[this.activeLangIndex].shortText !== 'string') {
        this.EditorMessage[this.activeLangIndex].shortText = toHTML(this.EditorMessage[this.activeLangIndex].shortText);
      }

      this.EditorMessage[this.activeLangIndex].shortText += this.selectedNewsParam;

    } else {
      if (typeof this.EditorMessage[this.activeLangIndex].fullText !== 'string') {
        this.EditorMessage[this.activeLangIndex].fullText = toHTML(this.EditorMessage[this.activeLangIndex].fullText);
      }

      this.EditorMessage[this.activeLangIndex].fullText += this.selectedNewsParam2;
    }
  }


  closePopup() {
    this.notifyParent.emit()
  }

  onSubmit() {

    this.submitted = true
    var date = new Date()
    console.log(date)
    console.log(this.addNewsRecordForm.value)
    let { announceDate, archiveAfterHotPeriod, faces, hotPeriodMinutes, name, type } = this.addNewsRecordForm.value;
    let selectedface = faces.map((list: any) => list.name ? list.name : list)
    console.log(faces,selectedface)
    console.log(this.EditorMessage)

    let changedMesg = this.EditorMessage.map((list: any) => {
      if (list.shortText?.content) {
        return { fullText: list.fullText?.content, language: list.language, shortText: list.shortText?.content }
      } else {
        let { mode, ...rest } = list
        return rest
      }
    })

    changedMesg.map((list: any) => {
      if (list.shortText != undefined) {
        if (typeof (list.shortText) !== 'string') {
          list.shortText = toHTML( {type: 'doc',
            content: list.shortText})
        }
        if (typeof (list.fullText) !== 'string') {
          list.fullText = toHTML({
            type: 'doc',
            content: list.fullText
          })
        }
      }
    })
    console.log(changedMesg)

    let body:any = {
      // newNews: {
      objState: 0,
      announceDate,
      archiveAfterHotPeriod,
      faces: selectedface,
      hotPeriodMinutes,
      name,
      type,
      texts: changedMesg,
      // }
    }
    console.log(body)

    if(this.editableData){
      body["guid"] = this.editableData[0].guid
    }

    if (this.addNewsRecordForm.valid) {
      this.toolsService.setNews(body).subscribe((res: any) => {
        console.log(res)
        if(res.changedObjectList){
          this.closePopup()
        }
      })
    }

  }

}
