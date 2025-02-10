import { Component, OnInit,ViewChild} from '@angular/core';

@Component({
  selector: 'app-RakeRanges',
  templateUrl: './RakeRanges.component.html',
  styleUrls: ['./RakeRanges.component.css']
})
export class RakeRangesComponent implements OnInit {
  ParticipantsPopup: boolean = true
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
  TypechangeData: any;
  constructor() { }
  
  ngOnInit() {
    
    this.ar_lables = [
      {
        from_value: 0.001,
        to_value: 0.1,
      },
      {
        from_value: 2,
        to_value: 3,
      },
    ];
  }
  Datachange(data:any){
    console.log(data)
    this.TypechangeData = data
  }
  OpenRakerangespop(){
    alert("Enter Rake")
    this.ar_lables = [   
      {
        from_value: this.TypechangeData.stakes[0].high,
        to_value: 1,
        comp_point:  this.TypechangeData.stakes[0].low
      },
      {
        from_value: 2,
        to_value: 3,
        comp_point: ""
      },
    ];
    this.ar_lables1 =   this.ar_lables
    this.ParticipantsPopup = true
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
  newRangesAdd() {

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
    //   },
    // ];
    if(this.selectedRowIndex == this.ar_lables.length -1){
      this.to =  this.ar_lables[this.selectedRowIndex]['from_value'] + 1
  
    }
    console.clear();
    this.selectedRowIndex = 0;
    console.log(this.selectedRowIndex);
    console.log(this.ar_lables);
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
  ParticipantsRangesPopClose(){
    this.ar_lables1  = this.ar_lables
    this.ParticipantsPopup = false
   }
   ParticipantsPopClose(){
    this.ParticipantsPopup = false
  }
  
}
