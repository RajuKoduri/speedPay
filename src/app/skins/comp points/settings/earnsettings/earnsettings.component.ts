import { Component, OnInit,ViewChild } from '@angular/core';
import { ComppointsService } from 'src/app/source/comppoints.service';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { RakeRangesComponent } from 'src/app/skins/pokergames/settings/RakeRanges/RakeRanges.component';
@Component({
  selector: 'app-earnsettings',
  templateUrl: './earnsettings.component.html',
  styleUrls: ['./earnsettings.component.css'],
})
export class EarnsettingsComponent implements OnInit {
  @ViewChild(RakeRangesComponent) RakeRangesComponent: RakeRangesComponent | undefined;
  earnsetting: any;
  earnsettingList: any;
  resdata: any;
  earnpoin: any;
  earncasino: any = [];
  earnpoker: any = [];
  pokersitandgo: any = [];
  earnpokertournament: any = [];
  RemoteClubGames: any = [];
  RemoteCasinoGames: any = [];
  shoecasino: boolean = true;
  shoepoker: boolean = true;
  shoetour: boolean = true;
  showstandgo: boolean = true;
  showclub: boolean = true;
  remotecasino: boolean = true;
  GamesList: any = [];
  newarray: any;
  Groupgames: any = [];
  tabletypegroup: boolean = true;
  PointsstructureList: boolean = false;
  POkerGameTypesList: any;
  PokerTableSeats: any;
  pokerGameTypes: any;
  POintStucutures: any;
  MainPOintStructureList: any;
  seatsfilters: any;
  filterForm: FormGroup;
  limitsfilters: any;
  gametypes: any;
  pointstIndex: any;
  backgroundcolor_id: any;
  movebtnup: boolean = true
  movebtndown: boolean = false
  SeatsLimitsGames:boolean = false
  RemoteAllGames: any;
  GamesAllProvider: any =[]
  // checkedList: any;
  checkedList: boolean[][] = [];
  RemotegameserList: any;
  ParticipantsPopup: boolean = false
  ar_lables1:any = [];
  ar_lables: any = [];
  selectedRowIndex: number = 0;
  from: number = 2;
  to: number = 3;
  ErrorPopup: boolean = false
  errorMessageText: any;
  from_value: number = 2;
  last_index: any;
  Deletebtn:boolean= false
  remoteCasinoClub:boolean= false
  pointpayloads: any;
  indexvalue: any;
  StakesRangevalues: any;
  constructor(private comppointsService: ComppointsService) {
    this.filterForm = new FormGroup({
      pointstuctureName: new FormControl(''),
      minblind:new FormControl(0),
      maxblind:new FormControl(0)
    });
  }
  isCasinoOpen: boolean[] = this.Groupgames.map(() => false);
  // tabletypegroup: boolean = false;
  // remotecasino: boolean = false;

  ngOnInit(): void {
    this.earnsetting = localStorage.getItem('DYIDGAMEGROUPTYPE');
    this.earnsettingList = JSON.parse(this.earnsetting);
    console.log(this.earnsettingList);
    let Data = {};
    this.comppointsService.earnpoints(Data)
      .subscribe((data) => this.Earnpoints(data));
    let PokerGametype: any = localStorage.getItem('GamesConfig');
    this.POkerGameTypesList = JSON.parse(PokerGametype).gameTypes;
    console.log(this.POkerGameTypesList);
    let PokerTableSeatsjson: any = localStorage.getItem('pokerTableSeats');
    this.PokerTableSeats = JSON.parse(PokerTableSeatsjson);
    console.log(this.PokerTableSeats);
    
    let pokerGameTypesjson: any = localStorage.getItem('pokerGameTypes');
    this.pokerGameTypes = JSON.parse(pokerGameTypesjson);
    console.log(this.pokerGameTypes);

    this.RemoteAllGames = JSON.parse(PokerGametype).remoteSystemGames
    console.log("GamesAllProvider", this.RemoteAllGames)
    this.RemoteAllGames.forEach((provider:any,i:any) => {
      provider.games.forEach((game:any,j:any) =>{
        game["ischecked"] = false
        this.GamesAllProvider.push(game)
      })
    })
    console.log( this.GamesAllProvider)

    // this.ar_lables = [
    //   {
    //     from_value: 0.001,
    //     to_value: 0.1,
    //   },
    //   {
    //     from_value: 2,
    //     to_value: 3,
    //   },
    // ];

   


  }
  Earnpoints(data: any) {
    console.log(data);
    this.earnpoin = data.objectList;
    console.log(this.earnpoin);

    for (let i = 0; i < this.earnpoin.length; i++) {
      for (let m = 0; m < this.earnsettingList.length; m++) {
        if (
          this.earnpoin[i].gameGroupType.lowLong ==
          this.earnsettingList[m].guid.lowLong
        ) {
          // this.earnpoin[i].gameGroupType = this.earnsettingList[m].value

          this.GamesList.push(this.earnpoin[i]);
        }
      }
    
    }
    this.groupByGameGroupType(this.GamesList);
  }

