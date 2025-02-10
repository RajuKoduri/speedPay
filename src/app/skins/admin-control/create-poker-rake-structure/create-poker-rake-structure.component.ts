import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { PokerrakestructureComponent } from '../../pokergames/settings/pokerrakestructure/pokerrakestructure.component';


@Component({
  selector: 'app-create-poker-rake-structure',
  templateUrl: './create-poker-rake-structure.component.html',
  styleUrls: ['./create-poker-rake-structure.component.css'],
})
export class CreatePokerRakeStructureComponent implements OnInit, AfterViewInit {
  @ViewChild(PokerrakestructureComponent) PokerrakestructureComponent: PokerrakestructureComponent | undefined;

  @ViewChild('toValue') tovalueInputElement!: ElementRef;

  @Input() RakestrutureData: any = null;
  CreatePokerRakeStructure: FormGroup;
  ParticipantsPopup: boolean = false;
  from: number = 2;
  to: number = 3;
  ranges: any = [];
  from_value: number = 2;
  selectedRowIndex: number = 0;
  ar_lables: any = [];
  last_index: any;
  ar_lables1: any = [];
  rakes: any = [];
  rangesdata: any = [];
  toValue = 0;
  ErrorPopup: boolean = false;
  CreateSuccessPop: boolean = false;
  CreateRakeRes: any;
  errorMessageText: string = '';
  validationText: string = '';
  validationPopUp: boolean = false;
  validationforRanges: boolean = false;
  SuccessMessageText: any;
  lastvalue12: any;
  constructor(
    private pokergameService: PokergamesService,
    private router: Router,
    // private PokerrakestructureComponent:PokerrakestructureComponent
  ) {
    this.CreatePokerRakeStructure = new FormGroup({
      RakeStructureName: new FormControl(),
    });
  }
  ngAfterViewInit(): void {
    console.log(this.RakestrutureData);
    if (this.RakestrutureData !== null) {
      console.log(this.RakestrutureData.name);
      this.CreatePokerRakeStructure.patchValue({
        RakeStructureName: this.RakestrutureData.name,
      });
      console.log(this.RakestrutureData);
      let newarry: any = [];

      for (var i = 0; i < this.RakestrutureData.rakes.length; i++) {
        var object12 = {
          from_value: 0,
          to_value: 0,
          rake: 0,
          perpot: 0,
          maxrake: 0,
        };
        console.log(
          this.RakestrutureData.rakes[i] + this.RakestrutureData.ranges[i]
        );
        console.log(this.RakestrutureData.ranges[i]);
        // newarry.push(this.RakestrutureData.rakes[i])
        // newarry.push(this.RakestrutureData.ranges[i])

        object12.from_value = this.RakestrutureData.ranges[i].from;
        object12.to_value = this.RakestrutureData.ranges[i].to;
        object12.rake = this.RakestrutureData.rakes[i].rake;
        object12.perpot = this.RakestrutureData.rakes[i].perPot;
        object12.maxrake = this.RakestrutureData.rakes[i].maxRake;
        newarry.push(object12);
      }

      console.log(newarry);
      this.ar_lables1 = newarry;
      this.ar_lables = newarry;
      for (var i = 0; i < this.ar_lables.length; i++) {
        if (this.ar_lables[i].to_value == -1) {
          this.ar_lables[i].to_value = this.ar_lables[i].from_value + 1;
        }
      }
      console.log(this.ar_lables)
    }
  }

  ngOnInit(): void {
    console.log(this.RakestrutureData);

    this.ar_lables1 = [
      {
        from_value: 2,
        to_value: 3,
        rake: 0,
        perpot: 0,
        maxrake: 0,
      },
    ];
  }


