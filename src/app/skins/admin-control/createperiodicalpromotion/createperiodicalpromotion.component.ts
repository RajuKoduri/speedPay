import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, toDoc, toHTML, Toolbar } from 'ngx-editor';
import { UtilityService } from 'src/app/source/utility.service';

@Component({
  selector: 'app-createperiodicalpromotion',
  templateUrl: './createperiodicalpromotion.component.html',
  styleUrls: ['./createperiodicalpromotion.component.css']
})
export class CreateperiodicalpromotionComponent implements OnInit {
  @Output() notifyParent = new EventEmitter();
  createPeriodicalProForm:FormGroup;
  submitted:boolean = false;
  EditorMessage: any;
  isHtmlView: boolean = false;
  editor: Editor;
  LeaderBoardTypeList: any;
  LeaderBoardSettingPeriodList: any;
  TournamentGamesDropdownSettings:any = {};
  selectedTournamentGames:any;
  isEditPaytablePopup: boolean = false;
  
  constructor(private US:UtilityService) {
    this.editor = new Editor();
    this.createPeriodicalProForm = new FormGroup({
      name:new FormControl('',[Validators.required]),
      leaderboardType:new FormControl(),
      minReq:new FormControl('0.00'),
      activityPeriodFrom:new FormControl('00:00'),
      activityPeriodTo:new FormControl('23:59'),
      scheduleType:new FormControl(),
      startOnNextPeriod:new FormControl('currentDay'),
      tournamentGames:new FormControl(),
    })
   }

 
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    // ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    // ['text_color', 'background_color'],
    // ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  ngOnInit(): void {
    this.LeaderBoardType()
    this.LeaderBoardSettingPeriod()
    this.getLeaderboardPayoutTemplates()
  }

  getLeaderboardPayoutTemplates(){
    let body = {}
    this.US.getLeaderboardPayoutTemplates(body).subscribe((res:any)=>{
      console.log(res)
    })
  }

  get f(){
    return this.createPeriodicalProForm.controls;
  }

  toggleEditorMode(mode: 'html' | 'simple'): void {
   
    if (mode === 'html') {
      this.isHtmlView = true;
      if (typeof this.EditorMessage !== 'string') {
        this.EditorMessage = toHTML(this.EditorMessage);
      }
    } else {
      this.isHtmlView = false;
      if (typeof this.EditorMessage === 'string') {
        this.EditorMessage = toDoc(this.EditorMessage);
      }
    }
    console.log(this.EditorMessage);
  }

  closePopup(){
    this.notifyParent.emit()
  }

  LeaderBoardType(){
    let LeaderBoardType = localStorage.getItem("LeaderBoardType")
    if(LeaderBoardType){
      this.LeaderBoardTypeList = JSON.parse(LeaderBoardType)
    }
    console.log("LeaderBoardType",this.LeaderBoardTypeList)

    this.createPeriodicalProForm.patchValue({
      leaderboardType:this.LeaderBoardTypeList[0].guid
    })
  }

  LeaderBoardSettingPeriod(){
    let LeaderBoardSettingPeriod = localStorage.getItem('LeaderBoardSettingPeriod')
    if(LeaderBoardSettingPeriod){
      this.LeaderBoardSettingPeriodList = JSON.parse(LeaderBoardSettingPeriod)
    }
    console.log("LeaderBoardSettingPeriod",this.LeaderBoardSettingPeriodList)

    let scheduleTypeDaily = this.LeaderBoardSettingPeriodList.find((list:any) => list.value == "Daily")

    this.createPeriodicalProForm.patchValue({
      scheduleType:scheduleTypeDaily.value
    })
  }

  onScheduleChange(event:any){
    console.log(this.f["scheduleType"].value)
  }

  onSubmit(){

  } 


  // Edit paytable template..............>>>>>>>>>>>>>>>>

  editPaytableClose(){
    this.isEditPaytablePopup = !this.isEditPaytablePopup
  }

  onEditPaytableSubmit(){

  }

         

}