  groupByGameGroupType(games: any) {

    const groupedGames: any = {};
    for (let i = 0; i < games.length; i++) {
      const game = games[i];
      const key = `${game.gameGroupType.lowLong}`;
      if (!groupedGames[key]) {
        groupedGames[key] = [];
      }
      groupedGames[key].push(game);
    }
    this.newarray = groupedGames;
    console.log(this.newarray);
    for (let m = 0; m < this.earnsettingList.length; m++) {
      if (this.newarray[this.earnsettingList[m].guid.lowLong]) {
        this.Groupgames.push(this.newarray[this.earnsettingList[m].guid.lowLong]);
        let gamevalue = this.newarray[this.earnsettingList[m].guid.lowLong];
        for (let j = 0; j < gamevalue.length; j++) {
          gamevalue.gamename = this.earnsettingList[m].value;
        }
      }
    }
    // this.earnsettingList.forEach((gamelist:any,m:any)=>{
    //   if (this.newarray[gamelist.guid.lowLong]) {
    //     this.Groupgames.push(this.newarray[gamelist.guid.lowLong]);
    //     let gamevalue = this.newarray[gamelist.guid.lowLong];
    //     gamevalue.forEach((newGameList:any)=>{
    //       newGameList.gamename = gamelist.value;
    //     })
    //   }
    // })

    console.log(this.Groupgames);
  }

  casinoGame() {
    this.shoecasino = !this.shoecasino;
  }
  pokerGame() {
    this.shoepoker = !this.shoepoker;
  }
  Tournaments() {
    this.shoetour = !this.shoetour;
  }
  sitandgopoker() {
    this.showstandgo = !this.showstandgo;
  }
  RemoteClub() {
    this.showclub = !this.showclub;
  }
  RemoteCasino() {
    this.remotecasino = !this.remotecasino;
  }

  
  toggleCasino(index: number) {
    this.isCasinoOpen[index] = !this.isCasinoOpen[index];
  }

  gamefilterchange(event: any) {
    console.log(event);
    console.log(event.target.value);
    if (event.target.value == 'Group') {
      this.tabletypegroup = false;
    } else {
      this.tabletypegroup = true;
    }
  }
  viewpop(gamelist: any, sublist: any, i: any, j: any) {
    let Data = sublist.gameGroupType;
    this.comppointsService.getcomppointearnsettings(Data).subscribe((data) => this.getcompointsres(data));
  }
  getcompointsres(data: any) { 
    if (data?.objectList) {
      this.PointsstructureList = true;
      console.log(data.objectList);
      this.pointpayloads = data.objectList[0];

      this.POintStucutures = data.objectList[0].structures;
      
      if(!this.POintStucutures[0].defaultStructure){
        if(this.POintStucutures[0].filter[0]?.gameTypes || this.POintStucutures[0].filter[0]?.pokerGameTypes){
          this.pokerGamesListType()
        }else{
          this.RemoteCasinoGamesType()
        }    
      }else{
        if(this.POintStucutures[1]?.filter[0]?.gameTypes || this.POintStucutures[1].filter[0]?.pokerGameTypes){
          this.pokerGamesListType()
        }else{
         this.RemoteCasinoGamesType()
        } 
      }
    }
  }
  pokerGamesListType(){ 
    this.SeatsLimitsGames = true
    for (let i = 0; i < this.PokerTableSeats.length; i++) {
      const FormControlName = this.PokerTableSeats[i].value;
      const FormControlValue = false;
      this.filterForm.addControl(FormControlName,new FormControl(FormControlValue));
    }

    for (let i = 0; i < this.pokerGameTypes.length; i++) {
      const FormControlName = this.pokerGameTypes[i].value;
      const FormControlValue = false;
      this.filterForm.addControl(FormControlName,new FormControl(FormControlValue));
    }
    for(let i=0; i< this.POkerGameTypesList.length; i++) {
      this.POkerGameTypesList[i]["ischecked"] = false
    } 
    console.log(this.POkerGameTypesList)
    console.log(this.POintStucutures)

    this.typechange(this.POintStucutures[0],0)
    }
 RemoteCasinoGamesType(){
    this.SeatsLimitsGames = false
    this.typechange(this.POintStucutures[0],0)
    
    // this.checkedList =  Array(this.GamesAllProvider.length).fill(false);
    // console.log(this.checkedList)
 }

