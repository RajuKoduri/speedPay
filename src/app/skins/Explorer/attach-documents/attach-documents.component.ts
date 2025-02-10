import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, ReplaySubject, } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
// import { MatDialog } from '@angular/material/dialog'; 

@Component({
  selector: 'attach-documents',
  templateUrl: './attach-documents.component.html',
  styleUrls: ['./attach-documents.component.css']

})
export class AttachDocumentsComponent implements OnInit {
  @Output() showHidePopup = new EventEmitter();
  @Input() userinfo: any;
  @Input() isVisible: boolean = false;
  @Input() showplayername: any

  base64Output: any | undefined;
  bitArrayOutput: any | undefined;
  fileName: any;
  imageSrc: string | undefined;
  imageUrl: SafeUrl | null = null;
  usertypelist: any = [];
  TYpe: any = [];
  description: any;
  // documentForm: FormGroup | undefined;
  loader: boolean = false
  documentForm: FormGroup;
  submitted = false;
  playerguid: any;
  AttachedDocumentsList: any;
  base64String = 'JVBERi0xLjQKJdPr6eEKMSAwI';
  imagePath: any;
  dialog: any;
  imageUrlSafe!: SafeResourceUrl;
  SeletedIconIndex: any;
  popupArrow: boolean = false;
  seletedDocument: any;
  conformationPopup: boolean = false;

  constructor(private sanitizer: DomSanitizer, private PlayerServiceService: PlayerServiceService, private formBuilder: FormBuilder) {
    this.documentForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      file: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    console.log(this.showplayername)
    console.log("isVisible", this.isVisible)
    console.log(this.userinfo)
    this.userTypes();
    this.Playerguid();
    // this.initForm(); 

  }
  Playerguid() {
    let Playerguid = sessionStorage.getItem('Playerguid')
    console.log(Playerguid)
    if (Playerguid) {
      this.playerguid = JSON.parse(Playerguid);
      console.log(this.playerguid)
    }
    if(!this.isVisible){

      this.onRequery();
    }

  }