  onInput(event: any): void {
    const inputValue = event.target.value.toString();
    this.to = +inputValue.slice(0, 6); // Convert back to number and limit length
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
        this.errorMessageText =
          "Current range 'To' value can't be more or equals next range 'To' value";
        return;
      }
      if (from_value > this.ar_lables[this.selectedRowIndex].from_value) {
        // alert("Current range 'To' value can't be less Current  range 'From' value");
        this.ErrorPopup = true;
        this.errorMessageText =
          "Current range 'To' value can't be less Current  range 'From' value";
        return;
      }
      if (from_value >= custom_to_value) {
        this.ErrorPopup = true;
        this.errorMessageText =
          "Current range 'To' value can't be less Current  range 'From' value";
        return;
      } else {

        // }

        //earlier working code
        console.log('selected row logic');
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

        // this.selectedRowIndex = 0;
      }
    }
  }
  ParticipantPopUp() {
    this.from_value = 2;
    //let to_value = this.from_value + 1
    let obj = {
      from_value: this.from_value,
      to_value: -1,
    };
    if (this.ar_lables.length == 0) {
      this.ar_lables.push(obj);
    }
    console.log('first list');
    console.log(this.ar_lables);
    for (let i = 0; i < this.ar_lables.length; i++) {
      this.lastvalue12 = this.ar_lables[i]
    }

    this.ParticipantsPopup = true;

    console.log(this.selectedRowIndex);
    // this.selectedRowIndex = 0;
  }

  ParticipantsRangesPopClose() {
    this.ParticipantsPopup = false;
    this.ar_lables1 = [...this.ar_lables];
    this.ar_lables1.forEach((a: any) => {
      if (a.rake == null||a.perpot == null||a.maxrake == null) {
        a.rake = 0;
        a.perpot = 0;
        a.maxrake = 0;
      }
      // if (a.perpot == null) {
      //   a.perpot = 0;
      // }
      // if (a.maxrake == null) {
      //   a.maxrake = 0;
      // }
    });
    console.log(this.ar_lables1);

  }

  ParticipantsPopClose() {
    this.ParticipantsPopup = false;
  }

  // newRangesAdds() {
  //   this.selectedRowIndex = 0;
  //   if (this.selectedRowIndex == 0) {
  //     console.log(this.ar_lables);

  //     let next_item_from_value =  this.ar_lables[this.ar_lables.length - 1].from_value + 2;
  //     this.ar_lables[this.ar_lables.length - 1].to_value=this.ar_lables[this.ar_lables.length - 1].from_value+1
  //     let next_item = {
  //       from_value: next_item_from_value,
  //       to_value: next_item_from_value + 1,
  //     };
  //     this.ar_lables.push(next_item);
  //     this.ar_lables[this.ar_lables.length - 1].to_value =- 1;
  //   }
  // }
  newRangesAdd() {
    
    if(this.selectedRowIndex == this.ar_lables.length -1){
      this.to =  this.ar_lables[this.selectedRowIndex]['from_value'] + 1

    }
    console.clear();
    this.selectedRowIndex = 0;
    console.log(this.selectedRowIndex);
    console.log(this.ar_lables);
    console.log(this.lastvalue12);
    let next_item_from_value = 0;
    if (this.selectedRowIndex == 0) {
      console.log(this.ar_lables);
      this.ar_lables[this.ar_lables.length - 1].to_value = this.ar_lables[this.ar_lables.length - 1].from_value + 1
      if (this.ar_lables.length === 1) {
        console.log(next_item_from_value)
        next_item_from_value = 4;
      } else {
        console.log(this.ar_lables.length)
        console.log(this.ar_lables)
        next_item_from_value = this.ar_lables[this.ar_lables.length - 1].from_value + 2;
        console.log(next_item_from_value)
      }


      let next_item = {
        from_value: next_item_from_value,
        to_value: next_item_from_value + 1,
      };
      // if(this.RakestrutureData){
      //   alert("hhhh")
      //   next_item = {
      //     from_value:this.lastvalue12.from_value,
      //     to_value: this.lastvalue12.from_value  + 1,
      //   };
      //  } 
      console.log(next_item)
      this.ar_lables.push(next_item);
      this.ar_lables[this.ar_lables.length - 1].to_value = - 1;
      // this.ar_lables[this.last_index] = next_item
      // console.log(this.ar_lables[this.last_index]);

      // for (var i = 0; i < this.ar_lables.length; i++) {

      //   console.log("index ->" + i + "-->" + this.ar_lables[i]['from_value'] + "-" + this.ar_lables[i]['to_value'])
      // }
      // console.log(this.ar_lables)
      // this.last_index = (this.ar_lables.length - 1)
    }
  }

  row_select(index: any) {
    console.log('row_select  :  ', index);
    this.selectedRowIndex = index;
    console.log('ar_lables :  ', this.ar_lables);

    this.from = this.ar_lables[index]['from_value'];
    this.to = this.ar_lables[index]['to_value'];
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
  onFormSubmit() {
    this.rakes = [];
    this.rangesdata = [];
    console.log(this.ar_lables1);

    this.validationText = '';
    this.ar_lables1.forEach((a: any, index: any) => {
      console.log(this.ar_lables1?.length, index);

      if (a.rake == 0 || a.perpot == 0 || a.maxrake == 0) {
        this.validationforRanges = true;

        if (this.ar_lables1?.length - 1 == index) {
          this.validationText += `'Rake','Per Pot','Max Rake' must be positive for range '${a.from_value} - more' \n`;
        } else {
          this.validationText += `'Rake','Per Pot','Max Rake' must be positive for range '${a.from_value} - ${a.to_value}' \n`;
        }
      }

      if (a.rake > a.perpot) {
        this.validationforRanges = true;

        if (this.ar_lables1?.length - 1 == index) {
          this.validationText += `'Per Pot' must be greater then 'Rake' for range '${a.from_value} - more' \n`;
        } else {
          this.validationText += `'Per Pot' must be greater then 'Rake' for range '${a.from_value}-${a.to_value}' \n`;
        }
      }

      if (a.rake > a.maxrake) {
        this.validationforRanges = true;

        if (this.ar_lables1?.length - 1 == index) {
          this.validationText += `'Max Rake' must be greater or equals then then 'Rake' for range '${a.from_value} - more' \n`;
        } else {
          this.validationText += `'Max Rake' must be greater or equals then then 'Rake' for range '${a.from_value}-${a.to_value}' \n`;
        }
      }

      if (this.validationText == '') {
        this.validationforRanges = false;
      }

      if (this.ar_lables1?.length - 1 == index) {
        this.toValue = -1;
      } else {
        this.toValue = a.to_value;
      }
      let rakes = {
        maxRake: a.maxrake,
        perPot: a.perpot,
        rake: a.rake,
      };
      let range = {
        from: a.from_value,
        to: this.toValue,
      };
      this.rangesdata.push(range);
      this.rakes.push(rakes);
    });

    let obj = {
      objState: 0,
      active: false,
      name: this.CreatePokerRakeStructure.value.RakeStructureName,
      rakes: this.rakes,
      ranges: this.rangesdata,
    };
    if (this.RakestrutureData) {
      console.log(this.RakestrutureData.guid);
      let objnew = {
        objState: 0,
        active: false,
        name: this.CreatePokerRakeStructure.value.RakeStructureName,
        rakes: this.rakes,
        ranges: this.rangesdata,
        guid: this.RakestrutureData.guid,
      };
      console.log(objnew);
      obj = objnew;
      console.log(obj);
      console.log(this.ar_lables);
    }
    console.log(obj);

    if (
      this.CreatePokerRakeStructure.value.RakeStructureName == null ||
      this.CreatePokerRakeStructure.value.RakeStructureName == ''
    ) {
      this.validationText = `Rake Structure Name can't be empty`;
      this.validationPopUp = true;
    } else if (this.validationforRanges) {
      this.validationPopUp = true;
    } else {
      // updateRakeStructure
      if (this.RakestrutureData) {
        this.pokergameService.updateRakeStructure(obj).subscribe((res) => {
          console.log(res);
          if (res.changedObjectList) {
            this.CreateSuccessPop = true;
            this.SuccessMessageText = " Successfully Updated"
          }
        });
      } else {
        this.pokergameService.createRakeStructure(obj).subscribe(
          (res) => {
            console.log(res);
            this.CreateRakeRes = res.changedObjectList;
            if (this.CreateRakeRes) {
              this.CreateSuccessPop = true;
              this.SuccessMessageText = " Successfully Created"
            }
          },
          (error) => {
            this.ErrorPopup = true;
            this.errorMessageText = 'Technical Error...';
          }
        );
      }
    }
  }

  SuccessPop() {
    this.CreateSuccessPop = false;
    this.router.navigateByUrl('/pokerrakestructure');
    if (this.RakestrutureData) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      if (this.PokerrakestructureComponent) {

        this.PokerrakestructureComponent.onFormSubmit()
        this.PokerrakestructureComponent.closepopup()
      }
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  TechnicalError() {
    this.ErrorPopup = false;
    this.validationPopUp = false;
  }

  //  newRangeAdd() {
  //     console.log(this.ranges.length);

  //     if (!this.ranges?.length) {
  //       console.log(this.ranges.length);
  //       let obj = { 'from': this.from, 'to': this.to };
  //       this.ranges.push(obj);
  //     } else {
  //       console.log(this.ranges.length);
  //       let obj = { 'from': 2 + this.from++, 'to': 2 + this.to++ };
  //       this.ranges.push(obj);
  //     }
  //     console.log(this.ranges)
  //   }
  closerakestuture() {
    // this.PokerrakestructureComponent.closepopup()
    if (this.PokerrakestructureComponent) {
      this.PokerrakestructureComponent.closepopup()
    }
  }
  inputpayout12(data: any) {

    console.log(data.key)
    var k;
    k = data.charCode;
    console.log(k)//         k = event.keyCode;  (Both can be used)
    // return ((k > 47 && k < 58 ))
    return ((k > 47 && k < 58) || k == 46)
  }
}