  closepointpop() {
    this.PointsstructureList = false;
    this.ar_lables = []
    console.log(this.ar_lables)
  }
  typechange(data: any, index: any) {
    this.ar_lables = []
    this.indexvalue = index
    console.log("GamesListssss",data) 
    let stakes = data.stakes
    console.log(stakes[0])
    console.log(stakes.length)
    console.log(JSON.stringify(this.ar_lables))
    if(stakes.length > 1){
      stakes.forEach((value:any,index:any) => {
        let obj = {
          from_value: value.high,
          to_value: 1 + index,
          comp_point:value.low
        }
        console.log(obj)
        this.ar_lables.push(obj)
      })
      console.log("Above 1",this.ar_lables)
    }else{
      this.ar_lables = [   
        {
          from_value: data.stakes[0].high,
          to_value: 1,
          comp_point: data.stakes[0].low
        }
      ];
      console.log("below 1",this.ar_lables)
    }
    
    // this.ar_lables = [   
    //   {
    //     from_value: data.stakes[0].high,
    //     to_value: 1,
    //     comp_point: data.stakes[0].low
    //   },
    //   {
    
    //     from_value: 2,
    //     to_value: 3,
    //     comp_point: ""
    //   }
    // ];
    this.ar_lables1 =   JSON.parse(JSON.stringify(this.ar_lables))
   if(data.defaultStructure){
    this.Deletebtn = true
    let disalbedsection = document.getElementById("divSection")
        disalbedsection?.classList.add('disabled-div')
    if(this.POintStucutures[1]?.filter[0]?.gameTypes || this.POintStucutures[1].filter[0]?.pokerGameTypes){
      this.POkerTypechgange(data, index)
    }else{
      this.remoteTypechange(data, index)
    } 
     }else{
      this.Deletebtn = false
      let disalbedsection = document.getElementById("divSection")
      disalbedsection?.classList.remove('disabled-div')
      if(this.POintStucutures[0].filter[0]?.gameTypes || this.POintStucutures[0].filter[0]?.pokerGameTypes){
        this.POkerTypechgange(data, index)
      }else{
        this.remoteTypechange(data, index)
      }   
     }
    let mydocument12
    if(this.backgroundcolor_id){
      console.log("final",this.backgroundcolor_id)
     mydocument12 = document.getElementById(this.backgroundcolor_id)
     mydocument12?.classList.remove('active_p')
    }
     mydocument12 = document.getElementById(data.name + index)
    mydocument12?.classList.add('active_p')

    this.backgroundcolor_id= data.name + index
    
  console.log( this.backgroundcolor_id);
  console.log(index);
  this.pointstIndex = index

  this.filterForm.patchValue({
    pointstuctureName :data.name
  })
    if(this.pointstIndex == 0){
        this.movebtnup = true
    }else{
      this.movebtnup = false
    }
  }
  POkerTypechgange(data: any, index: any){
    for(let i=0;i < this.PokerTableSeats.length; i++) {
      this.filterForm.patchValue({
        [this.PokerTableSeats[i].value] : false
      })
  }
  for(let i=0;i < this.pokerGameTypes.length; i++) {``
      this.filterForm.patchValue({
        [this.pokerGameTypes[i].value] : false
      })
  }
  for(let i=0; i< this.POkerGameTypesList.length; i++) {
    this.POkerGameTypesList[i]["ischecked"] = false
  } 

  console.log(data);
  this.MainPOintStructureList = data;
  this.seatsfilters = this.MainPOintStructureList.filter[0].seats;
  this.limitsfilters =  this.MainPOintStructureList.filter[0].pokerGameTypes;
  this.gametypes =  this.MainPOintStructureList.filter[0].gameTypes;
  console.log(this.seatsfilters);
    this.filterForm.patchValue({
      minblind:this.MainPOintStructureList.filter[0].fromStake,
      maxblind:this.MainPOintStructureList.filter[0].toStake,
      pointstuctureName : this.MainPOintStructureList.name
    })

  for (let j = 0; j < this.seatsfilters.length; j++) {
    for(let i=0;i < this.PokerTableSeats.length; i++) {
      if (this.seatsfilters[j].lowLong == this.PokerTableSeats[i].guid.lowLong) {
        this.filterForm.patchValue({
          [this.PokerTableSeats[i].value] : true
        })
      }
    }
  }
  for (let j = 0; j < this.limitsfilters.length; j++) {
    for(let i=0;i < this.pokerGameTypes.length; i++) {
      if (this.limitsfilters[j].lowLong == this.pokerGameTypes[i].guid.lowLong) {
        this.filterForm.patchValue({
          [this.pokerGameTypes[i].value] : true
        })
      }
    }
  }
  for(let j=0;j<this.gametypes.length;j++){
    for(let i=0;i<this.POkerGameTypesList.length;i++){
      if(this.gametypes[j].lowLong == this.POkerGameTypesList[i].guid.lowLong){
        this.POkerGameTypesList[i].ischecked = true
      }
    }
  }
  // let arrayvalues:any=[]
  // for(let i=0;i < this.PokerTableSeats.length; i++) {
  //   if (this.filterForm.value[this.PokerTableSeats[i].value] == true) {
  //     arrayvalues.push(this.PokerTableSeats[i].guid)
  //   }
  // }

  }
  remoteTypechange(data: any, index: any){
    if(data.name == "Remote Club Games"){
      // this.GamesAllProvider = []
      this.remoteCasinoClub = true
    }else{
      this.remoteCasinoClub = false
      this.GamesAllProvider.forEach((everygame:any)=>{
        everygame["ischecked"] = false
      })
      console.log(data)
      console.log(index)
      this.RemotegameserList =  data.filter[0].gameIds
  
      this.RemotegameserList.forEach((regame:any,i:any) => {
        this.GamesAllProvider.forEach((subgame:any,j:any)=>{
          if(regame.hiLong == subgame.guid.hiLong){
            if(regame.lowLong == subgame.guid.lowLong){
              subgame.ischecked = true
            }
          }
        })
      });
    }
    console.log(this.GamesAllProvider)
  }
  pokertablevalue() {
    
let SeatsAr:any = []
let pokerAr:any = []
let PokerRemAr:any = []

this.PokerTableSeats.forEach((Seats:any)=>{
  if(this.filterForm.value[Seats.value]) {
    SeatsAr.push(Seats.guid)
    }
})
this.pokerGameTypes.forEach((Type:any)=>{
  if(this.filterForm.value[Type.value]) {
    pokerAr.push(Type.guid)
    }
})
this.POkerGameTypesList.forEach((Games:any)=>{
  if(Games.ischecked) {
    PokerRemAr.push(Games.guid)
    }
})
console.log(this.pointstIndex)
console.log(this.indexvalue)

if(this.POintStucutures[this.indexvalue].filter[0].fromStake) {
    this.POintStucutures[this.indexvalue].filter[0].fromStake = this.filterForm.value.minblind
  }
this.POintStucutures[this.indexvalue].filter[0].gameTypes = PokerRemAr
this.POintStucutures[this.indexvalue].filter[0].pokerGameTypes = pokerAr
this.POintStucutures[this.indexvalue].filter[0].seats = SeatsAr
this.POintStucutures[this.indexvalue].filter[0].toStake?this.filterForm.value.maxblind:null
console.log("Finalstage",this.POintStucutures[this.pointstIndex])

  }
  gamespokertype() {
    console.log(this.POkerGameTypesList)
    
  }
  remotecheckgmes( i: any, data: any) {
    let AllRemoteGames:any = []
    console.log(this.GamesAllProvider[i])
    this.GamesAllProvider.forEach((Games:any)=>{
      if(Games.ischecked) {
        AllRemoteGames.push(Games.guid)
      }
    })
    console.log(AllRemoteGames)
    this.POintStucutures[this.indexvalue].filter[0].gameIds = AllRemoteGames
    console.log(this.POintStucutures[this.indexvalue])
  }
  positionchange(data:any){
    
    let index = this.pointstIndex
  if(data == "up"){  
    if (index > 0) {
      const temp = this.POintStucutures[index - 1];
      this.POintStucutures[index - 1] = this.POintStucutures[index];
      this.POintStucutures[index] = temp;
     this.pointstIndex = this.pointstIndex - 1

     this.backgroundcolor_id = this.POintStucutures[this.pointstIndex].name + this.pointstIndex
     console.log(this.POintStucutures[this.pointstIndex].name + this.pointstIndex)
    }
    if(this.pointstIndex == 0){
      this.movebtnup = true
    }else{
       this.movebtnup = false
    }
  if( (this.POintStucutures.length)-1 == this.pointstIndex){
    this.movebtndown = true
  }else{
    this.movebtndown = false
  }
  }else if(data == "Down"){
    if (index < this.POintStucutures.length - 1) {
      const temp = this.POintStucutures[index + 1];
      this.POintStucutures[index + 1] = this.POintStucutures[index];
      this.POintStucutures[index] = temp;
      this.pointstIndex = this.pointstIndex + 1
      
      this.backgroundcolor_id = this.POintStucutures[this.pointstIndex].name + this.pointstIndex
      console.log(this.POintStucutures[this.pointstIndex].name + this.pointstIndex)
    }
   
    if(this.pointstIndex == 0){
      this.movebtnup = true
  }else{
    this.movebtnup = false
  }
  if( (this.POintStucutures.length)-1  == this.pointstIndex){
    this.movebtndown = true
  }else{
    this.movebtndown = false
  }
  }
console.log(this.POintStucutures[index])
console.log(this.POintStucutures)
console.log(this.pointstIndex)

  }
newpointList(){
  let newpointdata:any =[]
    if(this.POintStucutures[0].filter[0]?.gameTypes || this.POintStucutures[0].filter[0]?.pokerGameTypes){
      newpointdata = [{
        "defaultStructure": false,
        "filter": [
            {
                "fromStake": 0.02,
                "gameTypes": [
                    {
                        "hiLong": 0,
                        "lowLong": 16
                    },
                    {
                        "hiLong": 0,
                        "lowLong": 19
                    },
                    {
                        "hiLong": 0,
                        "lowLong": 20
                    },
                    {
                        "hiLong": 0,
                        "lowLong": 21
                    },
                    {
                        "hiLong": 0,
                        "lowLong": 37
                    },
                    {
                        "hiLong": 0,
                        "lowLong": 22
                    },
                    {
                        "hiLong": 0,
                        "lowLong": 38
                    },
                    {
                        "hiLong": 0,
                        "lowLong": 23
                    },
                    {
                        "hiLong": 0,
                        "lowLong": 200
                    },
                    {
                        "hiLong": 0,
                        "lowLong": 9
                    },
                    {
                        "hiLong": 0,
                        "lowLong": 201
                    }
                ],
                "pokerGameTypes": [
                    {
                        "hiLong": 0,
                        "lowLong": 0
                    },
                    {
                        "hiLong": 0,
                        "lowLong": 1
                    },
                    {
                        "hiLong": 0,
                        "lowLong": 2
                    }
                ],
                "seats": [
                    {
                        "hiLong": 0,
                        "lowLong": 0
                    },
                    {
                        "hiLong": 0,
                        "lowLong": 1
                    },
                    {
                        "hiLong": 0,
                        "lowLong": 2
                    }
                ],
                "toStake": 1000
            }
        ],
        "name": "New point structure" + this.POintStucutures.length,
        "stakes": [
            {
                "high": 0.01,
                "low": 0.3
            }
        ], 
        "structureType": {
            "hiLong": 0,
            "lowLong": 0
        }
    }]

    }else{
      for(var i =0;i< this.POintStucutures.length;i++){
        if(this.POintStucutures[i].defaultStructure == true){
          // this.POintStucutures[i].name =  "New point structure" + this.POintStucutures.length
          newpointdata.push( this.POintStucutures[i])
          break
        }
      }
 
    }    
  
    console.log(this.POintStucutures)
  this.POintStucutures = [...this.POintStucutures, ...newpointdata]
console.log("New ",this.POintStucutures)
  }


