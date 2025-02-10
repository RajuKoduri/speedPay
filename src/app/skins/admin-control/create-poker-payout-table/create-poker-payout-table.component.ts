import {
  jsDocComment,
  variable,
} from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-poker-payout-table',
  templateUrl: './create-poker-payout-table.component.html',
  styleUrls: ['./create-poker-payout-table.component.css'],
})
export class CreatePokerPayoutTableComponent implements OnInit, AfterViewInit {
  @Input() PokerpayoutData: any = null;
  Fixed: boolean = false;
  selectedOption: any;
  PokerPayoutTableForm: FormGroup;
  PayoutStructureList: any;
  PayoutTicketTypeList: any;
  from: number = 2;
  to: number = 3;
  ranges: any = [];
  EditWinnersPop: boolean = false;
  FixedEditWinnersPop: boolean = false;
  CopyfromExisting: boolean = false;
  ParticipantsRanges: any = [];
  ParticipantsRanges01: any = [];
  PokerPayoutStructureList: any = [];
  ExistingPayoutStructureName: any;
  WinnersRanges: any = [];
  WinnersRanges01: any = [];
  percents: any = [];
  selectedRowIndex: number = 0;
  ar_lables: any = [];
  ar_lables1: any = [];
  PayoutStructuresPop: boolean = false;
  last_index: any;
  from_value: any;
  payout_table: boolean = true;
  PayoutTicketTypeListlenth: any = 3;
  selectedIndex: number = 0;
  ticketClassStatus = false;
  selectedPrizeIndex = 0;
  selectedTicketTextstatus: string = '';
  PayoutTicketTypeListDup: any[] = [];
  editWinnerRangeNumber: number = 3;
  errorPopup: string = '';
  buyInsList: any = [];
  ticketTypesList: any = [];
  payoutTableErrorUpTextBoolValue: boolean = false;
  percentsaddList: any = [];
  ParticipantsRangesIndexs: any = [];
  ParticipantsRangesIndexsFilterd: any = [];
  CreateSuccessPop: boolean = false;
  ErrorPopup: boolean = false;
  submitted: boolean = false;
  errorMessageText: string = '';
  FilltererrorMessageText: string = '';
  WinnersRangesDelete: any = [];
  generatedString: string = '';
  selectedticket: any = "Ticket Up"
  buyinvalue: any
  buyincheck: boolean = false
  buyinnumber: any = []
  constructor(private PokergamesService: PokergamesService, private router: Router) {
    this.PokerPayoutTableForm = new FormGroup({
      PayoutTableName: new FormControl('', [Validators.required,]),
      Type: new FormControl(),
      BuyIn: new FormControl(0),
      TicketsCheckBox: new FormControl(true),
      TicketTypeStatus: new FormControl('Ticket Up'),
      BuyInCheckboxStatus: new FormControl(false),
      RedeemCheckbox: new FormControl(false),
      AutoRegisterCheckbox: new FormControl(false),
      ticketWithPrize: new FormControl(false),
    });
    console.log(this.PokerPayoutTableForm)
  }
  ngAfterViewInit(): void {
    console.log(this.PokerpayoutData);
    if (this.PokerpayoutData) {
      this.PokerPayoutTableForm.patchValue({
        PayoutTableName: this.PokerpayoutData.name,
        Type: this.PokerpayoutData.structureType,
        AutoRegisterCheckbox: this.PokerpayoutData.autoRegisterTourney,
        RedeemCheckbox: this.PokerpayoutData.convertToTM,
        ticketWithPrize: this.PokerpayoutData.ticketsAsPartOfPrize
      });

      // this.selectedOption = this.PokerpayoutData.structureType
      console.log(this.PokerpayoutData.percents);
      console.log(this.PokerpayoutData.placesIndices);
      console.log(this.PokerpayoutData.playersCountIndices);
      console.log(this.PokerpayoutData.buyins);
      console.log(this.PokerpayoutData.cashes);
      console.log(this.PokerpayoutData.ticketTypes);
      //this.buyInsList =[]
      // for(let i=0;i<this.PokerpayoutData.buyins.length;i++) {
      //   if(this.PokerpayoutData.buyins[i] == 0){
      //    this.buyInsList.push("")
      // }else{
      //   this.buyInsList.push(this.PokerpayoutData.buyins[i])
      //    }
      // }
      this.ParticipantsRanges01 = this.PokerpayoutData.playersCountIndices
      console.log(this.buyInsList)
      this.percents = this.PokerpayoutData.percents

      this.WinnersRanges = this.PokerpayoutData.placesIndices;
      this.percents = this.PokerpayoutData.percents;
      this.WinnersRanges01 = this.WinnersRanges;
      // this.WinnersRanges01 = JSON.parse(JSON.stringify(this.WinnersRanges)) as typeof this.WinnersRanges
      if (this.PokerpayoutData.structureTypename == 'Fixed') {
        this.buyInsList = []
        this.buyinnumber = this.PokerpayoutData.buyins
        this.payout_table = false;
        this.Fixed = true;
        this.PayoutTicketTypeListDup = []
        this.editWinnerRangeNumber = this.PokerpayoutData.places
        console.log(this.editWinnerRangeNumber)
        for (let i = 0; i < this.PokerpayoutData.buyins.length; i++) {
          if (this.PokerpayoutData.buyins[i] == 0) {
            this.buyInsList.push("")
          } else {
            this.buyInsList.push(this.PokerpayoutData.buyins[i])
            // this.PokerPayoutTableForm.patchValue({
            //   BuyInCheckboxStatus:true,
            //    BuyIn:this.buyinnumber[i]
            // });

          }
        }
        this.ticketTypesList = this.PokerpayoutData.ticketTypes
        for (let i = 0; i < this.PokerpayoutData.ticketTypes.length; i++) {
          var objlong = {
            guid: {},
            value: ""
          }
          var objguids = {
            guid: {},
          }

          if (this.PokerpayoutData.ticketTypes[i] !== null) {
            console.log(this.PokerpayoutData.ticketTypes[i].lowLong)
            if (this.PokerpayoutData.ticketTypes[i].lowLong == 0) {
              objlong.guid = this.PokerpayoutData.ticketTypes[i]
              objguids.guid = this.PokerpayoutData.ticketTypes[i]
              if (this.PokerpayoutData.buyins[i] == 0) {
                objlong.value = "Ticket Up"

              } else {
                objlong.value = "Ticket Up" + this.PokerpayoutData.buyins[i] + "x Buy-In"
              }
            }
            if (this.PokerpayoutData.ticketTypes[i].lowLong == 1) {
              objlong.guid = this.PokerpayoutData.ticketTypes[i]
              objguids.guid = this.PokerpayoutData.ticketTypes[i]
              if (this.PokerpayoutData.buyins[i] == 0) {
                objlong.value = "Ticket to Oneself"
              } else {
                objlong.value = "Ticket to Oneself" + this.PokerpayoutData.buyins[i] + "x Buy-In"
              }
            }
            if (this.PokerpayoutData.ticketTypes[i].lowLong == 2) {
              objlong.guid = this.PokerpayoutData.ticketTypes[i]
              objguids.guid = this.PokerpayoutData.ticketTypes[i]
              if (this.PokerpayoutData.buyins[i] == 0) {
                objlong.value = "Ticket Down"
              } else {
                objlong.value = "Ticket Down" + this.PokerpayoutData.buyins[i] + "x Buy-In"
              }
            }

          } else {
            // objlong.guid = this.PokerpayoutData.ticketTypes[i]
            objlong.value = this.PokerpayoutData.buyins[i] + "x Buy-In"
            objlong.value = this.PokerpayoutData.buyins[i] + "x Buy-In"
          }

          this.PayoutTicketTypeListDup.push(objlong)
          //  this.ticketTypesList.push(objguids)

        }
        console.log(this.ticketTypesList)
        console.log(this.PokerpayoutData.ticketTypes);
        if (this.PayoutTicketTypeListDup) {

          if (this.PayoutTicketTypeListDup[0].value.match("Ticket Up")) {
            this.selectedticket = "Ticket Up"
          }
          else if (this.PayoutTicketTypeListDup[0].value.match("Ticket to Oneself")) {
            this.selectedticket = "Ticket to Oneself"
          }
          else if (this.PayoutTicketTypeListDup[0].value.match("Ticket Down")) {
            this.selectedticket = "Ticket Down"
          }

          let result = this.PayoutTicketTypeListDup[0].value.match("Buy-In");
          console.log(result)
          if (result) {
            console.log(this.buyinnumber[0])
            this.PokerPayoutTableForm.get('BuyIn')?.enable();
            this.buyinvalue = this.buyinnumber[0]
            this.PokerPayoutTableForm.patchValue({
              BuyInCheckboxStatus: true,
              // BuyIn: this.buyinnumber[0] 
            })
          } else {
            this.PokerPayoutTableForm.get('BuyIn')?.disable();
            this.PokerPayoutTableForm.patchValue({
              BuyInCheckboxStatus: false,
              BuyIn: 0,
            });

          }


        }
        console.log(this.PayoutTicketTypeListDup)
        console.log(this.ticketTypesList)

      } else {
        this.payout_table = true;
        this.Fixed = false;
      }
      console.log("payoutrange", this.ParticipantsRanges01)
      this.calculatingTotalPercentagesTable();
    }
  }

