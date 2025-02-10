import { error } from '@angular/compiler/src/util';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import * as moment from 'moment';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { LoginService } from 'src/app/source/login.service';
import { PromotionalServiceService } from 'src/app/source/promotional-service.service';
@Component({
  selector: 'app-addpromotionalcode',
  templateUrl: './addpromotionalcode.component.html',
  styleUrls: ['./addpromotionalcode.component.css']
})
export class AddpromotionalcodeComponent implements OnInit {

  @Input() agentinfo: any
  @Input() userType: any
  @Input() EditInfo: any
  @Output() notifyParent = new EventEmitter;

  addpromotionalcodeForm: FormGroup
  SpinnwerT: boolean = false;
  UserLogin: any;
  usertypeList: any;
  filterUserTypes: any = []
  selectedUserTypes: any;
  currencyselect: any;
  selectinput: any;
  AgentName: any;
  updateleav: any = [];
  paymentsystems: any;
  facepara: any;
  checkAgentA: any;
  findData: any;
  Agentguid: any;
  selectedPermissionGroup: any = [];
  submitted = false;
  permissionDropdownSettings: any = {}
  selectedPlayerPermission: any = []
  allowedFacacesDropdownSettings: any = {}
  selectedAllowedFaces: any = []
  playerCpLevelDropdownSettings: any = {}
  selectedplayerCpLevel: any = []
  allowedPaymentDropdownSettings: any = {}
  selectedAllowedPayment: any = []
  loginNames: any = [];
  updateloginNames: any = [];
  uniqueLoginNames: any[] = [];
  minDate: any;
  selectedDate: any;
  generatedString: any;
  userNotFound: string = '';
  referType: any;
  isSearching: boolean = false;
  PromocodeRewardList: any;
  selectedDepositeType: any;

  controlsToToggle: any = {
    newplayers: ["flatAmount", "referPlayerTo", "upgradeCpLevel", "maxUsage", "expirationDate", "allowedFaces", 'playerPermission',],
    existingTogether: ["flatAmount", "percentOfDeposit", "upgradeCpLevel", "maxUsage", "expirationDate", "allowedFaces", "maxUsagePerPlayer",
      "allowedPayment", "playerPermission", "specificUsers", "playerCpLevel",],
    existingStandalone: ["flatAmount", "upgradeCpLevel", "maxUsage", "maxUsagePerPlayer", "expirationDate", "allowedFaces", "playerCpLevel",
      "playerPermission", "specificUsers",],
  };
  promoStatusList: any;
  PromoCodeUsageTypeList: any;
  PromoCodeUsageTypeGuid: any;
  promoStatusListGuid: any;
  flatAmountObj: any = [];
  selectedWalletGuid: any;
  selFlatAmountTypeGuid: any;
  selFlatAmountType: any = []
  referFullName: any;
  alertMsg: string = '';