  onFileSelected(event: any) {
    console.log(event)
    const file = event.target.files[0];
    const reader = new FileReader();
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
    }
    reader.onload = () => {
      console.log(reader.result);
      const base64String = reader.result as string;
      // this.base64Output = reader.result
      this.base64Output = base64String.split(',')[1];

    };
    console.log(file);
    reader.readAsDataURL(file);
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next;
    return result;
  }
  userTypes() {
    const usertype = localStorage.getItem('usertype')
    if (usertype) {
      this.usertypelist = JSON.parse(usertype);
      console.log(this.usertypelist)
      // for(let i = 0; this.usertypelist.length;i++){ 
      // }
    }
  }


  onsavefile() {
    // this.documentForm.value.description.trim()
    this.submitted = true;
    console.log(this.documentForm.get('description')?.value)
    if (this.documentForm.valid) {
      const description = this.documentForm.get('description')?.value;
      console.log(this.description)
      console.log(this.userinfo)
      const body = {
        // storedDocument: {
        objState: 0,
        fileContent: {
          objState: 0,
          content: this.base64Output
        },
        storedFile: {
          objState: 0,
          descr: this.description,
          fileName: this.fileName,
          user: {
            guid: this.userinfo.player.guid,
            objState: 0,
            type: this.usertypelist[0].guid,
          }
        }
        // }
      }

      this.PlayerServiceService.addstoredDoc(body).subscribe((data: any) => {
        console.log(data)
        if (data.changedObjectList) {
          this.closepopUP()
        }
      })

    } else {

    }

  }

  onRequery() {
    this.loader = true;
    this.AttachedDocumentsList = false;

    let body = {

      "userType": this.usertypelist[0].guid,
      "userIds": {
        "idList": [this.playerguid],
        "maxCountRecord": 0,
        "firstRecord": 0,
        // "queryId": "queryId_f16343afb63f"

      }
    }

    this.PlayerServiceService.listStoredFile(body).subscribe((data: any) => {
      console.log(data)
      this.loader = false;
      if (data) {
        this.AttachedDocumentsList = data.objectList
      }

    })
  }
  getStoredFileContent(guid: any, list: any) {
    // let body=this.ActionPlayerdata.player.guid
    console.log(guid)
    console.log(list)
    console.log((list.fileName.split("."))[1])
    let fieltype = list.fileName.split(".")[1]
    let fielName = list.fileName.split(".")[0]

    let body = guid;
    this.PlayerServiceService.getStoredFileContent(body).subscribe((data1: any) => {
      console.log(data1);
      this.base64String = data1.imageUrl;
      console.log(fieltype)
      if (fieltype == "pdf" || fieltype == "docx") {
        this.openpdf(this.base64String, fieltype, fielName)
      } else {
        this.openImg(this.base64String, fieltype, fielName)
      }
    })


  }

  openImg(base64Image: any, fieltype: any, fielName: any) {
    console.log('clicked');
    // Replace 'your_base64_data_here' with your actual Base64 image data.
    // const base64Image = 'your_base64_data_here';

    // Create a data URL with the Base64 image data.
    const daataURL = `data:image/${fieltype};base64,${base64Image}`;
    console.log(daataURL)

    let newTab: any
    newTab = window.open('', '_blank');
    // const newTab = window.open(null, null, 'width=1200,height=800');

    // newTab.addEventListener('load', function () {
    //   newTab.document.title = 'POKE';
    // });
    newTab.document.write(
      `<div style="height:100%; display: flex; justify-content: center;"><img  src="${daataURL}" />
      <a href="${daataURL}" download="image.png" 
            style="position: absolute; top: 10px; right: 10px; cursor: pointer;font:Inter;
                   background-color: #D6002A; color: white; padding: 8px 12px;
                   text-decoration: none; border-radius: 5px;">
           Download
         </a>
      </div>`
    );

    if (newTab) {
      // If the window was successfully opened, focus on it
      newTab.focus();
    } else {
      // If the window was blocked or not allowed, inform the user
      alert('Please allow popups for this site to open the image.');
    }
    setTimeout(function () {
      newTab.document.title = fielName;
    }, 100);
  }

  openpdf(param: any, fieltype: any, fielName: any) {
    let daataURL: any
    if (fieltype == "pdf") {
      daataURL = `data:application/${fieltype};base64,${param}`;
    } else {
      daataURL = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${param}`;
    }


    let newTab: any = window.open('', '_blank');
    // let  newTab:any = window.open(null, null, 'width=600,height=400');

    newTab.addEventListener('load', function () {
      newTab.document.title = 'POKE';
    });

    newTab.document.write(
      `<a href="${daataURL}" download="abc.pdf" 
      style="position: absolute; top: 1.2rem; right: 3.6rem; cursor: pointer;font:Inter;
             background-color: #D6002A; color: white; padding: 8px 12px;
             text-decoration: none; border-radius: 5px;">
     Download
   </a><div style="height:100%; display: flex; justify-content: center;"><iframe style="height:100%; width:100%;"  src="${daataURL}" /></div>`
    );



    setTimeout(function () {
      newTab.document.title = fielName;
    }, 100);
  }

  closepopUP() {
    console.log("-------------------------")
    this.showHidePopup.emit(false)
  }

  showmanu(i: any, playerId: any) {
    console.log(i)
    console.log(playerId)
    this.SeletedIconIndex = i
    this.popupArrow = !this.popupArrow
  }
  setPlayerActions(player: any, i: any) {
    console.log(player, i)
    this.seletedDocument = (JSON.parse(JSON.stringify(this.AttachedDocumentsList[i])))
    this.conformationPopup = true
    this.popupArrow = !this.popupArrow
  }
  deleteConfirm(type: any): void {
    if (type == 'yes') {
      let body = {
        storedFile: this.seletedDocument
      }
      console.log(body)
      this.PlayerServiceService.delStoredDocument(body).subscribe((data: any) => {
        console.log(data)
      })
    } else {
      this.conformationPopup = false
    }

  }
}