  deletepointList(){
    console.log(this.POintStucutures)
    console.log(this.pointstIndex)
    this.POintStucutures.splice(this.pointstIndex,1)
    console.log(this.POintStucutures)
    this.typechange(this.POintStucutures[0],0)
  }
  EditRakeStructure(){
    this.ParticipantsPopup = true
    // if( this.RakeRangesComponent ){
    //   this.RakeRangesComponent.OpenRakerangespop()
    //   alert("ViewChild")
    // }
  }
  ParticipantsPopClose(){
    this.ParticipantsPopup = false
  }
  
  ParticipantsRangesPopClose(){
   this.ar_lables1  =JSON.parse(JSON.stringify(this.ar_lables)) 
   this.ParticipantsPopup = false
   console.log( this.ar_lables)
   let stakevalue:any = []
    this.ar_lables1.forEach((items:any)=> {
      let obj = {
        "high" :items.from_value ,
        "low" : items.comp_point
      }
      stakevalue.push(obj)
    })
    console.log(stakevalue)
    this.StakesRangevalues = stakevalue
    console.log(this.POintStucutures[this.indexvalue])
    this.POintStucutures[this.indexvalue].stakes =  this.StakesRangevalues
  }
  RakeRangePOints(){
    console.log(this.ar_lables1)
    this.ar_lables = JSON.parse(JSON.stringify(this.ar_lables1))
    let stakevalue:any = []
    this.ar_lables1.forEach((items:any)=> {
      let obj = {
        "high" :items.from_value ,
        "low" : items.comp_point
      }
      stakevalue.push(obj)
    })
    console.log(stakevalue)
    this.StakesRangevalues = stakevalue
    this.POintStucutures[this.indexvalue].stakes =  this.StakesRangevalues
  }
  TechnicalError(){
    this.ErrorPopup = false
  }

