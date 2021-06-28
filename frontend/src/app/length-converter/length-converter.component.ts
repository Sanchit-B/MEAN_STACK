import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-length-converter',
  templateUrl: './length-converter.component.html',
  styleUrls: ['./length-converter.component.css']
})
export class LengthConverterComponent implements OnInit {
  lengthOptions = [
    {
      id: 0,
      label: 'Kilometre',
      unit: 'km'
    },
    {
      id: 1,
      label: 'Metre',
      unit: 'm'
    },
    {
      id: 2,
      label: 'Centimetre',
      unit: 'cm'
    }
  ];

  val1;
  val2;
  l1 = 0;
  l2 = 1;

  ngOnInit() {

  }

  changed(event, type) {
      if(type === 'v1') {
        if(+this.l1 === 0 && +this.l2 === 1) {
          this.val2 = this.val1 *1000;
        } else if(+this.l1 === 1 && +this.l2 === 0) {
          this.val2 = this.val1 /1000;
        } else if(+this.l1 === 0 && +this.l2 === 2) {
          this.val2 = this.val1 *100000;
        } else if(+this.l1 === 2 && +this.l2 === 0) {
          this.val2 = this.val1 /100000;
        } else if(+this.l1 === 1 && +this.l2 === 2) {
          this.val2 = this.val1 *100;
        } else if(+this.l1 === 2 && +this.l2 === 1) {
          this.val2 = this.val1 /100;
        } else if(+this.l1 === +this.l2) {
          this.val2 = this.val1;
        }
      } else if(type === 'v2') {
        if(+this.l2 === 0 && +this.l1 === 1) {
          this.val1 = this.val2 *1000;
        } else if(+this.l2 === 1 && +this.l1 === 0) {
          this.val1 = this.val2 /1000;
        } else if(+this.l2 === 0 && +this.l1 === 2) {
          this.val1 = this.val2 *100000;
        } else if(+this.l2 === 2 && +this.l1 === 0) {
          this.val1 = this.val2 /100000;
        } else if(+this.l2 === 1 && +this.l1 === 2) {
          this.val1 = this.val2 *100;
        } else if(+this.l2 === 2 && +this.l1 === 1) {
          this.val1 = this.val2 /100;
        } else if(+this.l2 === +this.l1) {
          this.val1 = this.val2;
        }
      }

  }

  changedUnit(event, type) {
    if(type === 'v2') {
      if(+this.l1 === 0 && +this.l2 === 1) {
        this.val2 = this.val1 *1000;
      } else if(+this.l1 === 1 && +this.l2 === 0) {
        this.val2 = this.val1 /1000;
      } else if(+this.l1 === 0 && +this.l2 === 2) {
        this.val2 = this.val1 *100000;
      } else if(+this.l1 === 2 && +this.l2 === 0) {
        this.val2 = this.val1 /100000;
      } else if(+this.l1 === 1 && +this.l2 === 2) {
        this.val2 = this.val1 *100;
      } else if(+this.l1 === 2 && +this.l2 === 1) {
        this.val2 = this.val1 /100;
      } else if(+this.l1 === +this.l2) {
        this.val2 = this.val1;
      }
    } else if(type === 'v1') {
      if(+this.l2 === 0 && +this.l1 === 1) {
        this.val1 = this.val2 *1000;
      } else if(+this.l2 === 1 && +this.l1 === 0) {
        this.val1 = this.val2 /1000;
      } else if(+this.l2 === 0 && +this.l1 === 2) {
        this.val1 = this.val2 *100000;
      } else if(+this.l2 === 2 && +this.l1 === 0) {
        this.val1 = this.val2 /100000;
      } else if(+this.l2 === 1 && +this.l1 === 2) {
        this.val1 = this.val2 *100;
      } else if(+this.l2 === 2 && +this.l1 === 1) {
        this.val1 = this.val2 /100;
      } else if(+this.l2 === +this.l1) {
        this.val1 = this.val2;
      }
    }

}


}
