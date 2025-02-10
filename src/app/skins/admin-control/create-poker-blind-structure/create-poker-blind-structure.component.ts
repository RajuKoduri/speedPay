import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PokergamesService } from 'src/app/source/pokergames.service';
@Component({
  selector: 'app-create-poker-blind-structure',
  templateUrl: './create-poker-blind-structure.component.html',
  styleUrls: ['./create-poker-blind-structure.component.css']
})
export class CreatePokerBlindStructureComponent implements OnInit, OnChanges {
  @Input() EditBlindData: any = null;
  BlindStructureform: FormGroup;
  BlindStructurePopup: boolean = false;
  BlindStructureResList: any;
  BlindLevelsList: any;
  show: boolean = false;
  ExistingBlindName: any;
  BlindAddLevelsList: any = [];
  CreateSuccessPop: boolean = false;
  ErrorPopup: boolean = false;
  CreateBlindRes: any;
  validationPopUp: boolean = false;
  validationText: string = "";
  stakesCondition: boolean = false;
  SuccessMsg: string = '';


  constructor(private PokergamesService: PokergamesService, private router: Router) {
    this.BlindStructureform = new FormGroup({
      BlindStructureName: new FormControl(),
      // ante: new FormControl(),
      // lowStake: new FormControl(),
      // highStake: new FormControl(),

    })
  }

  ngOnInit(): void {

  }
  BlindStructureList() {
    let body = {}
    this.PokergamesService.getBlindStructureList(body).subscribe((res) => {
      if (res) {
        this.BlindStructureResList = res.objectList;
        console.log(res.objectList[0].levels[0])
        this.ExistingBlindName = res.objectList[0].name
        console.log(this.BlindLevelsList)

        console.log(this.BlindStructureResList)
      }
    })
    this.BlindStructurePopup = true
  }

  BlindLevels(BlindName: any) {
    console.log(BlindName);
    // this.show = false;
    // console.log(index.target.name);
    for (let i = 0; i < this.BlindStructureResList.length; i++) {
      if (BlindName == this.BlindStructureResList[i].name) {
        this.BlindAddLevelsList = []
        console.log(this.BlindStructureResList[i])
        console.log(this.BlindStructureResList[i].levels)
        this.BlindLevelsList = this.BlindStructureResList[i].levels
        for (let level of this.BlindStructureResList[i].levels) {
          this.BlindAddLevelsList.push(level)
        }
        // this.BlindAddLevelsList.push(this.BlindStructureResList[i].levels)

        console.log("this.BlindLevelsList", this.BlindLevelsList)
      }

    }

  }
  BlindPopClose() {
    // this.show = true;
    this.BlindStructurePopup = false
    // this.BlindLevels(this.ExistingBlindName)
  }
  BlindStructureformExisting() {
    // this.show = true;
    this.BlindStructurePopup = false
    this.BlindLevels(this.ExistingBlindName)
  }


  // BlindAddLevelsList = [
  //   {
  //     // "ante": 0,
  //     // "lowStake": 0,
  //     // "highStake": 0
  //   },

  // ];

  addItem(index: any) {
    var currentElement = this.BlindAddLevelsList[index];
    this.BlindAddLevelsList.splice(index, 0, currentElement);


  }
  addItems() {
    this.BlindAddLevelsList.push({ ante: { value: 0 }, lowStake: { value: 0 }, highStake: { value: 0 }, tournamentChipsRatio: 0 });
    console.log('New row added successfully', 'New Row');
    console.log(this.BlindAddLevelsList);
    if (this.BlindAddLevelsList)
      // console.log(this.BlindAddLevelsList[0].lowStake.value >= this.BlindAddLevelsList[1].lowStake.value );
      for (let i = 0; i < this.BlindAddLevelsList.length; i++) {
        console.log(this.BlindAddLevelsList.length)
        // for (let j = 0; j < this.BlindAddLevelsList[i].lowStake.length; j++) {
        console.log(this.BlindAddLevelsList[i].lowStake)
        // console.log(this.BlindAddLevelsList[i].lowStake[j])
        // }
        // if (this.BlindAddLevelsList[i + 1].lowStake.value)
        //   console.log(this.BlindAddLevelsList[i].lowStake.value >= this.BlindAddLevelsList[i + 1].lowStake.value);

      }
    // const obj = {
    //   "ante": { value: 0 },
    //   "lowStake": { value: 0 },
    //   "highStake": { value: 0 },
    // }
    // console.log(this.BlindAddLevelsList.length)

    // this.BlindAddLevelsList.push(obj)
  }
  deleteRow(x: any) {
    // var delBtn = confirm(' Do you want to delete ?');
    // if (delBtn == true) {
    this.BlindAddLevelsList.splice(x, 1);
    // }
  }
  levelCompare(e: any) {
    console.log(e)
  }