  row_select(index: any) {
    console.log('row_select  :  ', index);
    this.selectedRowIndex = index;
    console.log('ar_lables :  ', this.ar_lables);

    this.from = this.ar_lables[index]['from_value'];
    this.to = this.ar_lables[index]['to_value'];
  }

  save(custom_to_value: number, from_value: number) {
    this.last_index = this.ar_lables.length;
    console.log("to_value", typeof custom_to_value, "from_value", from_value);
    console.log(this.ar_lables.length)
    console.log(this.selectedRowIndex)

    for (let i = this.selectedRowIndex + 1; i <= this.selectedRowIndex + 1; i++) {
      console.log(this.ar_lables[i])

      console.log(custom_to_value >= this.ar_lables[i].to_value)
      console.log(custom_to_value <= this.ar_lables[i].to_value)
      console.log(this.ar_lables.length);
      console.log(this.ar_lables[this.ar_lables.length - 1].to_value);

      if (custom_to_value >= this.ar_lables[i].to_value && this.selectedRowIndex != this.ar_lables.length - 2) {
        // if (custom_to_value > this.ar_lables[i].from_value) {
        this.ErrorPopup = true;
        // alert("to value can not be greater than or equal to next range to value")
        // alert("Current range 'To' value can't be more or equals next range 'To' value");
        this.errorMessageText = "Current range 'To' value can't be more or equals next range 'To' value";
        return;
      }
      if (from_value > this.ar_lables[this.selectedRowIndex].from_value) {
        // alert("Current range 'To' value can't be less Current  range 'From' value");
        this.ErrorPopup = true;
        this.errorMessageText = "Current range 'To' value can't be less Current  range 'From' value";
        return;
      }
      if (from_value >= custom_to_value) {
        this.ErrorPopup = true;
        this.errorMessageText =
          "Current range 'To' value can't be less Current  range 'From' value";
        return;
      } else {
        //earlier working code
        this.from_value = parseInt(
          this.ar_lables[this.selectedRowIndex]['from_value']
        );
        //let next_item_to_value = (this.from_value + (custom_to_value - this.from_value))
        let sel_item = {
          from_value: this.from_value,
          to_value: custom_to_value,
        };
        this.ar_lables[this.selectedRowIndex] = sel_item;
        console.log(this.ar_lables[this.selectedRowIndex]);
        custom_to_value = custom_to_value + 1;
        if (this.selectedRowIndex + 1 == this.last_index) {
          this.ar_lables[this.last_index] = {
            from_value: custom_to_value,
            to_value: this.ar_lables[this.last_index].to_value,
          };
        } else if (this.selectedRowIndex + 1 < this.last_index) {
          this.ar_lables[this.selectedRowIndex + 1] = {
            from_value: custom_to_value,
            to_value: this.ar_lables[this.selectedRowIndex + 1].to_value,
          };
        }

        for (let i = this.selectedRowIndex; i < this.ar_lables.length; i++) {
          console.log('index ->' + i + '-->' + this.ar_lables[i]['from_value'] + '-' + this.ar_lables[i]['to_value']);
        }

        this.last_index = this.ar_lables.length - 1;
      }
    }
  } 
  newRangesAdd() {
    console.clear();
    console.log(this.ar_lables)
    console.log(this.selectedRowIndex)
    console.log(this.ar_lables.length)
    if(this.selectedRowIndex == this.ar_lables.length ){
      this.to =  this.ar_lables[this.selectedRowIndex]['from_value'] 
  
    }
    // if(this.selectedRowIndex == this.ar_lables.length -1){
    //   this.to =  this.ar_lables[this.selectedRowIndex]['from_value'] + 1
  
    // }
    this.selectedRowIndex = 0;
    console.log(this.selectedRowIndex);
    console.log(this.ar_lables);
    let next_item_from_value = 0;
    if (this.selectedRowIndex == 0) {
      console.log(this.ar_lables);
      this.ar_lables[this.ar_lables.length - 1].to_value = this.ar_lables[this.ar_lables.length - 1].from_value + 1
      if (this.ar_lables.length === 1) {
        console.log(next_item_from_value)
        next_item_from_value = 1;
        // next_item_from_value = 4;
      } else {
        console.log(this.ar_lables.length)
        console.log(this.ar_lables)
        next_item_from_value = this.ar_lables[this.ar_lables.length - 1].from_value + 1;
        // next_item_from_value = this.ar_lables[this.ar_lables.length - 1].from_value + 2;
        console.log(next_item_from_value)
      }
      let next_item = {
        from_value: next_item_from_value,
        to_value: next_item_from_value + 1,
        comp_point: ""
      };
      console.log(next_item)
      this.ar_lables.push(next_item);
      this.ar_lables[this.ar_lables.length - 1].to_value = - 1;
    }
  }
  deleteRanges(x: any) {
    //this.selectedRowIndex
    console.log('delete');
    console.log(this.ar_lables);
    // this.selectedRowIndex =x
    let fromVal = this.ar_lables[this.selectedRowIndex]['from_value'];
    let toVal = this.ar_lables[this.selectedRowIndex + 1]['to_value'];
    console.log(this.selectedRowIndex);
    console.log(fromVal);
    console.log(toVal);
    this.ar_lables.splice(this.selectedRowIndex, 1);
    this.ar_lables[this.selectedRowIndex]['from_value'] = fromVal;
    if (this.ar_lables.length == 1) {
      this.ar_lables[this.selectedRowIndex]['to_value'] = 3;
      this.to = 3
    } else {
      this.ar_lables[this.selectedRowIndex]['to_value'] = toVal;
    }
    console.log(this.ar_lables);
    
  }
  minbigblind(event:any){
    console.log(event.target.checked);
    if(event.target.checked){
      this.filterForm.controls['minblind'].enable();
    }else{
      this.filterForm.controls['minblind'].disable();
    }
  }
  maxbigblind(event:any){
    console.log(event.target.checked);
    if(event.target.checked){
      this.filterForm.controls['maxblind'].enable();
    }else{
      this.filterForm.controls['maxblind'].disable();
    }
  }

  Submit(){

   console.log(this.ar_lables1)
  delete this.pointpayloads.guid;
  this.pointpayloads.structures = this.POintStucutures
  console.log(this.pointpayloads)
  console.log(this.POintStucutures)
  
  this.comppointsService.setCompPointsSettingApi(this.pointpayloads).subscribe((res:any)=>{
    console.log(res)
  })
}
}