  inputSpaceControl(event: any) {
    const input = event.target as HTMLInputElement;
    // Check if the input is empty and the key pressed is space
    if (input.value.length === 0 && event.key === ' ') {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    // console.log(this.editWinnerRangeNumber)
    this.PayoutStructure();
    console.log(this.selectedOption);
    this.PayoutTicketType();

    this.WinnersRanges = [
      {
        from: 1,
        to: 1,
      },
      {
        from: 2,
        to: 2,
      },
    ];
    // this.WinnersRanges01 = [...this.WinnersRanges]
    this.WinnersRanges01 = JSON.parse(JSON.stringify(this.WinnersRanges)) as typeof this.WinnersRanges;
    // const copy = JSON.parse(JSON.stringify(arr)) as typeof arr;
    (this.percents = [{ percents: [100, 0] }, { percents: [70, 30] }]),
      console.log(this.WinnersRanges01);
    console.log(this.percents);

    this.ParticipantsRanges01 = [
      {
        from: 2,
        to: 4,
      },
      {
        from: 5,
        to: 6,
      },
    ];

    console.log(this.ParticipantsRanges);
    console.log(this.ParticipantsRanges.length);
    console.log(this.PokerPayoutTableForm.value.TicketsCheckBox);
    if (!this.PokerPayoutTableForm.value.TicketsCheckBox) {
      this.PokerPayoutTableForm.get('TicketTypeStatus')?.disable();
      this.ticketClassStatus = true;
    } else {
      this.PokerPayoutTableForm.get('TicketTypeStatus')?.enable();
      this.ticketClassStatus = false;
    }

    this.calculatingTotalPercentagesTable();
  }

  get f() {
    return this.PokerPayoutTableForm.controls;
  }

  // generateRandomString() {
  //   // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  //   let result = '';
  //   const charactersLength = characters.length;
  //   for (let i = 0; i < 6; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   this.generatedString = result;
  // }

  TicketCheckboxStatusChange() {
    const element = document.getElementById('ticket' + this.selectedPrizeIndex) as HTMLInputElement;
    console.log(this.PokerPayoutTableForm.value.TicketsCheckBox);
    if (!this.PokerPayoutTableForm.value.TicketsCheckBox) {
      this.PokerPayoutTableForm.get('TicketTypeStatus')?.disable();
      this.ticketClassStatus = true;
      if (element) {
        element.textContent = '';
      }
    } else {
      this.PokerPayoutTableForm.get('TicketTypeStatus')?.enable();
      this.ticketClassStatus = false;
      element.textContent = this.PokerPayoutTableForm.value.TicketTypeStatus;
      this.PayoutTicketTypeListDup[this.selectedPrizeIndex] = {
        value: this.PokerPayoutTableForm.value.TicketTypeStatus,
      };

      if (this.PokerPayoutTableForm.value.BuyInCheckboxStatus == true) {
        // alert("start dis")
        this.PayoutTicketTypeListDup[this.selectedPrizeIndex] = {
          value: this.PokerPayoutTableForm.value.TicketTypeStatus + ' ' +
            this.PokerPayoutTableForm.value.BuyIn +
            ' x Buy-In'
        };
      }

    }

    this.BuyInCheckboxStatusChange();
  }

  clcikOnPayoutTickets(i: number, text: string, ur: any) {
    console.log(ur.textContent)
    console.log(typeof this.buyinnumber)
    console.log(this.buyinnumber)

    let indexbuyin
    let str = ur.textContent;
    console.log(str)
    let matches = str.match(/(\d+)/);
    if (matches) {
      indexbuyin = matches[0]
      console.log(matches[0]);
    }

    if (ur.textContent) {
      let result = ur.textContent.match("Buy-In");
      console.log(result)
      if (result) {
        console.log(result.input)
        this.PokerPayoutTableForm.get('BuyIn')?.enable();
        this.PokerPayoutTableForm.patchValue({
          BuyInCheckboxStatus: true,
          BuyIn: indexbuyin
          // BuyIn:this.buyinnumber[i]
        })
      } else {
        this.PokerPayoutTableForm.get('BuyIn')?.disable();
        this.PokerPayoutTableForm.patchValue({
          BuyInCheckboxStatus: false,
          BuyIn: 0,
        });

      }
    } else {
      this.PokerPayoutTableForm.get('BuyIn')?.disable();
      this.PokerPayoutTableForm.get('TicketTypeStatus')?.disable();
      if (text == null) {
        text = "Ticket Up"
      }
      this.PokerPayoutTableForm.patchValue({
        BuyInCheckboxStatus: false,
        BuyIn: 0,
      });
    }
    //  this.buyinnumber[i] = this
    console.log(this.PokerPayoutTableForm.value.BuyInCheckboxStatus);
    this.selectedticket = text
    console.log(this.selectedticket)
    // if(this.PokerpayoutData){
    if (this.selectedticket.match("Ticket Up")) {
      this.selectedticket = "Ticket Up"
    }
    else if (this.selectedticket.match("Ticket to Oneself")) {
      this.selectedticket = "Ticket to Oneself"
    }
    else if (this.selectedticket.match("Ticket Down")) {
      this.selectedticket = "Ticket Down"
    }
    // }
    this.selectedPrizeIndex = i;
    console.log(this.selectedPrizeIndex);
    let selectedItem = this.PayoutTicketTypeListDup[i];
    console.log(selectedItem);
    console.log(text);
    if (selectedItem.value == '') {
      this.PokerPayoutTableForm.patchValue({
        TicketsCheckBox: false,
      });
    } else {
      this.PokerPayoutTableForm.patchValue({
        // TicketTypeStatus: text,
        TicketsCheckBox: true,
      });
      this.PokerPayoutTableForm.get('TicketTypeStatus')?.enable();
      this.ticketClassStatus = false;
    }
    // this.TicketCheckboxStatusChange();
    // this.BuyInCheckboxStatusChange();
  }

  changeRadioTicketTypeStatus(i: any, event: any) {
    // ticket{i}
    console.log(i, event);
    console.log(this.PokerPayoutTableForm.value.TicketTypeStatus);
    console.log(event.target.value);
    this.selectedTicketTextstatus = event.target.value;
    // element' is possibly 'null'.ts(18047)
    // const element: HTMLElement | null
    let element = document.getElementById('ticket' + this.selectedPrizeIndex) as HTMLInputElement;
    console.log(element);
    console.log(element.innerHTML);
    let result = element.innerHTML.match("Buy-In");
    // element.innerHTML = this.PokerPayoutTableForm.value.TicketTypeStatus;
    if (result) {
      this.PayoutTicketTypeListDup[this.selectedPrizeIndex] = {
        value: this.PokerPayoutTableForm.value.TicketTypeStatus + ' ' + this.PokerPayoutTableForm.value.BuyIn + ' x Buy-In'
      };
    } else {
      this.PayoutTicketTypeListDup[this.selectedPrizeIndex] = {
        value: this.PokerPayoutTableForm.value.TicketTypeStatus,
      };
    }
    this.BuyInCheckboxStatusChange();
  }

  BuyInCheckboxStatusChange() {
    let element = document.getElementById('ticket' + this.selectedPrizeIndex) as HTMLInputElement;
    if (element) {
      console.log(element.innerText);
      element.innerText = '';
    }

    console.log(this.PokerPayoutTableForm.value.BuyInCheckboxStatus);
    if (this.PokerPayoutTableForm.value.BuyInCheckboxStatus) {
      this.PokerPayoutTableForm.get('BuyIn')?.enable();
      console.log(this.PokerPayoutTableForm.value.BuyIn);
      console.log(this.PokerPayoutTableForm.value.TicketTypeStatus);
      console.log(this.buyInsList)
      this.buyInsList[this.selectedPrizeIndex] = this.buyinvalue
      console.log(this.buyInsList)

      // this.buyInsList[this.selectedPrizeIndex] = this.PokerPayoutTableForm.value.BuyIn;
      if (this.PokerPayoutTableForm.value.TicketTypeStatus) {
        if (element) {
          element.innerText = this.PokerPayoutTableForm.value.TicketTypeStatus + ' ' + this.PokerPayoutTableForm.value.BuyIn + ' x Buy-In';
          this.buyInsList[this.selectedPrizeIndex] = parseInt(
            this.PokerPayoutTableForm.value.BuyIn);

          // this.buyinnumber[this.selectedPrizeIndex] = parseInt(
          //   this.PokerPayoutTableForm.value.BuyIn
          // );
          console.log(this.buyinnumber)
          console.log(this.buyInsList)
        }
      } else {
        if (element) {
          element.innerText =
            this.PokerPayoutTableForm.value.BuyIn + ' x Buy-In';
          this.buyInsList[this.selectedPrizeIndex] = parseInt(
            this.PokerPayoutTableForm.value.BuyIn
          );
        }
      }
    } else {
      this.PokerPayoutTableForm.get('BuyIn')?.disable();
      this.PokerPayoutTableForm.patchValue({
        BuyIn: 0,
      });
      if (this.PokerPayoutTableForm.value.TicketTypeStatus) {
        if (element) {
          element.innerText = this.PokerPayoutTableForm.value.TicketTypeStatus;
        }
      } else {
        if (element) {
          element.innerText = '';
        }
      }
      this.buyInsList[this.selectedPrizeIndex] = '';
    }
  }
  newbuyinseklectemethod() {

  }

  SelectedIndexMethod(index: any) {
    this.selectedIndex = index;
  }

  PayoutStructure() {
    const PayoutStructure = localStorage.getItem('PayoutStructure');
    if (PayoutStructure) {
      this.PayoutStructureList = JSON.parse(PayoutStructure);
    }
    console.log('PayoutStructureList', this.PayoutStructureList);
    this.selectedOption = this.PayoutStructureList[0].guid;
    for (let i = 0; i < this.PayoutStructureList.length; i++) {
      if (this.PayoutStructureList[i].value == 'Float') {
        // this.PokerPayoutTableForm.patchValue({ PayoutTableName: this.PayoutStructureList[0].value })
        // this.PokerPayoutTableForm.value.Type = this.PayoutStructureList[0].value
      }
      console.log(this.PokerPayoutTableForm.value.Type);
    }
  }
  PayoutTicketType() {
    const PayoutTicketType = localStorage.getItem('PayoutTicketType');
    if (PayoutTicketType) {
      this.PayoutTicketTypeList = JSON.parse(PayoutTicketType);
    }
    this.PayoutTicketTypeListDup = [...this.PayoutTicketTypeList];
    console.log('PayoutTicketTypeList', this.PayoutTicketTypeList);

    // buyInsList:any = [0,0,0];
    // ticketTypes:any =[];
    for (let i = 0; i < this.PayoutTicketTypeListDup.length; i++) {
      this.buyInsList.push('');
      this.ticketTypesList.push(this.PayoutTicketTypeListDup[i].guid);
      this.buyinnumber[i] = 0
    }
  }
  onTypechange(type: any, name: any) {
    // console.log(i)
    console.log(type);
    console.log(name);
    if (name.hiLong == 0 && name.lowLong == 1) {
      this.payout_table = false;
      this.Fixed = true;
    } else {
      this.Fixed = false;
      this.payout_table = true;
    }
    // console.log(this.PokerPayoutTableForm.value.Type)
    // console.log(this.PokerPayoutTableForm.value.Type)
  }

  EditWinnersPopUp() {
    this.EditWinnersPop = true;
    this.from = 1;
    this.to = 1;
    let obj = [
      {
        from: this.from,
        to: this.to,
      },
      {
        from: this.from + 1,
        to: this.to + 1,
      },
    ];
    if (this.WinnersRanges.length == 0) {
      this.WinnersRanges = obj;
    }
    console.log('first list');
    console.log(this.WinnersRanges);
  }

  CopyfromExistingPop() {
    let body = {};
    this.PokerPayoutStructureList = [];
    this.PokergamesService.getPokerPayoutStructureList(body).subscribe(
      (res) => {
        if (res) {
          // this.PokerPayoutStructureList = res.objectList;
          // console.log(res.objectList[0].levels[0])
          // this.ExistingBlindName = res.objectList[0].levels[0]
          console.log(this.PokerPayoutStructureList);
          for (let i = 0; i < res.objectList.length; i++) {
            for (let j = 0; j < this.PayoutStructureList.length; j++) {
              if (
                res.objectList[i].structureType.lowLong ==
                this.PayoutStructureList[j].guid.lowLong
              ) {
                res.objectList[i].structureType =
                  this.PayoutStructureList[j].value;
              }
            }
            if (res.objectList[i].structureType == 'Float') {
              this.PokerPayoutStructureList.push(res.objectList[i]);
              console.log(res.objectList[i].structureType);
            }
          }
          console.log(this.PokerPayoutStructureList);
          this.ExistingPayoutStructureName = this.PokerPayoutStructureList[0].name
          console.log(this.PokerPayoutStructureList[0].name)
        }
      }
    );
    this.CopyfromExisting = true;
  }
  CopyfromExistingPopClose() {
    this.CopyfromExisting = false;
  }
  ExistingStructurePopClose() {
    this.CopyfromExisting = false;
    this.ExistingPokerPayoutStructure(this.ExistingPayoutStructureName);

  }
  ExistingPokerPayoutStructure(Payoutname: any) {
    console.log(Payoutname);
    this.ParticipantsRanges = [];
    this.WinnersRanges = [];
    this.WinnersRanges01 = [];
    this.percents = [];
    console.log(this.ParticipantsRanges);
    for (let i = 0; i < this.PokerPayoutStructureList.length; i++) {
      if (Payoutname == this.PokerPayoutStructureList[i].name) {
        console.log(this.PokerPayoutStructureList[i]);
        // this.WinnersRanges.push(this.PokerPayoutStructureList[i].placesIndices)
        // this.WinnersRanges=(this.PokerPayoutStructureList[i].placesIndices)
        this.WinnersRanges01 = this.PokerPayoutStructureList[i].placesIndices;
        this.WinnersRanges = this.PokerPayoutStructureList[i].placesIndices;
        this.ParticipantsRanges01 = this.PokerPayoutStructureList[i].playersCountIndices;
        this.percents = this.PokerPayoutStructureList[i].percents;
        console.log(this.WinnersRanges);
        console.log(this.WinnersRanges01);
        console.log(this.percents);
        for (
          let j = 0;
          j < this.PokerPayoutStructureList[i].playersCountIndices.length;
          j++
        ) {
          this.ParticipantsRanges.push(
            this.PokerPayoutStructureList[i].playersCountIndices[j]
          );
          console.log(this.PokerPayoutStructureList[i].playersCountIndices[j]);
        }
      }
    }


    console.log(this.ParticipantsRanges01)
    this.calculatingTotalPercentagesTable();
  }

  newRangeAdd() { }

  newRangesAdd() {
    console.clear();
    this.selectedRowIndex = 0;
    console.log(this.selectedRowIndex);
    let next_item_from_value = 0;
    if (this.selectedRowIndex == 0) {
      console.log(this.WinnersRanges);
      next_item_from_value = this.WinnersRanges[this.WinnersRanges.length - 1].to + 1;
      let next_item = {
        from: next_item_from_value,
        to: next_item_from_value + 1,
      };

      this.WinnersRanges.push(next_item);
      console.log(this.percents);
    }

    // this.percents = [
    //   { percents: [100] },
    //   { percents: [70, 30] },
    // ],

    //   {
    //     "percents": [
    //         100,
    //         0
    //     ]
    // }

    console.log(this.WinnersRanges.length);
    console.log(this.percents.length);
    console.log(this.percents);
    for (let k = 0; k < this.percents.length; k++) {
      this.percents[k] = { percents: [...this.percents[k].percents, 0] };
    }
  }

  row_select(index: any) {
    console.log('row_select');
    console.log(index);
    this.selectedRowIndex = index;
    this.from = this.WinnersRanges[index]['from'];
    this.to = this.WinnersRanges[index]['to'];
  }

  deleteRanges(x: any) {
    //this.selectedRowIndex
    console.log('delete');
    // this.selectedRowIndex =x
    // this.WinnersRangesDelete = [...this.WinnersRanges]

    if (this.selectedRowIndex == this.WinnersRanges.length - 1) {
      this.WinnersRanges.splice(this.selectedRowIndex, 1);
      this.selectedIndex = this.selectedRowIndex - 1
      console.log(this.selectedRowIndex)
      this.from = this.WinnersRanges[this.selectedIndex]['from'];
      this.to = this.WinnersRanges[this.selectedIndex]['to'];
    } else {
      let fromVal = this.WinnersRanges[this.selectedRowIndex]['from'];
      let toVal = this.WinnersRanges[this.selectedRowIndex + 1]['to'];
      console.log(this.selectedRowIndex);
      console.log(fromVal);
      console.log(toVal);
      this.WinnersRanges.splice(this.selectedRowIndex, 1);
      this.WinnersRanges[this.selectedRowIndex]['from'] = fromVal;
      this.WinnersRanges[this.selectedRowIndex]['to'] = toVal;
      // this.from = fromVal;
      this.from = fromVal;
      this.to = toVal;

      console.log(this.WinnersRanges01);
      console.log(this.percentsaddList);
      console.log(this.percents)
      // this.WinnersRanges01[this.selectedRowIndex]['from'] =toVal;
      // this.percentsaddList.pop();
      // this.RemovePercentSelectedIndex()
    }
    this.RemovePercentSelectedIndex("winner")
  }

  EditWinnersPopClose() {
    this.selectedIndex = 0;
    this.EditWinnersPop = false;
    this.WinnersRanges01 = [...this.WinnersRanges];
    // this.WinnersRanges01 = this.WinnersRanges;

    this.calculatingTotalPercentagesTable();
    // this.RemovePercentSelectedIndex("winner")
  }

  EditWinnersPopCloseCancel() {
    // this.WinnersRanges01 = [...this.WinnersRanges01]
    this.selectedIndex = 0;
    this.EditWinnersPop = false;
  }

  save(custom_to_value: number, from_value: number) {
    this.last_index = this.WinnersRanges.length;
    for (let i = this.selectedRowIndex + 1; i < this.WinnersRanges.length; i++) {
      if (custom_to_value >= this.WinnersRanges[i].to) {
        // alert("to value can not be greater than or equal to next range to value")
        // alert("Current range 'To' value can't be more or equals next range 'To' value");
        this.errorMessageText = "Current range 'To' value can't be more or equals next range 'To' value";
        this.ErrorPopup = true;
        return;
      }
      if (from_value >= this.WinnersRanges[i].from) {
        // alert("Current range 'To' value can't be less Current  range 'From' value");
        this.errorMessageText =
          "Current range 'To' value can't be less Current  range 'From' value";
        this.ErrorPopup = true;
        return;
      }
    }

    //earlier working code
    console.log('selected row logic');
    this.from_value = parseInt(this.WinnersRanges[this.selectedRowIndex]['from']);
    //let next_item_to_value = (this.from_value + (custom_to_value - this.from_value))
    let sel_item = {
      from: this.from,
      to: custom_to_value,
    };
    this.WinnersRanges[this.selectedRowIndex] = sel_item;
    console.log(this.WinnersRanges[this.selectedRowIndex]);
    custom_to_value = custom_to_value + 1;
    console.log(this.last_index)
    console.log(this.WinnersRanges)
    if (this.selectedRowIndex + 1 == this.last_index - 1) {
      this.WinnersRanges[this.last_index - 1] = {
        from: custom_to_value,
        to: this.WinnersRanges[this.last_index - 1].to,
      };
    } else if (this.selectedRowIndex + 1 < this.last_index - 1) {
      this.WinnersRanges[this.selectedRowIndex + 1] = {
        from: custom_to_value,
        to: this.WinnersRanges[this.selectedRowIndex + 1].to,
      };
    }

    for (var i = this.selectedRowIndex; i < this.WinnersRanges.length; i++) {
      console.log('index ->' + i + '-->' + this.WinnersRanges[i]['from'] + '-' + this.WinnersRanges[i]['to']);
    }

    this.last_index = this.WinnersRanges.length - 1;

    this.selectedRowIndex = 0;
  }
  ParticipantPopUp() {
    // this.PayoutStructureList = [];
    // PayoutStructureList
    // this.ParticipantsRanges = []
    this.PayoutStructuresPop = true;
    this.from = 2;
    this.to = 4;
    let obj = [
      {
        from: this.from,
        to: this.to,
        // to: this.to,
      },
      {
        from: this.from + 1 + 1 + 1,
        // to: this.to + 1 + 1,
        to: -1
      },
    ];
    if (this.ParticipantsRanges.length == 0) {
      this.ParticipantsRanges = obj;
    }
    console.log('first list');
    console.log(this.ParticipantsRanges);
  }
  ParticipantPopUpclose() {
    this.PayoutStructuresPop = false;
    this.selectedIndex = 0;
  }
  ParticipantAddPopUpclose(confirm: any) {
    this.selectedIndex = 0;
    this.PayoutStructuresPop = false;
    // if (confirm == "addrang") {
    for (let i = 2; i < this.ParticipantsRanges.length; i++) {
      // this.percents.forEach((a: any) => { a.percents = [0] });
      // this.percents[i]= { percents : 0}
      // this.percents[i] = 0
    }
    console.log('**************', this.percents);
    // this.ParticipantsRanges01 = this.ParticipantsRanges;
    this.ParticipantsRanges01 = JSON.parse(JSON.stringify(this.ParticipantsRanges));

    // }
    console.log(confirm);
    this.calculatingTotalPercentagesTable();
  }

  ParticipantnewRangesAdd() {
    console.clear();
    this.selectedRowIndex = 0;
    console.log(this.selectedRowIndex);
    let next_item_from_value = 0;

    if (this.selectedRowIndex == 0) {
      this.ParticipantsRanges[this.ParticipantsRanges.length - 1].to = this.ParticipantsRanges[this.ParticipantsRanges.length - 1].from + 1
      console.log(this.ParticipantsRanges);
      next_item_from_value = this.ParticipantsRanges[this.ParticipantsRanges.length - 1].to + 1;
      let next_item = {
        from: next_item_from_value,
        to: next_item_from_value + 1,
      };

      this.ParticipantsRanges.push(next_item);
      console.log(this.ParticipantsRanges01);
      console.log(this.ParticipantsRanges)
    }

    console.log(this.ParticipantsRanges)
    console.log(this.WinnersRanges.length); //0 3
    console.log(this.ParticipantsRanges.length); //3 4
    console.log(this.percents.length); //2 3
    let ParticipantnewRangesAddItems: any = [];
    for (let j = 0; j < this.percents[0].percents.length; j++) {
      ParticipantnewRangesAddItems = [...ParticipantnewRangesAddItems, 0];
    }
    console.log(ParticipantnewRangesAddItems);
    this.percents = [...this.percents, { percents: [...ParticipantnewRangesAddItems] },];
    this.ParticipantsRanges[this.ParticipantsRanges.length - 1].to = -1
    console.log(this.ParticipantsRanges)

  }

  Participantrow_select(index: any) {
    console.log('row_select');
    console.log(index);
    this.selectedRowIndex = index;

    this.from = this.ParticipantsRanges[index]['from'];
    this.to = this.ParticipantsRanges[index]['to'];
  }
  ParticipantdeleteRanges(x: any) {
    //this.selectedRowIndex
    console.log('delete');
    // this.selectedRowIndex =x
    let fromVal = this.ParticipantsRanges[this.selectedRowIndex]['from'];
    let toVal = this.ParticipantsRanges[this.selectedRowIndex + 1]['to'];
    console.log(this.selectedRowIndex);
    console.log(fromVal);
    console.log(toVal);
    this.ParticipantsRanges.splice(this.selectedRowIndex, 1);
    this.ParticipantsRanges[this.selectedRowIndex]['from'] = fromVal;
    this.ParticipantsRanges[this.selectedRowIndex]['to'] = toVal;
    this.from = fromVal;
    this.to = toVal;
    // this.calculatingTotalPercentagesTable();
    // this.ParticipantsRanges01 =JSON.parse(JSON.stringify(this.ParticipantsRanges));
    // this.ParticipantsRanges01 = [...this.ParticipantsRanges];
    // this.percentsaddList.pop();
    this.RemovePercentSelectedIndex("participate")

  }

  RemovePercentSelectedIndex(type: string) {
    // console.log(this.selectedIndex)
    // console.log(this.percents);
    if (type == "winner") {
      this.percents.forEach((percent: any) => {
        percent.percents.splice(this.selectedIndex, 1)
      })
      console.log(this.percents);
    }
    else if (type == "participate") {
      console.log(this.percents)
      this.percents.splice(this.selectedIndex, 1);

      // console.log(this.percents)
      // this.percents.forEach((percent:any)=>{
      //   // percent.splice(this.selectedIndex,1)
      // })
    }


  }

  EditParticipantSave(custom_to_value: number, from_value: number) {
    this.last_index = this.ParticipantsRanges.length;
    for (let i = this.selectedRowIndex + 1; i <= this.selectedRowIndex + 1; i++) {
      // for (let i = this.selectedRowIndex + 1;i < this.ParticipantsRanges.length;i++) {
      if (custom_to_value >= this.ParticipantsRanges[i].to && this.selectedRowIndex != this.ParticipantsRanges.length - 2) {
        // if (custom_to_value >= this.ParticipantsRanges[i].to) {
        // alert("Current range 'To' value can't be more or equals next range 'To' value");
        this.errorMessageText =
          "Current range 'To' value can't be more or equals next range 'To' value";
        this.ErrorPopup = true;

        return;
      }
      if (from_value >= this.ParticipantsRanges[i].from) {
        // alert("Current range 'To' value can't be less Current  range 'From' value")
        this.errorMessageText =
          "Current range 'To' value can't be less Current  range 'From' value";
        this.ErrorPopup = true;
        return;
      }
    }

    //earlier working code
    console.log('selected row logic');
    this.from_value = parseInt(
      this.ParticipantsRanges[this.selectedRowIndex]['from']
    );
    //let next_item_to_value = (this.from_value + (custom_to_value - this.from_value))
    let sel_item = {
      from: this.from,
      to: custom_to_value,
    };
    this.ParticipantsRanges[this.selectedRowIndex] = sel_item;
    console.log(this.ParticipantsRanges[this.selectedRowIndex]);
    console.log(this.ParticipantsRanges[this.selectedRowIndex]);
    console.log(this.last_index);
    console.log(this.selectedRowIndex + 1);
    custom_to_value = custom_to_value + 1;
    if (this.selectedRowIndex + 1 == this.last_index) {
      this.ParticipantsRanges[this.last_index] = {
        from: custom_to_value,
        to: this.ParticipantsRanges[this.last_index].to,
      };
    } else if (this.selectedRowIndex + 1 < this.last_index) {
      this.ParticipantsRanges[this.selectedRowIndex + 1] = {
        from: custom_to_value,
        to: this.ParticipantsRanges[this.selectedRowIndex + 1].to,
      };
    }

    for (var i = this.selectedRowIndex; i < this.ParticipantsRanges.length; i++) {
      console.log('index ->' + i + '-->' + this.ParticipantsRanges[i]['from'] + '-' + this.ParticipantsRanges[i]['to']
      );
    }

    this.last_index = this.WinnersRanges.length - 1;

    this.selectedRowIndex = 0;
  }

  FixedEditWinnersPopUp() {

    this.PayoutTicketTypeListlenth = this.PayoutTicketTypeListDup.length;
    console.log(this.PayoutTicketTypeListlenth);

    this.FixedEditWinnersPop = true;
  }

  FixedEditWinnersPopUpClose() {
    if (!this.editWinnerRangeNumber) {
      this.editWinnerRangeNumber = 1
    }
    this.FixedEditWinnersPop = false;
    console.log(this.PayoutTicketTypeListDup.length);
    console.log(this.editWinnerRangeNumber);
    console.log(this.buyInsList);
    console.log(this.ticketTypesList.slice(this.editWinnerRangeNumber))
    // this.selectedPrizeIndex = i;
    let buyincount = []
    if (this.PayoutTicketTypeListDup.length < this.editWinnerRangeNumber) {
      this.selectedPrizeIndex = this.PayoutTicketTypeListDup.length;
      for (let i = 0; i < this.editWinnerRangeNumber - this.PayoutTicketTypeListDup.length; i++) {
        buyincount[i] = 0
      }
      for (let s = this.PayoutTicketTypeListDup.length; s < this.editWinnerRangeNumber; s++) {
        this.PayoutTicketTypeListDup.push({ value: '' });
        this.buyInsList[s] = '';
        this.PokerPayoutTableForm.patchValue({
          TicketsCheckBox: false,
          BuyInCheckboxStatus: false,
          BuyIn: 0,
        });
      }
      console.log(buyincount)
      this.buyinnumber = this.buyinnumber + buyincount
      console.log(this.buyinnumber)

      this.TicketCheckboxStatusChange();
      this.BuyInCheckboxStatusChange();
    } else {
      let deleteLength =
        this.PayoutTicketTypeListDup.length - this.editWinnerRangeNumber;

      for (let i = 0; i < deleteLength; i++) {
        this.PayoutTicketTypeListDup.pop();
        this.buyInsList.pop();
      }

      this.selectedPrizeIndex = this.editWinnerRangeNumber - 1;
      let emtyValueIndex = this.PayoutTicketTypeListDup.findIndex((eachItem: any) => {
          console.log(eachItem);
          if (eachItem.value == '') {
            return true;
          } else {
            return false;
          }
        }
      );
      console.log(emtyValueIndex);

      if ( this.PayoutTicketTypeListDup.length <= emtyValueIndex ||emtyValueIndex == -1) {
        this.PokerPayoutTableForm.patchValue({
          TicketsCheckBox: true,
          // BuyInCheckboxStatus:true
        });
        this.TicketCheckboxStatusChange();
      } else {
        this.PokerPayoutTableForm.patchValue({
          TicketsCheckBox: false,
        });
      }

      console.log(this.buyInsList);

      for (let j = 0; j < this.buyInsList.length; j++) {
        if (typeof this.buyInsList[j] === 'number') {
          this.PokerPayoutTableForm.patchValue({
            BuyInCheckboxStatus: true,
          });
          this.BuyInCheckboxStatusChange();
        } else {
          this.PokerPayoutTableForm.patchValue({
            BuyInCheckboxStatus: false,
          });
          this.BuyInCheckboxStatusChange();
        }
      }
    }

  }

  FixedEditWinnersPopUpCloseCancel() {
    this.FixedEditWinnersPop = false;
  }

  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls).forEach((key) => {
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

  tournamentErrorclosepopup = () => {
    this.payoutTableErrorUpTextBoolValue = false;
  };

  SuccessPop() {
    this.CreateSuccessPop = false;
    // window.location.reload();
    if (this.FilltererrorMessageText == 'Successfully Created') {
      this.router.navigateByUrl('/pokerpayouttables')
    } else {
      window.location.reload();

    }
  }

  TechnicalError() {
    this.ErrorPopup = false;
    // window.location.reload();
  }

  calculatingTotalPercentagesTable() {
    this.percentsaddList = [];
    this.ParticipantsRangesIndexs = []
    // calculating (add) percents
    console.log(this.percents.length);
    console.log(this.percents);
    console.log(this.ParticipantsRanges01.length);
    console.log(this.ParticipantsRanges01);
    console.log(this.WinnersRanges01)

    for (let i = 0; i < this.ParticipantsRanges01.length; i++) {
      // for(let i=0; i<this.percents.length; i++){
      let percentsaddMount: number = 0;

      for (let j = 0; j < this.percents[i].percents.length; j++) {
        let aa = this.WinnersRanges01[j];
        let mulNumber: number = 0;
        if (aa.from === aa.to) {
          mulNumber = 1;
        } else {
          for (let m = aa.from; m <= aa.to; m++) {
            mulNumber += 1;
          }
        }

        console.log(mulNumber);
        percentsaddMount += Number(this.percents[i].percents[j]) * mulNumber;
      }

      console.log(this.ParticipantsRanges01[i])
      console.log(this.ParticipantsRanges01)
      this.ParticipantsRangesIndexs.push(this.ParticipantsRanges01[i]);
      this.percentsaddList.push(percentsaddMount);
      console.log(percentsaddMount);
      console.log(this.percentsaddList);
      console.log(this.ParticipantsRangesIndexs);
    }

    this.ParticipantsRangesIndexsFilterd = [];
    // for(let k=0;k<this.ParticipantsRangesIndexs.length;k++){
    for (let k = 0; k < this.percentsaddList.length; k++) {
      if (this.percentsaddList[k] > 100 || this.percentsaddList[k] < 100) {
        this.ParticipantsRangesIndexsFilterd.push(this.ParticipantsRangesIndexs[k]);
      }
    }
    console.log(this.ParticipantsRangesIndexsFilterd);

    // calculating (add) percents
  }

  inputpayout12(data: any) {

    console.log(data.key)
    var k;
    k = data.charCode;
    console.log(k)//         k = event.keyCode;  (Both can be used)
    if (k) { }
    // return ((k > 47 && k < 58 ))
    return ((k > 47 && k < 58) || k == 46)
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.PokerPayoutTableForm.value.PayoutTableName === '') {
    }

    let fillterbody = this.getDirtyValues(this.PokerPayoutTableForm);

    // console.log(this.PokerPayoutTableForm.value);
    console.log(this.percents);
    console.log(this.buyInsList);
    console.log(this.ticketTypesList + "ticketTypes");
    console.log(this.PayoutTicketTypeListDup);

    this.errorPopup = '';
    // this.percentsaddList=[]
    this.ParticipantsRangesIndexs = [];
    // this.ParticipantsRangesIndexsFilterd=[]

    const emtyGuidIndex: any = [];

    // for(let i=0; i<this.PayoutTicketTypeList.length;i++){

    //   this.PayoutTicketTypeListDup.forEach((eachItem:any,j) =>{
    //     if(this.PayoutTicketTypeList[i].value === eachItem.value){
    //       this.ticketTypesList[j]= this.PayoutTicketTypeList[i].guid
    //     }else if(eachItem.value ==="" &&this.buyInsList[j]===0){
    //       // alert("11111111")
    //       emtyGuidIndex.push(j);
    //     }else if(eachItem.value ==="" &&this.buyInsList[j]=== ""){
    //       // alert("222222")
    //       emtyGuidIndex.push(j);
    //     }
    //   })

    // }

    this.PayoutTicketTypeListDup.forEach((eachItem: any, j) => {
      for (let i = 0; i < this.PayoutTicketTypeList.length; i++) {
        if (this.PayoutTicketTypeList[i].value === eachItem.value) {
          this.ticketTypesList[j] = this.PayoutTicketTypeList[i].guid;
        } else if (eachItem.value === '' && this.buyInsList[j] === 0) {
          emtyGuidIndex.push(j);
        } else if (eachItem.value === '' && this.buyInsList[j] === '') {
          emtyGuidIndex.push(j);
          break;
        }
      }
    });
    console.log(emtyGuidIndex);

    const bodybuyInsList: any = [];
    const bodyCashes: any = [];

    this.buyInsList.forEach((eachItem: any) => {
      bodyCashes.push(0);
      if (typeof eachItem === 'number') {
        if (eachItem > 0) {
          bodybuyInsList.push(eachItem);
        } else if (eachItem === 0) {
          bodybuyInsList.push(0);
        }
      } else {
        bodybuyInsList.push(0);
      }
    });
    console.log(bodybuyInsList);
    console.log(this.buyInsList);

    let index: any = [];
    this.buyInsList.forEach((eachItem: any, i: any) => {
      if (typeof eachItem == 'number') {
        if (eachItem == 0) {
          index.push(i);

          return true;
        }
      } else {
        return false;
      }

      return index;
    });

    console.log('emty buyIns Index  :', index);

    if (this.PokerpayoutData) {
      console.log(this.PokerPayoutTableForm.value.Type)
    }
    if (this.PokerPayoutTableForm.value.Type.hiLong == 0 && this.PokerPayoutTableForm.value.Type.lowLong == 0) {
      // alert("test")
      this.payout_table = true;
    } else {
      // alert("test1")
      this.payout_table = false;
    }

    console.log(this.PokerPayoutTableForm.value.Type.name)
    let body = {
      "objState": "2",
      "editable": false,
      "name": this.PokerPayoutTableForm.value.PayoutTableName,
      "structureType": this.PokerPayoutTableForm.value.Type,
      "percents": this.percents,
      "placesIndices": this.WinnersRanges01,
      "playersCountIndices": this.ParticipantsRanges01

    }
    console.log(body)

    if (this.Fixed === true) {
      this.errorPopup = '';
      //For Fixed
      console.log(this.editWinnerRangeNumber)
      console.log(this.ticketTypesList)
      this.ticketTypesList = this.ticketTypesList.slice(0, this.editWinnerRangeNumber)
      console.log(this.ticketTypesList)

      console.log(this.PokerPayoutTableForm.value.PayoutTableName);

      if (
        this.PokerPayoutTableForm.value.PayoutTableName === '' ||
        this.PokerPayoutTableForm.value.PayoutTableName === null
      ) {
        this.payoutTableErrorUpTextBoolValue = true;
        this.errorPopup = "Field 'Payout Table Name' can't be empty";
      } else if (index.length > 0) {
        // alert("fixed 1")

        this.payoutTableErrorUpTextBoolValue = true;
        this.errorPopup = '';
        for (let i = 0; i < index.length; i++) {
          this.errorPopup += `Count of Buy In must be positive value in row:${index[i] + 1
            }\n`;
        }
      } else if (emtyGuidIndex.length > 0) {
        // alert("fixed 2")
        this.errorPopup = '';
        this.payoutTableErrorUpTextBoolValue = true;
        for (let i = 0; i < emtyGuidIndex.length; i++) {
          this.errorPopup = '';
          this.errorPopup += `Invalid value in row : ${emtyGuidIndex[i] + 1}\n`;
          // this.errorPopup += `Invalid value in row : ${emtyGuidIndex[i]+1}`
        }
      } else {
        // alert("fixed api")
        this.payoutTableErrorUpTextBoolValue = false;

        fillterbody['places'] = this.editWinnerRangeNumber;
        fillterbody['ticketTypes'] = this.ticketTypesList;
        fillterbody['buyins'] = bodybuyInsList;
        // fillterbody["cashes"]= ["0.00","0.00"];
        fillterbody['cashes'] = bodyCashes;
        this.PokerPayoutTableForm.value.PayoutTableName;
        fillterbody['name'] = this.PokerPayoutTableForm.value.PayoutTableName !== null ? this.PokerPayoutTableForm.value.PayoutTableName : undefined;
        fillterbody['editable'] = false;
        fillterbody['autoRegisterTourney'] = this.PokerPayoutTableForm.value.AutoRegisterCheckbox;
        fillterbody['convertToTM'] = this.PokerPayoutTableForm.value.RedeemCheckbox;
        fillterbody['structureType'] = this.PokerPayoutTableForm.value.Type;
        // "ticketsAsPartOfPrize":false,
        fillterbody['ticketsAsPartOfPrize'] = this.PokerPayoutTableForm.value.ticketWithPrize;
        // fillterbody["structureType"] = this.Fixed===true? {hiLong: 0, lowLong: 0}:{hiLong: 0, lowLong: 1}
        if (this.PokerpayoutData) {
          fillterbody['guid'] = this.PokerpayoutData.guid
        }

        console.log(fillterbody)
        if (this.PokerpayoutData) {
          // alert("api update Fixed")
          this.PokergamesService.updatePokerPayoutsStructure(fillterbody).subscribe(data => {
            console.log(data)
            if (data.changedObjectList) {
              // alert("update")
              this.CreateSuccessPop = true;
              this.FilltererrorMessageText = 'Successfully Updated';
            }
          })
        } else {
          this.PokergamesService.createPokerPayoutsStructure(fillterbody).subscribe((data) => {
            console.log(data);
            if (data.changedObjectList) {
              this.CreateSuccessPop = true;
              this.FilltererrorMessageText = 'Successfully Created';
            }
          },
            (error) => {
              this.CreateSuccessPop = true;
              this.FilltererrorMessageText = 'Technical Error...';
              console.log(error);
            }
          );
          console.log(fillterbody)
        }
        console.log(fillterbody)

      }
    } else if (this.Fixed === false) {
      // Float

      if (this.PokerPayoutTableForm.value.PayoutTableName === '' || this.PokerPayoutTableForm.value.PayoutTableName === null) {
        this.payoutTableErrorUpTextBoolValue = true;
        this.errorPopup = "Field 'Payout Table Name' can't be empty";
      } else if (this.ParticipantsRangesIndexsFilterd.length > 0) {
        this.errorPopup = '';
        this.payoutTableErrorUpTextBoolValue = true;
        for (let s = 0; s < this.ParticipantsRangesIndexsFilterd.length; s++) {
          this.errorPopup += `Total value must be equals 100% in column ${this.ParticipantsRangesIndexsFilterd[s].from} - ${this.ParticipantsRangesIndexsFilterd[s].to == -1 ? 'andmore' : this.ParticipantsRangesIndexsFilterd[s].to} \n`;
        }
        // for (let s = 0; s < this.ParticipantsRangesIndexsFilterd.length; s++) {
        //   if(s==this.ParticipantsRangesIndexsFilterd.length - 1){
        //     this.ParticipantsRangesIndexsFilterd[s].to='and more'
        //   }
        //   this.errorPopup += `Total value must be equals 100% in column ${this.ParticipantsRangesIndexsFilterd[s].from} - ${this.ParticipantsRangesIndexsFilterd[s].to  } \n`;
        // }

        this.payoutTableErrorUpTextBoolValue = true;
      } else {
        this.ParticipantsRanges01[this.ParticipantsRanges01.length - 1] = {
          from: this.ParticipantsRanges01[this.ParticipantsRanges01.length - 1]
            .from,
          to: -1,
        };
        console.log("finalParticipantsRanges01", this.ParticipantsRanges01)
        this.payoutTableErrorUpTextBoolValue = false;
        fillterbody['editable'] = true;
        fillterbody['name'] =
          this.PokerPayoutTableForm.value.PayoutTableName !== null
            ? this.PokerPayoutTableForm.value.PayoutTableName
            : undefined;
        // fillterbody["name"] = "hhh";
        fillterbody['structureType'] = this.PokerPayoutTableForm.value.Type;
        fillterbody['autoRegisterTourney'] =
          this.PokerPayoutTableForm.value.AutoRegisterCheckbox;
        fillterbody['convertToTM'] =
          this.PokerPayoutTableForm.value.RedeemCheckbox;
        fillterbody['percents'] = this.percents;
        (fillterbody['placesIndices'] = this.WinnersRanges01),
          (fillterbody['playersCountIndices'] = this.ParticipantsRanges01);
        // fillterbody["ticketsAsPartOfPrize"]=false;
        fillterbody['ticketsAsPartOfPrize'] = this.PokerPayoutTableForm.value.ticketWithPrize;
        if (this.PokerpayoutData) {
          fillterbody['guid'] = this.PokerpayoutData.guid
        }
        if (this.PokerpayoutData) {
          // alert("api update")
          this.PokergamesService.updatePokerPayoutsStructure(fillterbody).subscribe(data => {
            console.log(data)
            if (data.changedObjectList) {
              this.FilltererrorMessageText = 'Successfully Updated';
              this.CreateSuccessPop = true;
            }
          })
        } else {

          this.PokergamesService.createPokerPayoutsStructure(fillterbody).subscribe((data) => {
            console.log(data);
            if (data.changedObjectList) {
              this.FilltererrorMessageText = 'Successfully Created';
              this.CreateSuccessPop = true;
            }
          },
            (Error) => {
              this.FilltererrorMessageText = 'Technical Error...';
              this.CreateSuccessPop = true;
            }
          );
        }
        console.log(fillterbody)

      }
    }

    // console.log(body)
    // this.PokergamesService.createPokerPayoutsStructure(body).subscribe((data) => console.log(data))
  }

  pokerpayoutstructure12(event: any, data: any) {
    console.log(event.target.value)
    console.log(data)
  }

}