  onFormSubmit() {
    let body: any;
    if (this.EditBlindData == null) {
      body = {
        "objState": 0,
        "editable": true,
        "name": this.BlindStructureform.value.BlindStructureName,
        "levels": this.BlindAddLevelsList
      }
    } else {
      body = {
        "objState": 0,
        "editable": true,
        "name": this.BlindStructureform.value.BlindStructureName,
        "levels": this.BlindAddLevelsList,
        "guid": this.EditBlindData.guid
      }
    }
    this.validationText = "";
    console.log(body)

    // this.BlindAddLevelsList.push(
    {
      // ante: { value: 0 },
      // lowStake: { value: 0 },
      // highStake: { value: 0 }, 
      // tournamentChipsRatio: 0 
    }
    // );

    this.BlindAddLevelsList.forEach((eachLevel: any, i: number) => {

      if (parseInt(this.BlindAddLevelsList[i].lowStake.value) > parseInt(this.BlindAddLevelsList[i].highStake.value)) {
        this.validationText += `Low Stake must be less than High stake in level ${i + 1} \n`;
        this.stakesCondition = true;
      }

      if (parseInt(eachLevel.lowStake.value) == 0 || parseInt(eachLevel.lowStake.value) == null) {
        this.validationText += `Low Stake can't be empty in level ${i + 1} \n`;
        this.stakesCondition = true;

      }

      if (parseInt(eachLevel.highStake.value) == 0 || parseInt(eachLevel.highStake.value) == null) {
        this.validationText += `High stake can't be empty in level ${i + 1} \n`;
        this.stakesCondition = true;  
      }

      if (i < this.BlindAddLevelsList.length - 1 && this.BlindAddLevelsList.length >= 2) {
        console.log(parseInt(this.BlindAddLevelsList[i].lowStake.value), parseInt(this.BlindAddLevelsList[i + 1].lowStake.value))
        console.log(parseInt(this.BlindAddLevelsList[i].lowStake.value) > parseInt(this.BlindAddLevelsList[i + 1].lowStake.value))

        if (parseInt(this.BlindAddLevelsList[i].lowStake.value) > parseInt(this.BlindAddLevelsList[i + 1].lowStake.value)) {
          this.validationText += `Low Stake value in level ${i + 2} can't be less than value in previous level \n`;
          this.stakesCondition = true;
        }

        if (parseInt(this.BlindAddLevelsList[i].highStake.value) > parseInt(this.BlindAddLevelsList[i + 1].highStake.value)) {
          this.validationText += `High Stake value in level ${i + 2} can't be less than value in previous level \n`;
          this.stakesCondition = true;

        }

        // if (parseInt(eachLevel.lowStake.value) == 0 || parseInt(eachLevel.lowStake.value) == null) {
        //   this.validationText += `Low Stake can't be empty in level ${i + 1} \n`;
        //   this.stakesCondition = true;

        // }

        // if (parseInt(eachLevel.highStake.value) == 0 || parseInt(eachLevel.highStake.value) == null) {
        //   this.validationText += `High stake can't be empty in level ${i + 1} \n`;
        //   this.stakesCondition = true;
        // }


        if (this.validationText === "") {
          this.stakesCondition = false;
        }
      }

      // if(this.BlindAddLevelsList[i].lowStake.value > this.BlindAddLevelsList[i+1].lowStake.value){

      // }

    })



    console.log(this.BlindStructureform.value.BlindStructureName)

    if ((this.BlindStructureform.value.BlindStructureName == null || this.BlindStructureform.value.BlindStructureName == "") && this.stakesCondition) {
      this.validationPopUp = true;
      this.validationText +=
        `Name can't be empty \n`
    }
    else if (this.BlindStructureform.value.BlindStructureName == null || this.BlindStructureform.value.BlindStructureName == "") {
      this.validationPopUp = true;
      this.validationText +=
        `Name can't be empty \n`
    } else if (this.stakesCondition) {
      this.validationPopUp = true;
    } else if (this.BlindAddLevelsList.length == 0) {
      this.validationText +=
        `Blinds structure should has at least one level`
      this.validationPopUp = true;

    } else {
      this.validationPopUp = false;
      this.stakesCondition = false;
      this.validationText = "";

      if (this.EditBlindData === null) {
        this.PokergamesService.createBlindStructure(body).subscribe((res) => {
          console.log(res)
          this.CreateBlindRes = res.changedObjectList;
          if (this.CreateBlindRes) {
            this.CreateSuccessPop = true;
            this.SuccessMsg = 'Successfully Created '
          }
          this.validationText = "";
        },
          error => {
            this.ErrorPopup = true;
            this.validationText = "";
          })
      } else {

        this.PokergamesService.updateBlindStructure(body).subscribe((res) => {
          console.log(res)
          this.CreateSuccessPop = true;
          this.SuccessMsg = 'Successfully Edited '
        })
      }
    }

  }

  SuccessPop() {
    this.CreateSuccessPop = false;
    this.router.navigateByUrl('/pokerblindstructures')
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }
  TechnicalError() {
    this.ErrorPopup = false;
    this.validationPopUp = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.EditBlindData)
    if (changes['EditBlindData'] && changes['EditBlindData']['currentValue']) {
      if (this.EditBlindData != null) {
        // console.log(this.BlindStructureform?.pot.wallet);
        this.BlindStructureform.patchValue({
          BlindStructureName: this.EditBlindData?.name,
        })
      }
      this.BlindAddLevelsList = [...this.EditBlindData.levels]
      console.log(this.BlindAddLevelsList)

    }
  }
  // ngAfterViewInit(): void {
  //   console.log(this.EditBlindData)
  //   if (this.EditBlindData != null) {
  //     // console.log(this.BlindStructureform?.pot.wallet);
  //     this.BlindStructureform.patchValue({
  //         BlindStructureName:this.EditBlindData?.name,
  //     })
  //   }
  //   this.BlindAddLevelsList =[...this.EditBlindData.levels]
  //   console.log( this.BlindAddLevelsList)
  // }
}