  constructor(private AgentControlService: AgentControlService, private cdr: ChangeDetectorRef, private loginService: LoginService,
     private PlayerserviceService: PlayerServiceService, private promotionalService: PromotionalServiceService, 
     private router: Router,) {
      this.PromoCodeUsageType()
     
    this.addpromotionalcodeForm = new FormGroup({
      newplayers: new FormControl({ value: true }),
      existingTogether: new FormControl(),
      existingStandalone: new FormControl(),

      flatAmount: new FormControl({ value: false, disabled: true }),
      flatAmountNumber: new FormControl({ value: 0, disabled: true }, [Validators.required]),
      flatAmountDropdown: new FormControl({ value: '', disabled: true }, [Validators.required]),
      percentOfDeposit: new FormControl({ value: false, disabled: true }),
      percentOfDepositNum: new FormControl({ value: 0, disabled: true }, [Validators.required]),
      percentOfDepositDropdown: new FormControl({ value: '', disabled: true }, [Validators.required]),
      upgradeCpLevel: new FormControl({ value: false, disabled: true }),
      upgradeCpLevelDropdown: new FormControl({ value: '', disabled: true }, [Validators.required]),

      referPlayerTo: new FormControl({ value: true, disabled: true }),
      referPlayerDropdown: new FormControl({ value: '', disabled: true }),
      findByloginInp: new FormControl({ value: '', disabled: true }),
      findBtn: new FormControl({ value: '', disabled: true }),

      maxUsage: new FormControl({ value: false, disabled: true }),
      maxUsageNumber: new FormControl({ value: 0, disabled: true }, [Validators.required]),
      maxUsagePerPlayer: new FormControl({ value: false, disabled: true }),
      maxUsagePerPlayerNumber: new FormControl({ value: 0, disabled: true }, [Validators.required]),
      expirationDate: new FormControl({ value: '', disabled: true }),
      calenderDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
      allowedPayment: new FormControl({ value: false, disabled: true }),
      allowedPaymentDropdown: new FormControl({ value: '', disabled: true }, [Validators.required]),
      allowedFaces: new FormControl({ value: false, disabled: true }),
      allowedFacesDropdown: new FormControl({ value: '', disabled: true }, [Validators.required]),
      playerCpLevel: new FormControl({ value: false, disabled: true }),
      playerCpLevelDropdown: new FormControl({ value: '', disabled: true }, [Validators.required]),
      playerPermission: new FormControl({ value: false, disabled: true }),
      playerPermissionDropdown: new FormControl({ value: '', disabled: true }, [Validators.required]),
      specificUsers: new FormControl({ value: false, disabled: true }),
      specificUsersInp: new FormControl({ value: '', disabled: true }),

      promoCode: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20),]),
      Promo: new FormArray(this.PromoCodeUsageTypeList?.map(() => new FormControl(false))),  
    })
    let todayDate = new Date()
    const yyyy = todayDate.getFullYear()
    const mm = String(todayDate.getMonth() + 1).padStart(2, '0');
    const dd = String(todayDate.getDate()).padStart(2, '0');
    this.minDate = `${yyyy}-${mm}-${dd}`;

    // this.today = moment(new Date()).format('YYYY-MM-DD');
    console.log(this.minDate)
    console.log(this.selectedDate)

  }

  ngOnInit(): void {
    this.userType = this.userType ? this.userType : "Player"
    console.log(this.EditInfo)

    console.log(this.userType, this.agentinfo)
    console.log(this.f['flatAmount'].value)
    this.initializeValueChangeSubscriptions();
    this.updateControlStates()
   
    this.usertype()
    if (this.agentinfo && this.agentinfo.agent) {

      this.AgentName = this.agentinfo.agent.login
      this.Agentguid = this.agentinfo.agent.guid
      this.referFullName = `${this.agentinfo.agent.firstName} ${this.agentinfo.agent.lastName}`
      this.selectinput = this.AgentName
    }

    this.loginService.getPlayers(sessionStorage.getItem("wsession")).subscribe((data: any) => this.getPlayerLevelsNames(data))

    // this.AgentControlService.listUserPermissionsGroup().subscribe((data:any) => this.userspermissiongroup(data)) 
    this.PAYMENTSYSTEMS()
    this.faceParameters()
    this.Agentguids()
    this.agentinfo && this.getUserByLoginfind()
    this.PromocodeRewardTypes()
   
    this.PromotionalStatus()

    // this.addpromotionalcodeForm.patchValue({
    //   existingTogether: this.agentinfo ? false : true,
    //   existingStandalone: this.agentinfo ? false : true,
    //   referPlayerTo: this.agentinfo ? true : false
    // })

    this.selectedDate = new Date().toISOString().substring(0, 10)

  }

  ngAfterViewInit() {
    if (this.EditInfo) {
      this.AgentName = this.EditInfo.creator.login
      this.Agentguid = this.EditInfo.creator.guid
      this.referFullName = this.EditInfo.creator.fullName
      this.selectinput = this.EditInfo.referrer.login
      this.generatedString = this.EditInfo.name

      this.PromoCodeUsageTypeList.forEach((list:any, i:any)=>{
        list.isChecked = false;
        this.EditInfo.usageType.forEach((promo:any)=>{
          if(list.guid.lowLong == promo.lowLong){
            console.log(list.guid.lowLong)
            list.isChecked = true;
          }
         
        })
      })

      this.getUserByLoginfind()
      this.EditRewards()
      this.EditLimits()
      this.cdr.detectChanges();
    }
  }

  EditRewards() {
    this.flatAmountObj.forEach((list: any) => {
      if (this.EditInfo?.reward?.flatAmount?.wallet?.lowLong == list.wallet.lowLong && this.EditInfo.reward.depositPercentType.lowLong == list.guid.lowLong) {
        this.selFlatAmountType = list
      }
    })

    this.PromocodeRewardList.forEach((data: any) => {
      if (data.guid.lowLong == this.EditInfo.reward?.depositPercentType?.lowLong) {
        this.selectedDepositeType = data.guid
      }
    })

    this.addpromotionalcodeForm.patchValue({
      flatAmountNumber: this.EditInfo?.reward?.flatAmount?.value,
      percentOfDepositNum: this.EditInfo?.reward?.depositPercent,
      flatAmount: this.EditInfo.reward?.flatAmount?.value ? true : false,
      percentOfDeposit: this.EditInfo.reward?.depositPercent ? true : false,
      upgradeCpLevel: this.currencyselect ? true : false,
      referPlayerTo: this.addpromotionalcodeForm.controls['referPlayerDropdown'].value ? true : false,
    })
  }

  EditLimits() {
    // this.selectedAllowedFaces = this.EditInfo.limits.allowedFaces?.map((data: any) => { return data })
    this.selectedAllowedFaces = this.facepara.filter((list:any)=>
      this.EditInfo.limits.allowedFaces?.find((face:any)=>list.name == face))
    console.log(this.selectedAllowedFaces)

    // let expirationDate = this.EditInfo.limits.expirationDate.slice(0, -19)
    let expirationDate = this.EditInfo.limits?.expirationDate?.slice(0, -6)
    this.selectedDate = moment(new Date(expirationDate)).format('YYYY-MM-DD')
    // this.selectedDate = expirationDate
    if(!expirationDate){
      this.selectedDate = new Date().toISOString().substring(0, 10)
    }
    console.log(expirationDate)

    this.selectedAllowedPayment = this.paymentsystems.filter((list: any) =>
      this.EditInfo.limits.allowedPaymentSystem?.find((system: any) => list.guid.lowLong == system.lowLong))

    setTimeout(() => {
      this.selectedPlayerPermission = this.selectedPermissionGroup.filter((list: any) =>
        this.EditInfo?.limits?.requiredPermissionsGroup?.find((permission: any) => list.guid.lowLong == permission.lowLong))
      console.log(this.selectedPlayerPermission)
      this.addpromotionalcodeForm.patchValue({
        playerPermission: this.selectedPlayerPermission.length > 0 ? true : false,
      })
      this.cdr.detectChanges();
    }, 1000);

    this.addpromotionalcodeForm.patchValue({
      maxUsageNumber: this.EditInfo.limits.maxUsageNumber,
      maxUsagePerPlayerNumber: this.EditInfo.limits.maxUsageNumberPerUser,
      maxUsage: this.EditInfo.limits.maxUsageNumber ? true : false,
      maxUsagePerPlayer: this.EditInfo.limits.maxUsageNumberPerUser ? true : false,
      expirationDate: this.selectedDate ? true : false,
      allowedPayment: this.selectedAllowedPayment.length > 0 ? true : false,
      allowedFaces: this.selectedAllowedFaces.length > 0 ? true : false,
      playerCpLevel: this.selectedplayerCpLevel.length > 0 ? true : false,
      
    })

  }

  popupClose() {
    console.log(window.location.hash)
    console.log(window.location.hash.split("/"))
    if (window.location.hash.split("/")[1] == "Agentexplorer" || window.location.hash.split("/")[1] == "promotinalcodes") {
      this.notifyParent.emit()
    } else {
      this.router.navigate(['/playerslist'])
    }
  }

  get rewardDisabel() {
    return this.addpromotionalcodeForm.controls['percentOfDeposit'].disabled &&
      this.addpromotionalcodeForm.controls['flatAmount'].disabled &&
      this.addpromotionalcodeForm.controls['upgradeCpLevel'].disabled
  }
  get reffering() {
    return this.addpromotionalcodeForm.controls['referPlayerTo'].disabled
  }
  get limits() {
    return this.addpromotionalcodeForm.controls['maxUsage'].disabled &&
      this.addpromotionalcodeForm.controls['maxUsagePerPlayer'].disabled &&
      this.addpromotionalcodeForm.controls['expirationDate'].disabled &&
      this.addpromotionalcodeForm.controls['allowedPayment'].disabled &&
      this.addpromotionalcodeForm.controls['allowedFaces'].disabled &&
      this.addpromotionalcodeForm.controls['playerCpLevel'].disabled &&
      this.addpromotionalcodeForm.controls['playerPermission'].disabled &&
      this.addpromotionalcodeForm.controls['specificUsers'].disabled
  }


  initializeValueChangeSubscriptions() {
    ["newplayers", "existingTogether", "existingStandalone"].forEach((group) => {
      this.addpromotionalcodeForm.get(group)?.valueChanges.subscribe((checked) => {
        this.updateControlStates();
      });
    });

    this.handleDropdownControl("flatAmount", "flatAmountDropdown");
    this.handleDropdownControl("flatAmount", "flatAmountNumber");
    this.handleDropdownControl("percentOfDeposit", "percentOfDepositNum");
    this.handleDropdownControl("percentOfDeposit", "percentOfDepositDropdown");
    this.handleDropdownControl("upgradeCpLevel", "upgradeCpLevelDropdown");
    this.handleDropdownControl("referPlayerTo", "referPlayerDropdown");
    this.handleDropdownControl("referPlayerTo", "findByloginInp");
    this.handleDropdownControl("referPlayerTo", "findBtn");
    this.handleDropdownControl("maxUsage", "maxUsageNumber");
    this.handleDropdownControl("maxUsagePerPlayer", "maxUsagePerPlayerNumber");
    this.handleDropdownControl("expirationDate", "calenderDate");
    this.handleDropdownControl("allowedFaces", "allowedFacesDropdown");
    this.handleDropdownControl("playerCpLevel", "playerCpLevelDropdown");
    this.handleDropdownControl("playerPermission", "playerPermissionDropdown");
    this.handleDropdownControl("specificUsers", "specificUsersInp");
    this.handleDropdownControl("allowedPayment", "allowedPaymentDropdown");
  }

  updateControlStates() {
    const activeGroups = ["newplayers", "existingTogether", "existingStandalone"].filter(
      (group) => this.addpromotionalcodeForm.get(group)?.value
    );

    const activeControls = new Set<string>();
    activeGroups.forEach((group) => {
      this.controlsToToggle[group].forEach((control: any) => activeControls.add(control));
    });

    // Enable or disable controls based on the active groups
    Object.values(this.controlsToToggle).flat().forEach((control: any) => {
      if (activeControls.has(control)) {
        this.addpromotionalcodeForm.get(control)?.enable();
      } else {
        this.addpromotionalcodeForm.get(control)?.disable();
        this.addpromotionalcodeForm.get(control)?.setValue(false);
      }
    });
  }

  handleDropdownControl(controlName: string, dropdownControlName: string) {
    this.addpromotionalcodeForm.get(controlName)?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.addpromotionalcodeForm.get(dropdownControlName)?.enable();

      } else {
        this.addpromotionalcodeForm.get(dropdownControlName)?.disable();
      }
    });
  }

  isButtonDisabled(Btn: any) {
    if (Btn == "findBtn") {
      return !(this.addpromotionalcodeForm.get('referPlayerTo')?.value);
    }
    if (Btn == "addBtn") {
      return !(this.addpromotionalcodeForm.get('specificUsers')?.value);
    }
    return
  }

  get maxUsagePerPlayerNumber() {
    return this.addpromotionalcodeForm.get('maxUsagePerPlayerNumber');
  }
  get maxUsageNumber() {
    return this.addpromotionalcodeForm.get('maxUsageNumber');
  }

  onSubmit() {
    if (this.addpromotionalcodeForm.valid) {
      console.log(this.addpromotionalcodeForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls).forEach(key => {
      // console.log(key)
      let currentControl = form.controls[key];

      if (currentControl.dirty) {
        if (currentControl.controls)
          dirtyValues[key] = this.getDirtyValues(currentControl);
      }
    });
    return dirtyValues;
  }

  onFormSubmit() {
    this.SpinnwerT = true
    this.submitted = true;

    let allowedFaces = this.selectedAllowedFaces.map((name: any) => { return name.name })
    let allowedPaymentSystem = this.selectedAllowedPayment.map((sys: any) => { return sys.guid })
    let requiredPermissionsGroup = this.selectedPlayerPermission.map((grp: any) => { return grp.guid })


    // fillterbody['objState'] = 0
    // fillterbody['limits'] = {
    //   allowedFaces: allowedFaces,
    //   expirationDate:  `${this.selectedDate}T23:59:59.999`,
    //   maxUsageNumber: Number(this.f['maxUsageNumber'].value),
    //   allowedPaymentSystem: allowedPaymentSystem,
    //   maxUsageNumberPerUser: Number(this.f['maxUsagePerPlayerNumber'].value),
    //   requiredPermissionsGroup: requiredPermissionsGroup
    // }
    // fillterbody['name'] = this.generatedString
    // fillterbody["reward"] = {
    //   depositPercent: this.f['percentOfDepositNum'].value,
    //   depositPercentType: this.selectedDepositeType,
    //   flatAmount: { value:  Number(this.f['flatAmountNumber'].value), wallet: this.selectedWalletGuid },
    //   flatAmountType: this.selFlatAmountTypeGuid
    // }
    // fillterbody['status'] = this.promoStatusListGuid
    // fillterbody['usageNumber'] = 0
    // fillterbody['usageType'] = this.PromoCodeUsageTypeGuid


    let fillbody: any = {}

    fillbody = {
      'objState': 0,
      "limits": {
        "allowedFaces": allowedFaces.length > 0 ? allowedFaces : undefined,
        "expirationDate": this.selectedDate ? `${this.selectedDate}T23:59:59.999` : undefined,
        "maxUsageNumber": Number(this.f['maxUsageNumber'].value) > 0 ? Number(this.f['maxUsageNumber'].value) : undefined,
        'allowedPaymentSystem': allowedPaymentSystem.length > 0 ? allowedPaymentSystem : undefined,
        'maxUsageNumberPerUser': Number(this.f['maxUsagePerPlayerNumber'].value) > 0 ? Number(this.f['maxUsagePerPlayerNumber'].value) : undefined,
        'requiredPermissionsGroup': requiredPermissionsGroup.length > 0 ? requiredPermissionsGroup : undefined,
      },
      "name": this.generatedString,
      "reward": {
        "flatAmount": {
          value: Number(this.f['flatAmountNumber'].value) > 0 ? Number(this.f['flatAmountNumber'].value) : undefined, wallet: this.selectedWalletGuid
        },
        "flatAmountType": this.selFlatAmountTypeGuid,
        'depositPercent': Number(this.f['percentOfDepositNum'].value) > 0 ? Number(this.f['percentOfDepositNum'].value) : undefined,
        'depositPercentType': this.selectedDepositeType,
      },
      "status": this.promoStatusListGuid,
      "usageNumber": 0,
      // "usageType": this.PromoCodeUsageTypeGuid,
      "usageType": this.EditInfo.usageType,
      "guid":this.EditInfo && this.EditInfo.guid,
      "referrer":this.findData,
      
    }

    if (this.agentinfo) {
      fillbody['referrer'] = {
        "fullName": this.referFullName,
        "login": this.AgentName,
        "type": this.selectedUserTypes,
        "guid": this.Agentguid
      }
    }

    console.log(this.addpromotionalcodeForm.valid)

    if (this.addpromotionalcodeForm.valid && this.agentinfo) {

      this.promotionalService.setPromotionalCode(fillbody).subscribe((data) => { this.finalResult(data) }, error => {
        this.SpinnwerT = false
      })
    }

    if (!this.agentinfo && this.addpromotionalcodeForm.valid) {
      this.promotionalService.setPromotionalCode(fillbody).subscribe((data) => { this.finalResult(data) }, error => {
        this.SpinnwerT = false
      })
    }
    this.alertMsg = ''
  }

  validationCheck() {
    if ((!this.agentinfo && !this.f['flatAmount'].value && this.f['promoCode'].valid) || (this.f['promoCode'].valid && this.f['flatAmountDropdown'].invalid)) {
      this.alertMsg = "Code will not give any rewards nor refer player.<br> Do you want to create code anyway ?"

    } else {
      this.onFormSubmit()
    }
  }


  finalResult(data: any) {
    this.SpinnwerT = false
    console.log(data)
    if (data) {
      let changedObjectList = data.changedObjectList
      if (changedObjectList) {
        this.popupClose()
      }
    }
  }

  get f() {
    return this.addpromotionalcodeForm?.controls;
  }

  PAYMENTSYSTEMS() {
    let paymentsystems = localStorage.getItem('PAYMENTSYSTEMS')
    if (paymentsystems) {
      this.paymentsystems = JSON.parse(paymentsystems)
    }
    console.log('paymentsystems', this.paymentsystems)
    // this.selectedAllowedPayment = this.paymentsystems

    this.allowedPaymentDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };

  }

  faceParameters() {
    let facepara = localStorage.getItem('faceParameters')
    if (facepara) {
      this.facepara = JSON.parse(facepara)
    }
    console.log(this.facepara)

    this.allowedFacacesDropdownSettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
  }


  getPlayerLevelsNames(data: any) {
    console.log(data.objectList[0].compPointsLevels)
    this.updateleav = data.objectList[0].compPointsLevels
    console.log(this.updateleav.length)
    for (let i = 0; i < this.updateleav.length; i++) {
      this.updateleav[i].Names = this.updateleav[i].name
      console.log(this.updateleav)
    }
    this.playerCpLevelDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
  }

  PromotionalStatus() {
    // localStorage.getItem("PromoCodeStatus");
    let promoStatus = localStorage.getItem("PromoCodeStatus");
    if (promoStatus) {
      this.promoStatusList = JSON.parse(promoStatus)
    }

    console.log('promoStatusList', this.promoStatusList)
    this.promoStatusList.map((list: any) => {
      if (list.value == "Active") {
        this.promoStatusListGuid = list.guid
      }
    })
    console.log(this.promoStatusListGuid)

  }

  PromoCodeUsageType() {
    let PromoCodeUsageList = localStorage.getItem("PromoCodeUsageType");
    if (PromoCodeUsageList) {
      this.PromoCodeUsageTypeList = JSON.parse(PromoCodeUsageList)
    }
    console.log("PromoCodeUsageTypeList", this.PromoCodeUsageTypeList);

    this.PromoCodeUsageTypeGuid = this.PromoCodeUsageTypeList.map((promo: any,i:any) => {
      promo.isChecked = true;
      return promo.guid })
  
    console.log(this.PromoCodeUsageTypeGuid)
   
  }

  PromocodeRewardTypes() {
    let PromocodeRewardTypes = localStorage.getItem('PromocodeRewardTypes')
    if (PromocodeRewardTypes) {
      this.PromocodeRewardList = JSON.parse(PromocodeRewardTypes)
    }
    console.log("promocodeRewardList", this.PromocodeRewardList)
    // this.PromocodeRewardListGuid = this.PromocodeRewardList.map((list:any)=>list.guid)
    // console.log(this.PromocodeRewardListGuid)
    this.walletFormats()
    console.log(this.addpromotionalcodeForm)
  }

  walletFormats() {
    this.flatAmountObj = []
    let walletFormats = localStorage.getItem("walletFormats")
    let walletFormatList
    if (walletFormats) {
      walletFormatList = JSON.parse(walletFormats)
    }

    walletFormatList.map((list: any) => {
      this.PromocodeRewardList.forEach((promo: any) => {
        if (list.currencyCode) {
          this.flatAmountObj.push({
            wallet: list.guid,
            currencyCode: list.currencyCode,
            guid: promo.guid,
            value: `${list.currencyCode} ${promo.value}`
          })
        }
      })
    })
    console.log(this.flatAmountObj)

  }

  selFlatAmountList(list: any) {
    // this.selectedWalletGuid = list.wallet

    this.selFlatAmountTypeGuid = this.selFlatAmountType.guid
    this.selectedWalletGuid = this.selFlatAmountType.wallet
    console.log(this.selFlatAmountTypeGuid, this.selectedWalletGuid)
  }

  Agentguids() {
    const usertype = localStorage.getItem("usertype");
    if (usertype) {
      this.usertypeList = JSON.parse(usertype);
      console.log(this.usertypeList)
    }
    let body = {
      "userType": this.usertypeList[0].guid
    }
    this.PlayerserviceService.listUserPermissionsGroup(body).subscribe((data) => {
      console.log(data)
      this.selectedPermissionGroup = data.objectList

    })
    console.log(this.selectedPermissionGroup)


    this.permissionDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
  }

  // ????????????????????????????????????????????????????????????
  find_usertype() {
    for (let i = 0; i < this.usertypeList.length; i++) {
      console.log(this.usertypeList[i].guid.lowLong, this.checkAgentA)
      if (this.usertypeList[i].guid.lowLong == this.checkAgentA) {
        var namesa = this.usertypeList[i].value
        console.log(namesa)
        this.referType = this.usertypeList[i].value
      }
    }
  }

  usertype() {
    let usertype = localStorage.getItem('usertype')
    if (usertype) {
      this.usertypeList = JSON.parse(usertype)
      console.log('userTypeList', this.usertypeList)
      for (let i = 0; i < this.usertypeList.length; i++) {
        // console.log(this.checkAgentA)
        // if (this.usertypeList[i].guid.lowLong == this.checkAgentA) {
        //   var namesa = this.usertypeList[i].value
        //   console.log(namesa)
        // }
        if (this.usertypeList[i].value == "Agent" || this.usertypeList[i].value == "Affiliate" || this.usertypeList[i].value == "Player") {
          this.filterUserTypes.push(this.usertypeList[i])
        }
      }

      // let explorerType = sessionStorage.getItem('explorerType')
      // if(explorerType){
      //   this.userType = JSON.parse(explorerType)
      // }
      // console.log(explorerType)
      if (this.filterUserTypes) {
        this.filterUserTypes.forEach((user: any) => {
          if (user.value == this.userType) {
            console.log(user)
            this.selectedUserTypes = user.guid
          }
        })
        console.log(this.selectedUserTypes)
        console.log(this.filterUserTypes)
      }
    }
  }

  getUserByLogin() {
    let user = {
      "login": this.UserLogin?.split(','),
      "returnTotalDebt": true,
      "userTypeGuid": this.usertypeList[0].guid
    }

    console.log(user)
    this.AgentControlService.getUserByLogin(user.login ? user : undefined).subscribe((data) => {
      console.log(data)
      if (data) {
        let loginNamesList = data.objectList
        loginNamesList.forEach((list: any, i: number) => {
          this.loginNames.push({ ...list, status: false })
        })
      }
      console.log(this.loginNames)
      this.uniqueLoginNames = Array.from(new Set(this.loginNames.map((item: any) => JSON.stringify(item))))
        .map((item: any) => JSON.parse(item));
      console.log(this.uniqueLoginNames);
    })
    this.UserLogin = null
    this.loginNames.forEach((list: any) => {
      list.status = false
    })
  }

  remove(ind: number) {
    this.uniqueLoginNames[ind].status = true
    // this.updateloginNames.splice(ind,1)
    // console.log(this.updateloginNames)
  }
  restore(ind: number, list: any) {
    this.uniqueLoginNames[ind].status = false
    // this.updateloginNames.splice(ind,0,list)
    // this.updateloginNames.push(list)
    // console.log(this.updateloginNames)
  }

  myFuncEnglish(event: any) {
    console.log(event)
    this.checkAgentA = event?.lowLong
    console.log(this.checkAgentA)
    this.find_usertype()
  }
  getUserByLoginfind() {
    this.isSearching = true
    this.userNotFound = ''
    this.findData = ''
    let user = {
      "login": [this.selectinput],
      "returnTotalDebt": true,
      "userTypeGuid": this.selectedUserTypes
    }
    console.log(user)
    this.AgentControlService.getUserByLogin(user).subscribe((data) => {
      console.log(data)
      if (data.resultCount == 0) {
        this.userNotFound = `${this.referType} not found`
      } else {
        this.findData = data.objectList[0].user
      }
      console.log(this.findData)
    })
    this.find_usertype()
  }

  generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.generatedString = result;
    console.log(this.generatedString)
    this.cdr.detectChanges();
  }

  alertPopup() {
    this.alertMsg = ''
  }

  onItemSelectPayment(data: any) {
    console.log(this.selectedAllowedPayment)
  }
  OnItemDeSelectPayment(data: any) {
    console.log(this.selectedAllowedPayment)
  }
  onPaymentSelectAll(data: any) {
    this.selectedAllowedPayment = [...data]
    console.log(this.selectedAllowedPayment)
  }
  onPaymentDeSelectAll(data: any) {
    console.log(this.selectedAllowedPayment)
  }

  onItemSelectFaces(data: any) {
    console.log(this.selectedAllowedFaces)
  }
  OnItemDeSelectFaces(data: any) {
    console.log(this.selectedAllowedFaces)
  }
  onFacesSelectAll(data: any) {
    this.selectedAllowedFaces = [...data]
    console.log(this.selectedAllowedFaces)
  }
  onFacesDeSelectAll(data: any) {
    console.log(this.selectedAllowedFaces)
  }

  onItemSelectPlayerCp(data: any) {
    console.log(this.selectedplayerCpLevel)
  }
  OnItemDeSelectPlayerCp(data: any) {
    console.log(this.selectedplayerCpLevel)
  }
  onPlayerCpSelectAll(data: any) {
    this.selectedplayerCpLevel = [...data]
    console.log(this.selectedplayerCpLevel)
  }
  onPlayerCpDeSelectAll(data: any) {
    console.log(this.selectedplayerCpLevel)
  }

  onItemSelectPermission(data: any) {
    console.log(this.selectedPlayerPermission)
  }
  OnItemDeSelectPermission(data: any) {
    console.log(this.selectedPlayerPermission)
  }
  onPermissionSelectAll(data: any) {
    this.selectedPlayerPermission = [...data]
    console.log(this.selectedPlayerPermission)
  }
  onPermissionDeSelectAll(data: any) {
    console.log(this.selectedPlayerPermission)
  }

}

