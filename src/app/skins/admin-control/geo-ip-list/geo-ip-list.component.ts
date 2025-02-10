import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/source/utility.service';

@Component({
  selector: 'geo-ip-list',
  templateUrl: './geo-ip-list.component.html',
  styleUrls: ['./geo-ip-list.component.css']
})
export class GeoIPListComponent implements OnInit {
  @Output() notifyParent = new EventEmitter()
  geoIpListForm: FormGroup
  pattern: any = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  getGeoIpProviderList: any;
  geoIpProviderTypeList: any;

  constructor(private UtilityService: UtilityService) {
    let obj = {}
    this.getGeoIpProvider(obj)
    this.geoIpListForm = new FormGroup({
      check: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
      type: new FormControl()
    })
  }

  ngOnInit(): void {
    this.geoIpProviderType()
  }

  formatIpAddress() {
    // let value = this.geoIpListForm.get('check')?.value || '';
    // value = value.replace(/\D/g, ''); 

   
    // let formattedValue = '';
    // for (let i = 0; i < value.length; i++) {
    //   if (i > 0 && i % 3 === 0) {
    //     formattedValue += '.';
    //   }
    //   formattedValue += value[i];
    // }

    
    // if (formattedValue.length > 15) {
    //   formattedValue = formattedValue.substring(0, 15);
    // }

    // this.geoIpListForm.get('check')?.setValue(formattedValue, { emitEvent: false });

     // Remove all non-numeric characters except periods
     let value = this.geoIpListForm.get('check')?.value || '';
     const cleaned = value.replace(/[^0-9.]/g, '');

     // Split the cleaned string into segments
     const segments = cleaned.split('.').slice(0, 4);
 
     // Format each segment to ensure it does not exceed 3 digits
     for (let i = 0; i < segments.length; i++) {
       if (segments[i].length > 3) {
         segments[i] = segments[i].slice(0, 3);
       }
     }
 
     // Join the segments with periods
     let formatted = segments.join('.');
 
     // Add a period if a segment reaches 3 digits and it's not the last segment
     if (cleaned.length > 0 && cleaned.charAt(cleaned.length - 1) !== '.' && segments[segments.length - 1].length === 3 && segments.length < 4) {
       formatted += '.';
     }
     this.geoIpListForm.get('check')?.setValue(formatted, { emitEvent: false });
    //  return formatted;
     
  }

  get f() {
    return this.geoIpListForm.controls
  }
  geoIpListPopup() {
    this.notifyParent.emit()
  }

  geoIpProviderType() {
    let geoIpProviderType = localStorage.getItem("geoIpProviderType")
    if (geoIpProviderType) {
      this.geoIpProviderTypeList = JSON.parse(geoIpProviderType)
      console.log('this.geoIpProviderTypeList', this.geoIpProviderTypeList)
    }

  }

  onProviderTypeChange(event: any) {
    console.log(this.f['type'].value)
    this.getGeoIpProvider(this.f['type'].value)
  }

  getGeoIpProvider(obj: any) {
    this.UtilityService.getGeoIpProvider(obj).subscribe((data: any) => {
      if (!this.getGeoIpProviderList) {
        this.getGeoIpProvider(data.objectList[0].type)
      }
      this.abc(data)

    })

  }
  abc(data: any) {
    console.log(data)
    if (data) {
      this.getGeoIpProviderList = data.objectList

      let typeGuid = this.geoIpProviderTypeList.filter((list: any) =>
        this.getGeoIpProviderList.find((guid: any) => list.guid.lowLong == guid.type.lowLong))

      console.log(typeGuid)
      this.geoIpListForm.patchValue({
        type: typeGuid[0].guid
      })
    }
  }

  setGeoIpProvider(){
    let body = this.getGeoIpProviderList[0]
    console.log(this.getGeoIpProviderList)
    this.UtilityService.setGeoIpProvider(body).subscribe((data:any)=>{console.log(data)})
  }

  onUpdateDB(){
    let body = this.getGeoIpProviderList[0].guid
    this.UtilityService.updateGeoIpProviderDatabase(body).subscribe((data:any)=>{
      console.log(data)
    })
  }

  getIpLocation(){
    let body ={"ipAddress": this.f["check"].value }
   if(this.f["check"].valid){
    this.UtilityService.getIpLocation(body).subscribe((data:any)=>{
      console.log(data)
    })
   }
  }
  

  input(e: any) {
    console.log(this.f['check'].errors)
  }

}
